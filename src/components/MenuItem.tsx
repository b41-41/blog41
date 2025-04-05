import type { MenuItemType } from '@/common/type';
import Link from 'next/link';
import React from 'react';

interface MenuItemProps extends MenuItemType {}1

const MenuItem = ({ title, href, key }: MenuItemProps) => {
  return (
    <Link href={href} key={key}>
      <div className="border-normal flex h-[70px] w-[80px] sm:h-[90px] sm:w-[100px] md:h-[100px] md:w-[120px] flex-col items-center justify-center overflow-hidden rounded border-primary-dark bg-white shadow-sm hover:shadow-md transition-shadow">
        <div
          id="color-area"
          className="h-[50px] w-full sm:h-[70px] md:h-[80px] bg-gradient-to-r from-pink-400 via-pink-300 to-blue-400"
        ></div>
        <p className="text-center text-sm sm:text-base md:text-xl font-bold text-gray-900">{title}</p>
      </div>
    </Link>
  );
};

export default MenuItem;
