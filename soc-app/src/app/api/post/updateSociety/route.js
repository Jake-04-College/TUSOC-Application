import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      societyId,
      Soc_Name,
      Soc_Desc,
      Soc_Campus,
      Soc_Category,
      Soc_Logo,
      Soc_Banner,
    } = body;

    const client = await clientPromise;
    const db = client.db();

    await db.collection("SocietyInformation").updateOne(
      { _id: new ObjectId(societyId) },
      {
        $set: {
          Soc_Name,
          Soc_Desc,
          Soc_Campus,
          Soc_Category,
          Soc_Logo,
          Soc_Banner,
        },
      }
    );

    return NextResponse.json({
      success: true,
    });
  }
  catch (e){
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
