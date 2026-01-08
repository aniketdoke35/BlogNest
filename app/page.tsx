import { prisma } from './lib/db';
import PostCard from './components/PostCard';
import CategoryFilter from './components/CategoryFilter';

// Force dynamic behavior because we are reading searchParams
export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const categorySlug = typeof params.category === 'string' ? params.category : undefined;

  const categories = await prisma.category.findMany();

  const posts = await prisma.post.findMany({
    where: categorySlug
      ? {
        category: {
          slug: categorySlug,
        },
      }
      : undefined,
    include: {
      category: true,
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight mb-4">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-neutral-500">BlogNest</span>
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
      </div>

      <CategoryFilter categories={categories} />

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium text-neutral-900">No posts found</h3>
          <p className="text-neutral-500 mt-2">Try selecting a different category or check back later.</p>
        </div>
      )}
    </div>
  );
}
