// app/posts/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '@/lib/cosmic';
import CategoryBadge from '@/components/CategoryBadge';

// Changed: Force dynamic rendering to avoid static generation failures
export const dynamic = 'force-dynamic';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found — Claude' };
  }

  const excerpt = (post.metadata?.content || '')
    .replace(/<[^>]*>/g, '')
    .substring(0, 160);

  return {
    title: `${post.title} — Claude`,
    description: excerpt || `Read "${post.title}" on the Claude blog.`,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const featuredImage = post.metadata?.featured_image;
  const category = post.metadata?.category;
  const publicationDate = post.metadata?.publication_date || post.created_at;
  const content = post.metadata?.content || '';

  const formattedDate = new Date(publicationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Fetch related posts
  const allPosts = await getPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article>
      {/* Hero / Header */}
      <div className="relative bg-gradient-to-br from-claude-50 via-white to-indigo-50">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Link
            href="/posts"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-claude-600 transition-colors mb-6"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Posts
          </Link>

          {category && (
            <div className="mb-4">
              <CategoryBadge category={category} size="md" />
            </div>
          )}

          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-5 flex items-center gap-3 text-sm text-gray-500">
            <time dateTime={publicationDate}>{formattedDate}</time>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {featuredImage && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-4">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src={`${featuredImage.imgix_url}?w=2000&h=1000&fit=crop&auto=format,compress`}
              alt={post.title}
              width={1000}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div
          className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-claude-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-pre:bg-gray-900"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50/50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">More Posts</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => {
                const relImg = relatedPost.metadata?.featured_image;
                const relDate = relatedPost.metadata?.publication_date || relatedPost.created_at;
                const relFormattedDate = new Date(relDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });

                return (
                  <Link
                    key={relatedPost.id}
                    href={`/posts/${relatedPost.slug}`}
                    className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      {relImg ? (
                        <img
                          src={`${relImg.imgix_url}?w=600&h=375&fit=crop&auto=format,compress`}
                          alt={relatedPost.title}
                          width={300}
                          height={187}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-claude-50 to-indigo-50 flex items-center justify-center">
                          <span className="text-3xl">✨</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-claude-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <time className="mt-2 block text-xs text-gray-400">
                        {relFormattedDate}
                      </time>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}