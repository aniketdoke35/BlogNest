import Link from 'next/link';
import Image from 'next/image';
import { Post, Category, User } from '@prisma/client';

// Extended type to include relations
type PostWithRelations = Post & {
    category: Category;
    author: User;
};

interface PostCardProps {
    post: PostWithRelations;
}

const PostCard = ({ post }: PostCardProps) => {
    return (
        <Link href={`/post/${post.slug}`} className="group flex flex-col gap-4">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                    src={post.image || 'https://images.unsplash.com/photo-1499750310159-5254f4197283?auto=format&fit=crop&q=80&w=2940'} // Fallback image
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-black uppercase tracking-wider shadow-sm">
                        {post.category?.name || 'Uncategorized'}
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>•</span>
                    <span>{post.author?.name || 'Unknown Author'}</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 leading-tight group-hover:text-neutral-600 transition-colors">
                    {post.title}
                </h3>
                <p className="text-neutral-500 line-clamp-2 text-sm leading-relaxed">
                    {post.content}
                </p>
                <div className="mt-2 flex items-center text-sm font-semibold text-black gap-1 group-hover:gap-2 transition-all">
                    Read Post <span aria-hidden="true">&rarr;</span>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
