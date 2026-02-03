import { MongoClient } from "mongodb";

const MONGODB_URL = process.env.MONGODB_URL;
const DB_NAME = process.env.MONGODB_DB_NAME;

if (!MONGODB_URL || !DB_NAME) {
    throw new Error("Database configuration missing");
}

let client;
let clientPromise;

if (!global.MongoClientPromise){
client = new MongoClient(MONGODB_URL);
global.MongoClientPromise = client.connect();
}

clientPromise = global.MongoClientPromise;

export default clientPromise;