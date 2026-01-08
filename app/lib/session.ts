import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export async function checkSession() {
    const session = await getServerSession(authOptions);
    return session;
}

export async function requireAuth() {
    const session = await checkSession();
    if (!session) {
        redirect("/login");
    }
    return session;
}
