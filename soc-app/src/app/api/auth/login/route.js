import Bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const url = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DB_NAME

export async function POST(request) {
  let client;
  try {
    const data = await request.json();
    const email = String(data?.email || "").trim().toLowerCase();
    const password = String(data?.password || "");

    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ valid: false, message: "Email and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    client = new MongoClient(url);
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection("UserDetails");

    const user = await collection.findOne({ email });
    if (!user) {
      return new NextResponse(
        JSON.stringify({ valid: false, message: "Invalid username or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const storedHash = user.hashedPassword || user.pass;
    if (!storedHash) {
      return new NextResponse(
        JSON.stringify({ valid: false, message: "Invalid username or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const passwordMatch = await Bcrypt.compare(password, storedHash);

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
  } finally {
    if (client) {
      await client.close();
    }
  }
}
