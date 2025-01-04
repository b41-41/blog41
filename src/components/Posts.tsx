import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

async function getPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    headers: {
      'count': '10'
    },
    cache: 'force-cache' 
  });

  if (!response.ok) {
    throw new Error('포스트를 가져오는데 실패했습니다');
  }

  return response.json();
}

export default async function Posts() {
  const posts = await getPosts();

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <h1 className='text-4xl font-bold'>Posts</h1>
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
              <p className='text-sm text-gray-400'>{dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}