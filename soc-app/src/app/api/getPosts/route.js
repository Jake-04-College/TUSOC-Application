const MONGODB_URL = process.env.MONGODB_URL;
const DB_NAME = process.env.MONGODB_DB_NAME;
const DB_COLLECTION = "UserPosts";

export async function GET() {
    if (!MONGODB_URL || !DB_NAME) {
        return new Response(
            JSON.stringify({ error: "Database configuration missing" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

    const { MongoClient } = require("mongodb");
    const client = new MongoClient(MONGODB_URL);

    try {
        await client.connect();
        const collection = client.db(DB_NAME).collection(DB_COLLECTION);
        const posts = await collection.find({}).toArray();

        return new Response(
            JSON.stringify(posts),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Failed to fetch posts", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch posts" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    } finally {
        await client.close();
    }
}
