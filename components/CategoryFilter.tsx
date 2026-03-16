'use client';

import { useState } from 'react';
import { Post, Category } from '@/types';
import PostCard from '@/components/PostCard';

interface CategoryFilterProps {
  posts: Post[];
  categories: Category[];
}

export default function CategoryFilter({ posts, categories }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredPosts =
    activeCategory === 'all'
      ? posts
      : posts.filter(
          (post) => post.metadata?.category?.slug === activeCategory
        );

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            activeCategory === 'all'
              ? 'bg-claude-600 text-white shadow-md shadow-claude-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Posts
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.slug)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeCategory === category.slug
                ? 'bg-claude-600 text-white shadow-md shadow-claude-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-5xl">🔍</span>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No posts found</h3>
          <p className="mt-2 text-gray-500">No posts in this category yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}