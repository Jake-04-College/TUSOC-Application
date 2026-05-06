import "server-only";

export const runtime = "nodejs";

import { notFound, redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongoConnection";
import { auth } from "../../../lib/auth";
import EditSociety from "./components/EditSociety";

export default async function EditSocietyPage({ params }) {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const id = decodeURIComponent(params?.id || "").trim();

    //if (!ObjectId.isValid(id)) {
    //    notFound();
    //}

    const client = await clientPromise;
    let query;

    if (ObjectId.isValid(id)) {
        query = { _id: new ObjectId(id) };
    } else {
        // fallback (optional)
        query = { name: id }; 
    }

    const society = await db.collection("SocietyInformation").findOne(query);

    const initialData = {
        name: society.Soc_Name || "",
        description: society.Soc_Desc || "",
        campus: society.Soc_Campus || "",
        category: society.Soc_Category || "",
        logo: society.Soc_Logo || "",
        banner: society.Soc_Banner || "",
        societyPath: `/society/${society._id.toString()}`
    };

    return <EditSociety initialData={initialData} />;
}