export default function Loading() {
  return (
    <div className="border-normal rounded-middle flex w-full flex-col items-center justify-center gap-2 border-primary-dark bg-white p-8 my-8 min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark"></div>
      <p className="mt-4 text-gray-600">로딩 중...</p>
    </div>
  );
} 