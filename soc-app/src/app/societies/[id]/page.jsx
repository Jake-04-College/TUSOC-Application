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


  let isMember = false;

  if (session?.user) {
    const sessionUserId = String(session.user.id || "").trim();

    let userQuery = null;

    if (ObjectId.isValid(sessionUserId)) {
      userQuery = { _id: new ObjectId(sessionUserId) };
    } 

    if (userQuery) {
      const userData = await db.collection("UserDetails").findOne(userQuery, {
        projection: { societies: 1 },
      });

      const joinedSocieties = Array.isArray(userData?.societies) ? userData.societies : [];
      const societyName = String(society.Soc_Name || "").trim();
      isMember = joinedSocieties.includes(societyName);
    }
  }


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

  return <SocietyTemplate society={safeSociety} posts={safePosts} session={session} isMember={isMember} />;
}
