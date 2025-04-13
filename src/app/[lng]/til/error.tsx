'use client';

import { useEffect } from 'react';

export default function TILError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="border-normal rounded-middle flex w-full flex-col gap-2 border-primary-dark bg-white p-4">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Today I Learned</h1>
        
        <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
          <h2 className="text-xl font-semibold text-red-600 mb-4">오류가 발생했습니다</h2>
          <p className="mb-6 text-gray-600">다시 시도해주세요.</p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-primary-dark text-white rounded hover:bg-opacity-90 transition-all"
          >
            다시 시도
          </button>
        </div>
      </div>
    </div>
  );
} 