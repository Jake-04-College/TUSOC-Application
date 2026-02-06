export const runtime = "nodejs";

import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";
import OnboardingForm from "./components/OnboadingForm";

export default async function OnboardingPage() {
    const session = await auth();
    if (!session) redirect("/api/auth/signin");

    return (
        <main>
            <h1 style={{ textAlign: "center" }}>Onboarding</h1>
            <OnboardingForm
                Username={session.user.username ?? session.user.name ?? ""}
                UserEmail={session.user.email ?? ""}
                UserRole={session.user.role ?? "user"}
            />
        </main>
    );
}
