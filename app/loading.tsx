export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-claude-100 border-t-claude-600 animate-spin mx-auto" />
        </div>
        <p className="mt-4 text-sm text-gray-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}