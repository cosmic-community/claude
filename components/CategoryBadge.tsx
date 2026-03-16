import Link from 'next/link';
import { Category } from '@/types';

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
  linked?: boolean;
}

const categoryColors: Record<string, string> = {
  default: 'bg-claude-50 text-claude-700 hover:bg-claude-100',
};

export default function CategoryBadge({ category, size = 'sm', linked = true }: CategoryBadgeProps) {
  const colorClass = categoryColors[category.slug] || categoryColors['default'];
  const sizeClass = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  const badge = (
    <span
      className={`inline-flex items-center rounded-full font-medium transition-colors duration-200 ${colorClass} ${sizeClass}`}
    >
      {category.title}
    </span>
  );

  if (linked) {
    return (
      <Link href={`/categories/${category.slug}`}>
        {badge}
      </Link>
    );
  }

  return badge;
}