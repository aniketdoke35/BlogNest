import { prisma } from '../../lib/db';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const post = await prisma.post.findUnique({
        where: { slug },
        include: {
            category: true,
            author: true,
        },
    });

    if (!post) {
        notFound();
    }

    return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 text-center">
                <div className="mb-4 flex justify-center gap-2">
                    <span className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                        {post.category?.name}
                    </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-6">
                    {post.title}
                </h1>
                <div className="flex items-center justify-center gap-4 text-neutral-500 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600">
                            {post.author?.name?.charAt(0) || 'A'}
                        </div>
                        <span className="font-medium text-neutral-900">{post.author?.name}</span>
                    </div>
                    <span>•</span>
                    <time dateTime={post.createdAt.toISOString()}>
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                </div>
            </div>

            <div className="relative aspect-video w-full mb-12 rounded-3xl overflow-hidden shadow-lg">
                <Image
                    src={post.image || 'https://images.unsplash.com/photo-1499750310159-5254f4197283?auto=format&fit=crop&q=80&w=2940'}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="prose prose-lg prose-neutral mx-auto">
                {/* In a real app, use a markdown parser or rich text renderer here */}
                {post.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-neutral-700 leading-relaxed">
                        {paragraph}
                    </p>
                ))}
            </div>

            <div className="mt-16 pt-8 border-t border-neutral-200">
                <Link href="/" className="inline-flex items-center text-black font-semibold hover:gap-2 transition-all">
                    <span aria-hidden="true">&larr;</span> Back to Home
                </Link>
            </div>
        </article>
    );
}
