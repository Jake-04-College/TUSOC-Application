export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "../../../../lib/auth";
import clientPromise from "../../../../lib/mongoConnection";

function mapSociety(doc) {
    return {
        id: doc._id?.toString() || "",
        name: String(doc.Soc_Name || "Unnamed Society"),
        memberCount: Number(doc.Member_Count) || 0,
    };
}

export async function GET() {
    try {
        const db = (await clientPromise).db(process.env.MONGODB_DB_NAME);
        const session = await auth();

        let storedSocietyNames = [];

        if (session?.user) {
            let userQuery = null;
            const email = String(session.user.email || "").trim();
            const id = String(session.user.id || "").trim();

            if (email) {
                userQuery = { email };
            } else if (ObjectId.isValid(id)) {
                userQuery = { _id: new ObjectId(id) };
            }

            if (userQuery) {
                const userDetails = await db
                    .collection("UserDetails")
                    .findOne(userQuery, { projection: { societies: 1 } });

                storedSocietyNames = Array.isArray(userDetails?.societies)
                    ? userDetails.societies
                        .map((value) => String(value || "").trim())
                        .filter(Boolean)
                    : [];
            }
        }

        if (storedSocietyNames.length) {
            const societiesFromDb = await db
                .collection("SocietyInformation")
                .find(
                    { Soc_Name: { $in: storedSocietyNames } },
                    { projection: { Soc_Name: 1, Member_Count: 1 } }
                )
                .toArray();

            const societies = societiesFromDb.map(mapSociety);

            // Fallback: still show stored names even if a society doc is missing.
            if (!societies.length) {
                return NextResponse.json({
                    title: "Your Societies",
                    societies: storedSocietyNames.map((name) => ({
                        id: "",
                        name,
                        memberCount: 0,
                    })),
                });
            }

            return NextResponse.json({ title: "Your Societies", societies });
        }

        const randomSocieties = await db.collection("SocietyInformation").aggregate([
            { $sample: { size: 5 } },
            { $project: { Soc_Name: 1, Member_Count: 1 } },
        ]).toArray();

        const societies = randomSocieties.map(mapSociety);
        return NextResponse.json({ title: "Suggested Societies", societies });
    } catch (error) {
        console.error("Failed to load sidebar societies", error);
        return NextResponse.json(
            { error: "Failed to load sidebar societies" },
            { status: 500 }
        );
    }
}
