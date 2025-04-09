'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { isActiveMenu } from '@/utils/isActiveMenu';

interface ActiveMenuIndicatorProps {
  href: string;
}

const ActiveMenuIndicator = ({ href }: ActiveMenuIndicatorProps) => {
  const pathname = usePathname();
  
  const isActive = isActiveMenu(href, pathname);
  
  return (
    <div
      className={`h-[70px] w-full bg-gradient-to-r from-pink-400 via-pink-300 to-blue-400 ${
        isActive ? 'animate-gradient-slow' : ''
      }`}
    />
  );
};

export default ActiveMenuIndicator;
