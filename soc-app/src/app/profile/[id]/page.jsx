import "server-only";

export const runtime = "nodejs";

import { notFound } from "next/navigation";
import clientPromise from "../../../lib/mongoConnection";
import { auth } from "../../../lib/auth";
import ProfileTemplate from "./components/ProfileTemplate";
import { ObjectId } from "mongodb";

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const toISO = (time) => (time ? new Date(time).toISOString() : null);

export default async function ProfilePage({ params }) {
  const resolvedParams = await params;
  const idParam = resolvedParams?.id;
  if (!idParam) notFound();

  const id = decodeURIComponent(idParam).trim();

  const session = await auth();

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB_NAME);

  const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) }
    : { username: { $regex: `^${escapeRegex(id)}$`, $options: "i" } };


  const userData = await db.collection("UserDetails").findOne(query);

  if (!userData) return notFound()

  // Make userData safe to pass to a Client Component
  const safeUserData = {
    ...userData,
    _id: userData._id?.toString() ?? null,
    createdAt: toISO(userData.createdAt),
    updatedAt: toISO(userData.updatedAt),
    onboardedAt: toISO(userData.onboardedAt),
  };

  const posts = await db
    .collection("UserPosts")
    .find({ username: userData.username })
    .sort({ timePosted: -1 })
    .toArray();

  const safePosts = posts.map((p) => ({
    ...p,
    _id: p._id?.toString() ?? null,
    timePosted: toISO(p.timePosted),
    createdAt: toISO(p.createdAt),
    updatedAt: toISO(p.updatedAt),
  }));

  return <ProfileTemplate userData={safeUserData} posts={safePosts} session={session} />;
}
