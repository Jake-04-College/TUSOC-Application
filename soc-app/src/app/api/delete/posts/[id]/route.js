export const runtime = "nodejs";

import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongoConnection";


export async function DELETE(_request, { params }) {
  try {
    const resolvedParams = await params;
    const id = String(resolvedParams?.id || "").trim();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    const result = await db.collection("UserPosts").deleteOne({ _id: new ObjectId(id) });
    if (!result.deletedCount) {
      return json({ ok: false, error: "Post not found" }, { status: 404 });
    }

    return json({ ok: true, deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Failed to delete post", error);
    return json({ ok: false, error: "Failed to delete post" }, { status: 500 });
  }
}
