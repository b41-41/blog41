import type { MenuItemType } from '@/common/type';
import Link from 'next/link';
import React from 'react';
import { isActiveMenu } from '@/utils/isActiveMenu';

interface MenuItemProps extends Omit<MenuItemType, 'key'> {
  itemKey?: string;
  currentPath?: string;
}

const MenuItem = ({ title, href, itemKey, currentPath = '' }: MenuItemProps) => {
  // 현재 경로가 메뉴 항목의 href와 일치하는지 확인
  const isActive = isActiveMenu(href, currentPath);
  
  return (
    <Link href={href}>
      <div className={`flex h-[100px] w-[120px] flex-col items-center justify-center overflow-hidden rounded border-normal border-primary-dark bg-white transition-all ${isActive ? 'shadow-[0_4px_20px_rgba(0,0,0,0.15)] scale-[1.03]' : 'shadow-sm hover:shadow-md'}`}>
        <div 
          id="color-area" 
          className={`h-[70px] w-full bg-gradient-to-r from-pink-400 via-pink-300 to-blue-400 ${isActive ? 'animate-gradient-slow' : ''}`}
          style={{ backgroundSize: isActive ? '200% 100%' : '100% 100%' }}
        >
        </div>
        <p className="text-center text-base font-bold pt-1 text-gray-900">{title}</p>
      </div>
    </Link>
  );
};

export default MenuItem;
