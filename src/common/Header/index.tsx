import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="relative mb-[50px] flex w-[1000px] flex-col">
      <div className="flex h-[270px] w-[1000px] justify-center rounded-b-md border-x-2 border-b-2 border-primary-dark align-middle">
        header 이미지 영역
      </div>
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 bg-red-100">
        <div className="flex gap-4">
          <Link href="/">홈</Link>
          <Link href="/portfolio">포트폴리오</Link>
          <Link href="/contact">연락하기</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
