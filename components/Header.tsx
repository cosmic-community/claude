import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-claude-500 to-indigo-600 text-white font-bold text-lg shadow-md shadow-claude-200 group-hover:shadow-lg group-hover:shadow-claude-300 transition-shadow duration-300">
            C
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            Claude
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/posts"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
          >
            Posts
          </Link>
          <Link
            href="/categories"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
          >
            Categories
          </Link>
        </nav>
      </div>
    </header>
  );
}