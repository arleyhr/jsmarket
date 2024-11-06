export default function OrderSkeleton() {
  return (
    <div className="border rounded-lg p-6 bg-white animate-pulse">
      <div className="flex justify-between items-start">
        <div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
        <div className="h-6 w-20 bg-gray-200 rounded"></div>
      </div>
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between mb-2">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="flex gap-6 mt-3">
          <div className="w-24 h-24 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="h-5 w-48 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
