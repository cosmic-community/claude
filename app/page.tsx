import Link from 'next/link';
import { getPosts, getCategories } from '@/lib/cosmic';
import PostCard from '@/components/PostCard';

// Changed: Force dynamic rendering to avoid static generation failures
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories(),
  ]);

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-claude-50 via-white to-indigo-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-claude-200 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-claude-100 px-4 py-1.5 text-sm font-medium text-claude-700 mb-6">
              <span>✨</span>
              Exploring AI Capabilities
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Discover What{' '}
              <span className="gradient-text">Claude</span>{' '}
              Can Do
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed sm:text-xl max-w-2xl mx-auto">
              From creative writing and code generation to deep analysis and reasoning — explore the full spectrum of Claude&apos;s capabilities through in-depth articles and guides.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/posts"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-claude-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-claude-200 hover:shadow-xl hover:shadow-claude-300 transition-all duration-300 hover:-translate-y-0.5"
              >
                Browse All Posts
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                Explore Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Post</h2>
          </div>
          <PostCard post={featuredPost} featured />
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
            <Link
              href="/posts"
              className="text-sm font-medium text-claude-600 hover:text-claude-700 transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="bg-gray-50/50 border-t border-gray-100">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
              <p className="mt-2 text-gray-500">Find articles that match your interests</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-claude-200 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-claude-50 text-claude-600 group-hover:bg-claude-100 transition-colors">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-claude-600 transition-colors">
                        {category.title}
                      </h3>
                      {category.metadata?.description && (
                        <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                          {category.metadata.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {posts.length === 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-6xl">📝</span>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">No posts yet</h2>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Content is coming soon! Add posts to your Cosmic bucket to see them appear here.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}