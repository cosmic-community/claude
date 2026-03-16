// app/categories/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getPostsByCategoryId } from '@/lib/cosmic';
import PostCard from '@/components/PostCard';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found — Claude' };
  }

  return {
    title: `${category.title} — Claude`,
    description: category.metadata?.description || `Browse ${category.title} articles on the Claude blog.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategoryId(category.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link href="/categories" className="hover:text-claude-600 transition-colors">
              Categories
            </Link>
          </li>
          <li>
            <svg className="h-4 w-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li className="font-medium text-gray-900">{category.title}</li>
        </ol>
      </nav>

      {/* Category Header */}
      <div className="mb-10 rounded-2xl bg-gradient-to-br from-claude-50 via-white to-indigo-50 border border-claude-100 p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-claude-100 text-claude-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{category.title}</h1>
        </div>
        {category.metadata?.description && (
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            {category.metadata.description}
          </p>
        )}
        <p className="mt-3 text-sm text-gray-400">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-5xl">📄</span>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">No posts in this category</h2>
          <p className="mt-2 text-gray-500">
            Check back soon for new articles in {category.title}.
          </p>
          <Link
            href="/posts"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-claude-600 hover:text-claude-700 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Browse all posts
          </Link>
        </div>
      )}
    </div>
  );
}