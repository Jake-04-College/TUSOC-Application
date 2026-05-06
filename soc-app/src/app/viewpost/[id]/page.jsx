import { redirect } from "next/navigation";

export default async function ViewPostPage({ params }) {
    const resolvedParams = await params;
    redirect(`/expandPost?id=${resolvedParams.id}`);
}
