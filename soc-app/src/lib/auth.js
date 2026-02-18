import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./mongoConnection"

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    session: { strategy: "database" },
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
            authorization: {
                params: {
                    scope: "read:user user:email",
                },
            },
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],

    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id;

            if (!session?.user?.email) return session;

            const dbconnection = await clientPromise;
            const db = dbconnection.db(process.env.MONGODB_DB_NAME);

            const userData = await db
                .collection("UserDetails")
                .findOne(
                    { email: session.user.email },
                    { projection: { username: 1, role: 1, courseCode: 1, onboarded: 1 } }
                );

            session.user.username = userData?.username ?? null;
            session.user.role = userData?.role ?? "user";
            session.user.courseCode = userData?.courseCode ?? null;
            session.user.onboarded = !!userData?.onboarded;
            
            if (userData?._id) session.user.id = userData._id.toString();

            return session;
        },
    }

})
