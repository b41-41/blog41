import {  DEFAULT_DATE_FORMAT, RECENT_POSTS_COUNT } from '@/common/constants';
import dayjs from 'dayjs';
import Link from 'next/link';
import { PostType } from '@/app/[lng]/post/post.type';
import { getTranslation } from '@/i18n';
import PostLanguageOverlay from './PostLanguageOverlay';

async function getRecentPosts() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?page=1`, {
		  headers: {
			'count': RECENT_POSTS_COUNT.toString()
		  },
		  cache: 'force-cache'
		});
	  
		const data = await response.json();
		return data.posts;
	} catch (error) {
		throw new Error('포스트를 가져오는데 실패했습니다', { cause: error });
	}
}

interface RecentPostsProps {
  lng: string;
}

const RecentPosts = async ({ lng }: RecentPostsProps) => {
  const { t } = await getTranslation(lng, 'common');
	const posts = await getRecentPosts();
  return (
      <div className='flex flex-col gap-3 sm:gap-4 w-full'>
        <div className='flex flex-col gap-3 sm:gap-4 w-full'>
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
              <div key={post.postId} className="relative">
                <Link 
                  href={`/${lng}/post/${post.postId}`}
                  className='block w-full border-normal rounded border-primary-dark bg-white p-3 sm:p-4 hover:bg-gray-50 shadow-sm hover:shadow-md transition-shadow relative'
                >
                  <div className='flex flex-col gap-1 sm:gap-2'>
                    <h2 className='text-xl font-bold line-clamp-2 text-gray-900'>{postData.title}</h2>
                    <p className='text-base text-gray-800 line-clamp-2'>{postData.description}</p>
                    <p className='text-xs text-gray-700'>{dayjs(post.createdAt).format(DEFAULT_DATE_FORMAT)}</p>
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
        <Link 
          href={`/${lng}/posts/1`} 
          className="self-start px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          {t('post.readMore')}
        </Link>
      </div>
  )
}

export default RecentPosts