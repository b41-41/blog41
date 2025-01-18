import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import Pagination from '@/components/Pagination';
import { DEFAULT_DATE_FORMAT, POSTS_PER_PAGE } from '@/common/constants';
import { notFound } from 'next/navigation';

interface PostListPageProps {
  params: Promise<{ page: string }>;
}

async function getPosts(page: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?page=${page}`, {
    headers: {
      'count': POSTS_PER_PAGE.toString()
    },
    cache: 'force-cache'
  });

  if (!response.ok) {
    throw new Error('포스트를 가져오는데 실패했습니다');
  }

  return response.json();
}

async function getTotalPages() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?page=1`, {
    headers: {
      'count': POSTS_PER_PAGE.toString()
    },
    cache: 'force-cache'
  });

  if (!response.ok) {
    throw new Error('데이터를 가져오는데 실패했습니다');
  }

  const data = await response.json();
  return data.totalPages;
}

export async function generateStaticParams() {
  const totalPages = await getTotalPages();
  
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString()
  }));
}

export default async function PostListPage({
  params,
}: PostListPageProps) {
  const { page } = await params;
  const pageNumber = Number(page);

  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const { posts, totalPages } = await getPosts(pageNumber);

  if (pageNumber > totalPages) {
    notFound();
  }

  return (
    <div className="border-normal rounded-middle flex w-full flex-col gap-2 border-primary-dark bg-white p-4">
    <div className='flex flex-col items-center justify-center gap-4'>
      <h1 className='text-4xl font-bold w-full'>Posts</h1>
      <div className='flex flex-col items-center justify-center gap-4 w-full'>
        {posts.map((post: any) => (
          <Link 
            href={`/post/${post.postId}`}
            key={post.postId}
            className='w-full border-normal rounded border-primary-dark bg-white p-4 hover:bg-gray-50'
          >
            <div className='flex flex-col gap-2'>
              <h2 className='text-2xl font-bold'>{post.title}</h2>
              <p className='text-lg text-gray-600'>{post.description}</p>
              <p className='text-sm text-gray-400'>{dayjs(post.createdAt).format(DEFAULT_DATE_FORMAT)}</p>
            </div>
          </Link>
        ))}
      </div>
      <Pagination currentPage={pageNumber} totalPages={totalPages} basePath="/posts" />
    </div>
    </div>
  );
} 