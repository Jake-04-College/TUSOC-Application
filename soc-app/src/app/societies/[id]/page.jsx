import "server-only";
export const runtime = "nodejs";

import { notFound } from "next/navigation";
import clientPromise from "../../../lib/mongoConnection";
import { auth } from "../../../lib/auth";
import SocietyTemplate from "./components/SocietyTemplate";
import { ObjectId } from "mongodb";


const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const toISO = (v) => (v ? new Date(v).toISOString() : null);

export default async function SocietyPage({ params }) {
  const resolvedParams = await params;
  const idParam = resolvedParams?.id;
  if (!idParam) notFound();

  const id = decodeURIComponent(idParam).trim();

  const session = await auth();

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB_NAME);

  const query = ObjectId.isValid(id)
    ? { _id: new ObjectId(id) }
    : { username: { $regex: `^${escapeRegex(id)}$`, $options: "i" } };

  const society = await db.collection("SocietyInformation").findOne(query);
  if (!society) notFound();

  const safeSociety = {
    ...society,
    _id: society._id?.toString() ?? null,
    createdAt: toISO(society.createdAt),
    updatedAt: toISO(society.updatedAt),
  };

  const posts = await db
    .collection("UserPosts")
    .find({ username: safeSociety.username })
    .sort({ timePosted: -1 })
    .toArray();

  const safePosts = posts.map((p) => ({
    ...p,
    _id: p._id?.toString() ?? null,
    timePosted: toISO(p.timePosted),
    createdAt: toISO(p.createdAt),
    updatedAt: toISO(p.updatedAt),
  }));

  return <SocietyTemplate society={safeSociety} posts={safePosts} session={session} />;
}
