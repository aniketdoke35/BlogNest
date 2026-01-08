import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { title, content, image, categoryId } = await req.json();

        if (!title || !content || !categoryId) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Generate a simple slug
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") + "-" + Date.now();

        const post = await prisma.post.create({
            data: {
                title,
                content,
                image,
                slug,
                categoryId,
                authorId: (session.user as any).id,
            },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error("Create post error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
