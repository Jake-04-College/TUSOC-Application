import clientPromise from "../../../../lib/mongoConnection";
const DB_NAME = process.env.MONGODB_DB_NAME
const DB_COLLECTION = "Courses";

export async function GET(res) {
    try {
        const client = await clientPromise;

        const db = client.db(DB_NAME);
        const collection = db.collection(DB_COLLECTION);

        // Find any documents in the database that have the course status as "active", 
        // return the CourseName and CourseCode
        const findResults = (await collection.find({status : "active"}).toArray()).map(course => ({
            courseName: course.course_name,
            courseCode: course.course_code,
        }));


        return new Response(
            JSON.stringify(findResults),
            { status: 200, headers: { "Content-Type": "application/json" }, }
        );
    } catch (error) {
        console.error("Error:", error);
    }
}
