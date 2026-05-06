import clientPromise from "../../../../lib/mongoConnection";

const DB_NAME = process.env.MONGODB_DB_NAME;
const DB_COLLECTION = "SocietyInformation";

export async function GET() {
    try {
        const client = await clientPromise;
        const collection = client.db(DB_NAME).collection(DB_COLLECTION);
        const societies = await collection.find({}).toArray();

        return new Response(
            JSON.stringify(societies),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Failed to fetch societies", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch societies" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    } 
}
