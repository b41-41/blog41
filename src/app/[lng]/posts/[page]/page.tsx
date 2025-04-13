import React from 'react';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import { DEFAULT_DATE_FORMAT, POSTS_PER_PAGE } from '@/common/constants';
import { notFound } from 'next/navigation';
import { formatToLocalTime } from '@/utils/dayjs';
import { PostType } from '@/app/[lng]/post/post.type';
import { getTranslation } from '@/i18n';
import PostLanguageOverlay from '@/components/PostLanguageOverlay';

interface PostListPageProps {
  params: Promise<{ page: string; lng: string }>;
}

async function getPosts(page: number) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?page=${page}`, {
      headers: {
        'count': POSTS_PER_PAGE.toString()
      },
      cache: 'force-cache'
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('포스트를 가져오는데 실패했습니다', { cause: error });
  }
}

async function getTotalPages() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?page=1`, {
      headers: {
        'count': POSTS_PER_PAGE.toString()
      },
      cache: 'force-cache'
    });
    
    const data = await response.json();
    return data.totalPages;
  } catch (error) {
    throw new Error('데이터를 가져오는데 실패했습니다', { cause: error });
  }
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
  const { page, lng } = await params;
  const pageNumber = Number(page);
  const { t } = await getTranslation(lng, 'common');

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
      <h1 className='text-4xl font-bold w-full text-gray-900'>{t('menu.posts')}</h1>
      <div className='flex flex-col items-center justify-center gap-4 w-full'>
        {posts.map((post: PostType) => {
          const availableLanguages = post.availableLanguages || ['ko'];
          const originalLanguage = post.originalLanguage || 'ko';
          const hasTranslation = availableLanguages.includes(lng);
          
          const postData = hasTranslation && post.translations && post.translations[lng] ? {
            title: post.translations[lng].title,
            description: post.translations[lng].description
          } : {
            title: post.title,
            description: post.description
          };
          
          return (
            <div key={post.postId} className="relative w-full">
              <Link 
                href={`/${lng}/post/${post.postId}`}
                className='block w-full border-normal rounded border-primary-dark bg-white p-4 hover:bg-gray-50 relative'
              >
                <div className='flex flex-col gap-2'>
                  <h2 className='text-2xl font-bold text-gray-900'>{postData.title}</h2>
                  <p className='text-lg text-gray-800'>{postData.description}</p>
                  <p className='text-sm text-gray-600'>{formatToLocalTime(post.createdAt, DEFAULT_DATE_FORMAT)}</p>
                </div>
              </Link>
              
              <PostLanguageOverlay 
                lng={lng} 
                availableLanguages={availableLanguages} 
                originalLanguage={originalLanguage}
                postId={post.postId}
                isList={true}
              />
            </div>
          );
        })}
      </div>
      <Pagination currentPage={pageNumber} totalPages={totalPages} basePath={`/${lng}/posts`} />
    </div>
    </div>
  );
} 