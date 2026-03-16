import { createBucketClient } from '@cosmicjs/sdk';
import { Post, Category, hasStatus } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Fetch all posts, sorted by publication date (newest first)
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'type'])
      .depth(1);

    const posts = response.objects as Post[];

    return posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.publication_date || a.created_at).getTime();
      const dateB = new Date(b.metadata?.publication_date || b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error: unknown) {
    // Changed: Return empty array for 404 (no objects found)
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    // Changed: Log error and return empty array instead of throwing during build
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at', 'type'])
      .depth(1);

    return response.object as Post;
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    // Changed: Log error and return null instead of throwing
    console.error('Failed to fetch post:', error);
    return null;
  }
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'type'])
      .depth(1);

    return response.objects as Category[];
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    // Changed: Log error and return empty array instead of throwing
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

// Fetch a single category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'type'])
      .depth(1);

    return response.object as Category;
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    // Changed: Log error and return null instead of throwing
    console.error('Failed to fetch category:', error);
    return null;
  }
}

// Fetch posts by category ID
export async function getPostsByCategoryId(categoryId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts', 'metadata.category': categoryId })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'type'])
      .depth(1);

    const posts = response.objects as Post[];

    return posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.publication_date || a.created_at).getTime();
      const dateB = new Date(b.metadata?.publication_date || b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    // Changed: Log error and return empty array instead of throwing
    console.error('Failed to fetch posts by category:', error);
    return [];
  }
}