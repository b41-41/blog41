'use client';

import React from 'react';
import Link from 'next/link';
import { PAGINATION_DISPLAY_COUNT } from '@/common/constants';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

const PaginationButton = ({ page, active = false, disabled = false, children, basePath = '' }: { page: number | null, active?: boolean, disabled?: boolean, children: React.ReactNode, basePath?: string }) => {
  if (disabled) {
    return (
      <span className="px-3 py-2 text-gray-400 cursor-not-allowed">
        {children}
      </span>
    );
  }
  
  if (page === null) {
    return (
      <span className="px-3 py-2">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={`${basePath}/${page}`}
      className={`px-3 py-2 ${active ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600'}`}
    >
      {children}
    </Link>
  );
};

export default function Pagination({ currentPage, totalPages, basePath = '' }: PaginationProps) {
  const buttons = [];
  const showEllipsis = totalPages > PAGINATION_DISPLAY_COUNT + 2;
  
  buttons.push(
    <PaginationButton key="first" page={1} disabled={currentPage === 1} basePath={basePath}>&lt;&lt;</PaginationButton>
  );
  buttons.push(
    <PaginationButton key="prev" page={currentPage > 1 ? currentPage - 1 : 1} disabled={currentPage === 1} basePath={basePath}>&lt;</PaginationButton>
  );

  if (showEllipsis) {
    if (currentPage <= PAGINATION_DISPLAY_COUNT) {
      for (let i = 1; i <= PAGINATION_DISPLAY_COUNT; i++) {
        buttons.push(
          <PaginationButton key={i} page={i} active={currentPage === i} basePath={basePath}>{i}</PaginationButton>
        );
      }
      buttons.push(<PaginationButton key="ellipsis1" page={null} basePath={basePath}>...</PaginationButton>);
    } else if (currentPage >= totalPages - (PAGINATION_DISPLAY_COUNT - 1)) {
      buttons.push(<PaginationButton key="ellipsis2" page={null} basePath={basePath}>...</PaginationButton>);
      for (let i = totalPages - (PAGINATION_DISPLAY_COUNT - 1); i <= totalPages; i++) {
        buttons.push(
          <PaginationButton key={i} page={i} active={currentPage === i} basePath={basePath}>{i}</PaginationButton>
        );
      }
    } else {
      buttons.push(<PaginationButton key="ellipsis3" page={null} basePath={basePath}>...</PaginationButton>);
      const start = currentPage - Math.floor(PAGINATION_DISPLAY_COUNT / 2);
      const end = currentPage + Math.floor(PAGINATION_DISPLAY_COUNT / 2);
      for (let i = start; i <= end; i++) {
        buttons.push(
          <PaginationButton key={i} page={i} active={currentPage === i} basePath={basePath}>{i}</PaginationButton>
        );
      }
      buttons.push(<PaginationButton key="ellipsis4" page={null} basePath={basePath}>...</PaginationButton>);
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <PaginationButton key={i} page={i} active={currentPage === i} basePath={basePath}>{i}</PaginationButton>
      );
    }
  }

  buttons.push(
    <PaginationButton key="next" page={currentPage < totalPages ? currentPage + 1 : totalPages} disabled={currentPage === totalPages} basePath={basePath}>&gt;</PaginationButton>
  );
  buttons.push(
    <PaginationButton key="last" page={totalPages} disabled={currentPage === totalPages} basePath={basePath}>&gt;&gt;</PaginationButton>
  );

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {buttons}
    </div>
  );
} 