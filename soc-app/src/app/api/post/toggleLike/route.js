export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "../../../../lib/auth";
import clientPromise from "../../../../lib/mongoConnection";

export async function POST(req) {
    // Must be logged in to like.
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Read post id from request body.
    const body = await req.json().catch(() => ({}));
    const postId = String(body?.postId || "").trim();

    if (!postId || !ObjectId.isValid(postId)) {
        return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
    }

    // DB setup.
    const userId = String(session.user.id);
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection("UserPosts");
    const objectId = new ObjectId(postId);

    // Make sure post exists first.
    const post = await collection.findOne(
        { _id: objectId },
        { projection: { likedBy: 1, likes: 1 } }
    );

    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // One-way like: add user once, increment likes once.
    await collection.updateOne(
        { _id: objectId, likedBy: { $ne: userId } },
        {
            $addToSet: { likedBy: userId },
            $inc: { likes: 1 },
        }
    );

    // Return latest count for UI refresh.
    const updatedPost = await collection.findOne(
        { _id: objectId },
        { projection: { likedBy: 1, likes: 1 } }
    );

    const updatedLikedBy = Array.isArray(updatedPost?.likedBy)
        ? updatedPost.likedBy.map((item) => String(item))
        : [];

    return NextResponse.json({
        ok: true,
        isLiked: true,
        likes: Math.max(0, Number(updatedPost?.likes || 0)),
    });
}
