import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center px-4">
        <div className="text-7xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">404</h1>
        <p className="mt-3 text-lg text-gray-500 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-claude-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-claude-200 hover:shadow-xl transition-all duration-300"
          >
            Go Home
          </Link>
          <Link
            href="/posts"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
          >
            Browse Posts
          </Link>
        </div>
      </div>
    </div>
  );
}