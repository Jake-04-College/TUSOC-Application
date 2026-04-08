import "server-only";

export const runtime = "nodejs";

import { notFound, redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongoConnection";
import { auth } from "../../../lib/auth";
import EditProfile from "./components/editProfile";

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function isOwnProfile(session, userData) {
    const sessionId = String(session?.user?.id || "").trim();
    const userId = String(userData?._id || "").trim();

    return session?.user?.id === userData?._id?.toString();

}

export default async function EditProfilePage({ params }) {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const resolvedParams = await params;
    const idParam = resolvedParams?.id;

    if (!idParam) {
        notFound();
    }

    const id = decodeURIComponent(idParam).trim();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    const query = ObjectId.isValid(id)
        ? { _id: new ObjectId(id) }
        : { username: { $regex: `^${escapeRegex(id)}$`, $options: "i" } };

    const userData = await db.collection("UserDetails").findOne(query);

    if (!userData) {
        notFound();
    }

    if (!isOwnProfile(session, userData)) {
        notFound();
    }

    const initialUserData = {
        username: userData.username || session.user.username || session.user.name || "",
        pronouns: userData.pronouns || "",
        bio: userData.bio || "",
        avatar: userData.profilePic || userData.image || session.user.image || "",
        profilePath: `/profile/${encodeURIComponent(userData._id.toString())}`,
    };

    return <EditProfile initialData={initialUserData} />;
}
