'use client';

import { useEffect } from 'react';

export default function GlobalError({
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
    <html lang="ko">
      <body className="flex flex-col items-center bg-yellow-100 min-h-screen justify-center">
        <div className="border-normal rounded-middle flex w-full max-w-[600px] flex-col gap-2 border-primary-dark bg-white p-8 mx-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">오류가 발생했습니다</h2>
            <p className="mb-6 text-gray-600">다시 시도해주세요.</p>
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-primary-dark text-white rounded hover:bg-opacity-90 transition-all"
            >
              다시 시도
            </button>
          </div>
        </div>
      </body>
    </html>
  );
} 