"use server";
import { auth } from "../../lib/auth";
import LoginButton from "../components/buttons/LoginButton";
import LogoutButton from "../components/buttons/LogoutButton";


export default async function TestLoginPage() {

    const session = await auth();

    console.log(session);

    if (session?.user) {
        return <div>
            <p> You are signed in as {session.user.id}</p>
            <p> You are signed in as {session.user.email}</p>
            <p> You are signed in as {session.user.role}</p>

            <img src={session.user.image} alt="Profile Picture" width={100} height={100} />
            <LogoutButton />
        </div>
    }
    else {
    return ( 
    <div><p> You are not signed in</p>
    <LoginButton />
    </div>
    )
}
}