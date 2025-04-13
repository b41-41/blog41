import { DEFAULT_DATE_FORMAT, RECENT_POSTS_COUNT } from '@/common/constants';
import dayjs from 'dayjs';
import Link from 'next/link';
import { PostType } from '@/app/[lng]/post/post.type';
import { getTranslation } from '@/i18n';

async function getRecentTIL() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/til`, {
      headers: {
        'count': RECENT_POSTS_COUNT.toString()
      },
      cache: 'force-cache'
    });
  
    const data = await response.json();
    return data.posts.slice(0, RECENT_POSTS_COUNT);
  } catch (error) {
    throw new Error('TIL 게시물을 가져오는데 실패했습니다', { cause: error });
  }
}

interface RecentTILProps {
  lng: string;
}

const RecentTIL = async ({ lng }: RecentTILProps) => {
  const { t } = await getTranslation(lng, 'common');
  const tilPosts = await getRecentTIL();

  return (
    <div className='flex flex-col gap-3 sm:gap-4 w-full'>
      <div className='flex flex-col gap-3 sm:gap-4 w-full'>
        {tilPosts && tilPosts.length > 0 ? (
          tilPosts.map((post: PostType) => (
            <Link 
              href={`/${lng}/post/${post.postId}`}
              key={post.postId}
              className='w-full border-normal rounded border-primary-dark bg-white p-3 sm:p-4 hover:bg-gray-50 shadow-sm hover:shadow-md transition-shadow'
            >
              <div className='flex flex-col gap-1 sm:gap-2'>
                <h2 className='text-xl font-bold line-clamp-2 text-gray-900'>{post.title}</h2>
                <p className='text-base text-gray-800 line-clamp-2'>{post.description || post.content.substring(0, 150)}</p>
                <p className='text-xs text-gray-700'>{dayjs(post.createdAt).format(DEFAULT_DATE_FORMAT)}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-900">아직 TIL 게시물이 없습니다.</p>
        )}
      </div>
      <Link 
        href={`/${lng}/til`} 
        className="self-start px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
      >
        {t('post.readMore')}
      </Link>
    </div>
  );
};

export default RecentTIL;
