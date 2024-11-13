export default function AppColdstart() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Starting API</h2>
        <p className="text-gray-600">
          The server is in standby mode and is starting up. Please wait a moment...
        </p>
      </div>
    </div>
  );
}
