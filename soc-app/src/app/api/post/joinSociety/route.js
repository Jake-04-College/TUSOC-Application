export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "../../../../lib/auth";
import clientPromise from "../../../../lib/mongoConnection";

// Small helper so error responses stay consistent.
const jsonError = (message, status) => NextResponse.json({ error: message }, { status });

export async function POST(req) {
    try {
        // 1) User must be logged in to join a society.
        const session = await auth();
        if (!session?.user) {
            return jsonError("Unauthorized", 401);
        }

        // Read and validate the incoming society id.
        const body = await req.json();
        const societyId = String(body?.societyId || "").trim();
        if (!ObjectId.isValid(societyId)) {
            return jsonError("Valid societyId is required", 400);
        }

        // Build a query to find the current user in UserDetails.
        // Prefer user id; fall back to email if needed.
        const sessionUserId = String(session.user.id || "").trim();
        const sessionEmail = String(session.user.email || "").trim();
        let userFilter = null;

        if (ObjectId.isValid(sessionUserId)) {
            userFilter = { _id: new ObjectId(sessionUserId) };
        } else if (sessionEmail) {
            userFilter = { email: sessionEmail };
        }

        if (!userFilter) {
            return jsonError("Session is missing user identity", 400);
        }

        //Make sure the society exists first.
        const db = (await clientPromise).db(process.env.MONGODB_DB_NAME);
        const society = await db
            .collection("SocietyInformation")
            .findOne({ _id: new ObjectId(societyId) }, { projection: { Soc_Name: 1 } });

        if (!society) {
            return jsonError("Society not found", 404);
        }

        const societyName = String(society.Soc_Name || "").trim();
        if (!societyName) {
            return jsonError("Society name is missing", 400);
        }

        // Add the society name to the user's societies array.
        // $addToSet prevents duplicates.
        const result = await db.collection("UserDetails").updateOne(
            userFilter,
            {
                $addToSet: { societies: societyName },
                $currentDate: { updatedAt: true },
            }
        );

        if (!result.matchedCount) {
            return jsonError("User profile not found. Complete onboarding first.", 404);
        }

        return NextResponse.json({
            ok: true,
            joined: result.modifiedCount > 0,
            societyId,
            societyName,
        });
    } catch (error) {
        if (error instanceof SyntaxError) {
            return jsonError("Invalid request body", 400);
        }

        console.error("Failed to join society", error);
        return jsonError("Failed to join society", 500);
    }
}
