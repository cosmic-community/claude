import type { Metadata } from 'next';
import { getPosts, getCategories } from '@/lib/cosmic';
import CategoryFilter from '@/components/CategoryFilter';

export const metadata: Metadata = {
  title: 'All Posts — Claude',
  description: 'Browse all articles about Claude AI capabilities, features, and use cases.',
};

export default async function PostsPage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">All Posts</h1>
        <p className="mt-3 text-lg text-gray-500">
          Explore our collection of articles about what Claude can do.
        </p>
      </div>

      {/* Category Filter + Posts Grid */}
      {posts.length > 0 ? (
        <CategoryFilter posts={posts} categories={categories} />
      ) : (
        <div className="text-center py-20">
          <span className="text-6xl">📝</span>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">No posts yet</h2>
          <p className="mt-2 text-gray-500">
            Content is coming soon! Add posts in your Cosmic dashboard to see them here.
          </p>
        </div>
      )}
    </div>
  );
}