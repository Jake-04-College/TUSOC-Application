export const runtime = "nodejs";

import Bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

const MONGODB_URL = process.env.MONGODB_URL;
const DB_NAME = process.env.MONGODB_DB_NAME;
const DB_COLLECTION = "UserDetails";

export async function POST(request) {
  let client;

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ valid: false, message: "Missing credentials" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    client = new MongoClient(MONGODB_URL);
    await client.connect();

    const db = client.db(DB_NAME);
    const collection = db.collection(DB_COLLECTION);

    const user = await collection.findOne({ email: email.toLowerCase() });

    if (!user || !user.hashedPassword) {
      return new Response(
        JSON.stringify({ valid: false, message: "Invalid credentials" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const matches = await Bcrypt.compare(password, user.hashedPassword);

    if (!matches) {
      return new Response(
        JSON.stringify({ valid: false, message: "Invalid credentials" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        valid: true,
        user: {
          id: String(user._id),
          email: user.email,
          username: user.username ?? null,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ valid: false, message: "Login failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}
