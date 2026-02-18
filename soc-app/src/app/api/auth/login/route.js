import Bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const url = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DB_NAME

export async function POST(request) {
  try {
    const data = await request.json();
    const { email, password } = data;
    const client = new MongoClient(url);
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection("UserDetails");

    const user = await collection.findOne({ email });

    const passwordMatch = await Bcrypt.compare(password, user.pass);
    await client.close();

    if (passwordMatch) {
      console.log("Login valid");
      return new NextResponse(
        JSON.stringify({ valid: true, message: "Login successful", role: user.role }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      console.log("Login invalid - password mismatch");
      return new NextResponse(
        JSON.stringify({ valid: false, message: "Invalid username or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
