import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories } from '@/lib/cosmic';

// Changed: Force dynamic rendering to avoid static generation failures
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Categories — Claude',
  description: 'Browse categories of articles about Claude AI capabilities.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Categories</h1>
        <p className="mt-3 text-lg text-gray-500">
          Browse articles by topic to find exactly what you&apos;re looking for.
        </p>
      </div>

      {/* Categories Grid */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-lg hover:border-claude-200 transition-all duration-300"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-claude-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-claude-100 to-indigo-100 text-claude-600 mb-5 group-hover:from-claude-200 group-hover:to-indigo-200 transition-colors duration-300">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>

                <h2 className="text-xl font-bold text-gray-900 group-hover:text-claude-600 transition-colors duration-200">
                  {category.title}
                </h2>

                {category.metadata?.description && (
                  <p className="mt-3 text-gray-500 leading-relaxed line-clamp-3">
                    {category.metadata.description}
                  </p>
                )}

                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-claude-600 group-hover:text-claude-700">
                  View posts
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-6xl">🏷️</span>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">No categories yet</h2>
          <p className="mt-2 text-gray-500">
            Add categories in your Cosmic dashboard to organize your content.
          </p>
        </div>
      )}
    </div>
  );
}