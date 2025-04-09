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
      <div className={`flex flex-col items-center justify-center overflow-hidden rounded border-normal border-primary-dark bg-white transition-all 
          h-[80px] w-[96px] sm:h-[90px] sm:w-[108px] md:h-[100px] md:w-[120px] 
          ${isActive ? 'shadow-[0_4px_20px_rgba(0,0,0,0.15)] scale-[1.03]' : 'shadow-sm hover:shadow-md'}`}>
        <div 
          id="color-area" 
          className={`w-full bg-gradient-to-r from-pink-400 via-pink-300 to-blue-400 ${isActive ? 'animate-gradient-slow' : ''}
            h-[56px] sm:h-[63px] md:h-[70px]`}
          style={{ backgroundSize: isActive ? '200% 100%' : '100% 100%' }}
        >
        </div>
        <div className="h-[24px] sm:h-[27px] md:h-[30px] flex items-center justify-center">
          <p className="text-center font-bold text-gray-900 text-sm sm:text-base md:text-xl">{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default MenuItem;
