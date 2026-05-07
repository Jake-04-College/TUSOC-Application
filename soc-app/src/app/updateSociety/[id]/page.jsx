import "server-only";

export const runtime = "nodejs";

import { notFound, redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongoConnection";
import { auth } from "../../../lib/auth";
import UpdateSociety from "./components/UpdateSociety";

export default async function UpdateSocietyPage({ params }) {
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

if (!ObjectId.isValid(id)) {
    notFound();
}

const client = await clientPromise;
const db = client.db(process.env.MONGODB_DB_NAME);

const society = await db
    .collection("SocietyInformation")
    .findOne({ _id: new ObjectId(id) });

if (!society) {
    notFound();
}

const initialData = {
    Soc_Name: society.Soc_Name || "",
    Soc_Desc: society.Soc_Desc || "",
    Soc_Campus: society.Soc_Campus || "",
    Soc_Category: society.Soc_Category || "",
    Soc_Logo: society.Soc_Logo || "",
    Soc_Banner: society.Soc_Banner || "",
    societyPath: `/society/${society._id.toString()}`
};

    return <UpdateSociety initialData={initialData} />;
}
