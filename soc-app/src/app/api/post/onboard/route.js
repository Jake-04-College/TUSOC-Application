export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import clientPromise from "../../../../lib/mongoConnection";

export async function POST(req) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const postedEmail = String(body.email || "").trim();
    const postedUsername = String(body.username || "").trim();
    const studentNumber = String(body.studentNumber || "").trim();
    const courseCode = String(body.courseCode || body.courseId || "").trim();

    // Email rule: lock if SSO provided it
    const sessionEmail = String(session.user.email || "").trim();
    const email = sessionEmail || postedEmail;

    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });
    if (!postedUsername) {
        return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }
    if (!courseCode) {
        return NextResponse.json({ error: "Course is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    await db.collection("UserDetails").updateOne(
        { email },
        {
            $set: {
                email: email,
                username: postedUsername,
                courseCode: courseCode,
                studentNumber: studentNumber,
                onboarded: true,
                onboardedAt: new Date(),
            },
            $setOnInsert: {
                societies: [],
                createdAt: new Date(),
            },
            $currentDate: { updatedAt: true },
        },
        { upsert: true }
    );

    return NextResponse.json({ ok: true });
}
