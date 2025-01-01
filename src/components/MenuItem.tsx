import type { MenuItemType } from '@/common/type';
import Link from 'next/link';
import React from 'react';

interface MenuItemProps extends MenuItemType {}1

const MenuItem = ({ title, href, key }: MenuItemProps) => {
  return (
    <Link href={href} key={key}>
      <div className="border-normal flex h-[100px] w-[120px] flex-col items-center justify-center overflow-hidden rounded border-primary-dark bg-white">
        <div
          id="color-area"
          className="h-[80px] w-[120px] bg-gradient-to-r from-pink-400 via-pink-300 to-blue-400"
        ></div>
        <p className="text-center text-xl font-bold">{title}</p>
      </div>
    </Link>
  );
};

export default MenuItem;
