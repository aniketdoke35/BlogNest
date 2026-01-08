import { prisma } from '../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await prisma.post.deleteMany();
        await prisma.category.deleteMany();
        await prisma.user.deleteMany();

        const user = await prisma.user.create({
            data: {
                email: 'demo@blognest.com',
                name: 'Aniket Doke',
                password: 'password123',
                role: 'ADMIN',
            },
        });

        const tech = await prisma.category.create({
            data: { name: 'Technology', slug: 'technology' },
        });
        const lifestyle = await prisma.category.create({
            data: { name: 'Lifestyle', slug: 'lifestyle' },
        });
        const design = await prisma.category.create({
            data: { name: 'Design', slug: 'design' },
        });

        await prisma.post.create({
            data: {
                title: 'The Future of AI in Web Development',
                slug: 'future-of-ai-web-dev',
                content: 'Artificial Intelligence is revolutionizing the way we build websites. From automated code generation to intelligent design systems, AI is enabling developers to ship faster and focused on creativity rather than boilerplate. In this post, we explore the top tools and trends shaping the landscape.',
                image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2940',
                authorId: user.id,
                categoryId: tech.id,
            },
        });

        await prisma.post.create({
            data: {
                title: 'Minimalism: A Design Philosophy',
                slug: 'minimalism-design-philosophy',
                content: 'Minimalism is not just about using less; it is about making room for what truly matters. In web design, this translates to clean interfaces, negative space, and focused typography. We discuss how to achieve a minimal aesthetic without sacrificing functionality.',
                image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=2940',
                authorId: user.id,
                categoryId: design.id,
            },
        });

        await prisma.post.create({
            data: {
                title: 'Top 10 Travel Destinations for 2026',
                slug: 'top-10-travel-destinations-2026',
                content: 'Pack your bags! We have curated a list of the most breathtaking locations to visit this year. From the mountains of Patagonia to the streets of Kyoto, these destinations offer unforgettable experiences for every traveler.',
                image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2940',
                authorId: user.id,
                categoryId: lifestyle.id,
            },
        });

        return NextResponse.json({ message: 'Seeding successful' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Seeding failed', details: String(error) }, { status: 500 });
    }
}
