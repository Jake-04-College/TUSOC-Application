export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import clientPromise from "../../../../lib/mongoConnection";
import { LanguageServiceClient } from "@google-cloud/language";

const MODERATION_THRESHOLD = Number(0.7);
const MODERATION_KEYWORDS = [
    "hate",
    "harass",
    "toxic",
    "insult",
    "profan",
    "derog",
    "violent",
    "sexual",
    "explicit",
    "death",
    "harm",
    "tragedy",
    "weapon",
    "firearm",
    "public safety",
];

let moderationClient;

function getModerationClient() {
    if (moderationClient) {
        return moderationClient;
    }

    const rawCreds = process.env.GOOGLE_CREDS_JSON;

    if (!rawCreds) {
        moderationClient = new LanguageServiceClient();
        return moderationClient;
    }

    let credentials;
    try {
        credentials = JSON.parse(rawCreds);
    } catch {
        throw new Error("Invalid GOOGLE_CREDS_JSON: expected valid JSON service-account credentials.");
    }

    moderationClient = new LanguageServiceClient({ credentials });
    return moderationClient;
}

async function moderatePostContent(content) {
    const client = getModerationClient();
    const [result] = await client.moderateText({
        document: {
            content,
            type: "PLAIN_TEXT",
        },
    });

    const categories = Array.isArray(result?.moderationCategories)
        ? result.moderationCategories
        : [];

    const matchedCategories = categories.filter((category) => {
        const categoryName = String(category?.name || "").toLowerCase();
        const confidence = Number(category?.confidence || 0);

        return (
            confidence >= MODERATION_THRESHOLD &&
            MODERATION_KEYWORDS.some((keyword) => categoryName.includes(keyword))
        );
    });

    return matchedCategories.length > 0;
}

export async function POST(req) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const title = String(body.title || "").trim();
    const postBody = String(body.body || "").trim();
    const societyId = String(body.societyId || "").trim();
    const societyName = String(body.societyName || "").trim();

    if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!postBody) {
        return NextResponse.json({ error: "Post content is required" }, { status: 400 });
    }

    if (!societyId) {
        return NextResponse.json({ error: "Society is required" }, { status: 400 });
    }

    /* Content moderation */
    try {
        const isFlagged = await moderatePostContent(`${title}\n${postBody}`);

        if (isFlagged) {
            return NextResponse.json(
                { error: "Your post contains content that violates community guidelines." },
                { status: 422 }
            );
        }
    } catch (error) {
        console.error("Moderation API Error:", error);
        return NextResponse.json(
            { error: "Unable to moderate content right now. Please try again." },
            { status: 503 }
        );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    const sessionEmail = String(session.user.email || "").trim().toLowerCase();
    const userDetails = sessionEmail
        ? await db.collection("UserDetails").findOne({ email: sessionEmail })
        : null;

    const username =
        userDetails?.username ||
        session.user.username ||
        session.user.name ||
        "Anonymous";

    const postDocument = {
        userID: userDetails?._id?.toString() || session.user.id || null,
        username,
        title,
        body: postBody,
        societyID: societyId,
        societyName,
        image: "",
        likes: 0,
        comments: 0,
        profilePic: session.user.image || "",
        timePosted: new Date(),
    };

    const result = await db.collection("UserPosts").insertOne(postDocument);

    return NextResponse.json({ ok: true, insertedId: result.insertedId.toString() });
}
