import { notFound } from "next/navigation";
import clientPromise from "../../../lib/mongoConnection";

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default async function ProfilePage({ params }) {
  const { username: usernameParam } = await params;
  const username = decodeURIComponent(usernameParam).trim();

  const dbConn = await clientPromise;
  const db = dbConn.db(process.env.MONGODB_DB_NAME);

  const userData = await db.collection("UserDetails").findOne(
    { username: { $regex: `^${escapeRegex(username)}$`, $options: "i" } },
    { projection: { pass: 0, email: 0 } }
  );

  if (!userData) notFound();

  return (
    <div>
      <h1>{userData.username}</h1>
      <p>Role: {userData.role}</p>
      <p>Course: {userData.courseCode}</p>
    </div>
  );
}
