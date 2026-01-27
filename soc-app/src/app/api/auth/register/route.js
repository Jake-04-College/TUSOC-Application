import Bcrypt from "bcryptjs";

const MONGODB_URL = process.env.MONGODB_URL
const DB_NAME = process.env.MONGODB_DB_NAME

export async function POST(request) {
  try {
    const { username, email, password, dateOfBirth, courseCode, courseYear } = await request.json();

    const MONGODB_URL = process.env.MONGODB_URL
    const DB_NAME = process.env.MONGODB_DB_NAME
    const DB_COLLECTION = "UserDetails"

    const { MongoClient } = require("mongodb");

    const client = new MongoClient(MONGODB_URL);

    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(DB_COLLECTION);

    const hashedPassword = await Bcrypt.hash(password, 10);

    const insertResult = await collection.insertOne({
      username,
      email: email.toLowerCase(),
      hashedPassword,
      dob: new Date(dateOfBirth),
      courseCode,
      // courseYear: Number(courseYear), TODO: Needs to be added to Register Page
      societies: [],
      createdAt: new Date(),
    });


    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(JSON.stringify({ error: "Failed to register" }),
      {
        status: 500, headers: { "Content-Type": "application/json" },
      });
  }
}
