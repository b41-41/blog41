import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="relative mb-[50px] flex w-full flex-col">
      <div
        id="header-image"
        className="animate-gradient flex h-[270px] w-full justify-center rounded-b-md border-x-2 border-b-2 border-primary-dark bg-gradient-to-r from-[#F4C430] via-[#FFB90F] to-[#DAA520] align-middle"
      >
        <Image src="/logo.png" alt="blog41" width={200} height={200} className="object-contain" />
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
