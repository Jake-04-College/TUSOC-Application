export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import clientPromise from "../../../../lib/mongoConnection";

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
