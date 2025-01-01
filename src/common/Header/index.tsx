import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { MENU_ITEMS } from '../constants';
import MenuItem from '@/components/MenuItem';

const Header = () => {
  return (
    <header className="relative mb-[50px] flex w-full flex-col">
      <div
        id="header-image"
        className="animate-gradient flex h-[270px] w-full items-start rounded-b-md border-x-2 border-b-2 border-primary-dark bg-gradient-to-r from-[#F4C430] via-[#FFB90F] to-[#DAA520] p-8"
      >
        <Image
          id="logo"
          src="/logo.png"
          alt="blog41"
          width={120}
          height={120}
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2">
        <div className="flex gap-4">{MENU_ITEMS.map(MenuItem)}</div>
      </div>
    </header>
  );
};

export default Header;
