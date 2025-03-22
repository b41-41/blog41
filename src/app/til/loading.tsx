export default function TILLoading() {
  return (
    <div className="border-normal rounded-middle flex w-full flex-col gap-2 border-primary-dark bg-white p-4">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Today I Learned</h1>
        
        <div className="flex flex-col gap-4 w-full">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-full border-normal rounded border-primary-dark bg-white p-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse mt-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse mt-1"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 