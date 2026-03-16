import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-gray-50/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-claude-500 to-indigo-600 text-white font-bold text-sm">
                C
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">
                Claude
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-xs">
              Exploring the incredible capabilities of Claude AI — from creative writing to code generation and beyond.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-500 hover:text-claude-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-sm text-gray-500 hover:text-claude-600 transition-colors">
                  All Posts
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-gray-500 hover:text-claude-600 transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              About
            </h3>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              A blog dedicated to showcasing what Claude can do. Powered by Cosmic CMS and built with Next.js.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6">
          <p className="text-center text-xs text-gray-400">
            &copy; {currentYear} Claude Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}