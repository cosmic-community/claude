import Link from 'next/link';
import { Post } from '@/types';
import CategoryBadge from '@/components/CategoryBadge';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image;
  const category = post.metadata?.category;
  const publicationDate = post.metadata?.publication_date || post.created_at;

  const formattedDate = new Date(publicationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Extract a plain-text excerpt from the content
  const rawContent = post.metadata?.content || '';
  const excerpt = rawContent.replace(/<[^>]*>/g, '').substring(0, 160).trim();

  if (featured) {
    return (
      <Link href={`/posts/${post.slug}`} className="group block">
        <article className="relative overflow-hidden rounded-2xl bg-white shadow-md card-hover border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
              {featuredImage ? (
                <img
                  src={`${featuredImage.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-claude-100 to-indigo-100">
                  <span className="text-6xl">✨</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-8 lg:p-10">
              {category && (
                <div className="mb-3">
                  <CategoryBadge category={category} size="md" />
                </div>
              )}
              <h2 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-claude-600 transition-colors duration-200 lg:text-3xl">
                {post.title}
              </h2>
              {excerpt && (
                <p className="mt-3 text-gray-500 leading-relaxed line-clamp-3">
                  {excerpt}...
                </p>
              )}
              <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">
                <time dateTime={publicationDate}>{formattedDate}</time>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="overflow-hidden rounded-xl bg-white shadow-sm card-hover border border-gray-100 h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {featuredImage ? (
            <img
              src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={post.title}
              width={400}
              height={250}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-claude-50 to-indigo-50">
              <span className="text-4xl">✨</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          {category && (
            <div className="mb-2">
              <CategoryBadge category={category} />
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900 leading-snug group-hover:text-claude-600 transition-colors duration-200">
            {post.title}
          </h3>
          {excerpt && (
            <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
              {excerpt}...
            </p>
          )}
          <div className="mt-4 flex items-center justify-between">
            <time className="text-xs text-gray-400" dateTime={publicationDate}>
              {formattedDate}
            </time>
            <span className="text-xs font-medium text-claude-600 group-hover:text-claude-700 transition-colors">
              Read more →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}