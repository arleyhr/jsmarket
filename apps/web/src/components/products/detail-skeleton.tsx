export default function DetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="sticky top-0">
          <div className="w-full h-96 bg-gray-200 rounded-lg"></div>
        </div>

        <div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mt-1 mb-4"></div>

          <div className="flex items-center mt-2">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-24 ml-2"></div>
          </div>

          <div className="border-t border-b border-gray-200 py-4 my-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>

          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>

          <div className="space-y-2">
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>

          <div className="mt-6">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-20 bg-gray-200 rounded w-full"></div>
          </div>

          <div className="mt-8">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="h-16 bg-gray-200 rounded w-full mt-2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
