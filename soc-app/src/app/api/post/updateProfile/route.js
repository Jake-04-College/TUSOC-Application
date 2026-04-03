export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "../../../../lib/auth";
import clientPromise from "../../../../lib/mongoConnection";

const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function normalizeField(value) {
    return String(value || "").trim();
}

export async function POST(req) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const username = normalizeField(body.username);
    const pronouns = normalizeField(body.pronouns);
    const bio = normalizeField(body.bio);
    const profilePic = normalizeField(body.avatar);

    if (!username) {
        return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const sessionUserId = normalizeField(session.user.id);
    const sessionEmail = normalizeField(session.user.email).toLowerCase();

    let userFilter = null;

    if (ObjectId.isValid(sessionUserId)) {
        userFilter = { _id: new ObjectId(sessionUserId) };
    } else if (sessionEmail) {
        userFilter = { email: sessionEmail };
    }

    if (!userFilter) {
        return NextResponse.json({ error: "Unable to resolve the current user" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    const existingUser = await db.collection("UserDetails").findOne(userFilter);

    if (!existingUser) {
        return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const conflictingUser = await db.collection("UserDetails").findOne({
        username: { $regex: `^${escapeRegex(username)}$`, $options: "i" },
        _id: { $ne: existingUser._id },
    });

    if (conflictingUser) {
        return NextResponse.json({ error: "That username is already in use" }, { status: 409 });
    }

    await db.collection("UserDetails").updateOne(
        { _id: existingUser._id },
        {
            $set: {
                username,
                pronouns,
                bio,
                profilePic,
            },
            $currentDate: { updatedAt: true },
        }
    );

    const postFilters = [];
    const currentUserId = existingUser._id?.toString();
    const currentUsername = normalizeField(existingUser.username);

    if (currentUserId) {
        postFilters.push({ userID: currentUserId });
    }

    if (currentUsername) {
        postFilters.push({ username: currentUsername });
    }

    if (postFilters.length > 0) {
        await db.collection("UserPosts").updateMany(
            { $or: postFilters },
            {
                $set: {
                    username,
                    profilePic,
                },
            }
        );
    }

    return NextResponse.json({
        ok: true,
        profilePath: `/profile/${existingUser._id.toString()}`,
    });
}
