'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const WriteButton = () => {
  const pathname = usePathname();
  const [isLocal, setIsLocal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 로컬 환경인지 확인
    const localHostname = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1';
    setIsLocal(localHostname);
  }, []);

  // 서버 사이드 렌더링 시 보이지 않도록 처리
  if (!mounted) return null;
  
  // add 페이지이거나 로컬 환경이 아닌 경우 표시하지 않음
  if (pathname === '/add' || !isLocal) return null;

  return (
    <Link href="/add">
      <div className="fixed top-4 right-4 z-50 rounded-full bg-primary-dark p-3 shadow-lg transition-transform hover:scale-105">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="white" 
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </div>
    </Link>
  );
};

export default WriteButton;
