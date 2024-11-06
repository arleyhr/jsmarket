export default function ProductsListSkeleton() {
  return (
    <div className="flex animate-pulse">
      <div className="w-64 min-h-screen bg-gray-100 p-4 border-r border-gray-300">
        <div className="mb-6">
          <div className="h-6 bg-gray-200 rounded w-24 mb-3"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-20 ml-2"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="h-6 bg-gray-200 rounded w-16 mb-3"></div>
          <div className="flex items-center">
            <div className="w-20 h-8 bg-gray-200 rounded"></div>
            <div className="mx-2">-</div>
            <div className="w-20 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="mb-6">
          <div className="h-6 bg-gray-200 rounded w-20 mb-3"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-24 ml-2"></div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="h-6 bg-gray-200 rounded w-24 mb-3"></div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-16 ml-2"></div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 pb-4">
        <div className="flex justify-end mb-6">
          <div className="h-10 w-64 bg-gray-200 rounded-lg"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-gray-100 p-0 border border-gray-300 rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="mt-4 p-2">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="flex items-center mt-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="mt-2">
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="mt-2">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="p-2">
                <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
