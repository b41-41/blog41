import {  DEFAULT_DATE_FORMAT, RECENT_POSTS_COUNT } from '@/common/constants';
import dayjs from 'dayjs';
import Link from 'next/link';

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

const RecentPosts = async () => {
	const posts = await getRecentPosts();
  return (
       <div className='flex flex-col items-center justify-center gap-3 sm:gap-4'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold w-full text-gray-800'>Recent Posts</h1>
        <div className='flex flex-col items-center justify-center gap-3 sm:gap-4 w-full'>
          {posts.map((post: any) => (
            <Link 
              href={`/post/${post.postId}`}
              key={post.postId}
              className='w-full border-normal rounded border-primary-dark bg-white p-3 sm:p-4 hover:bg-gray-50 shadow-sm hover:shadow-md transition-shadow'
            >
              <div className='flex flex-col gap-1 sm:gap-2'>
                <h2 className='text-xl sm:text-2xl font-bold line-clamp-2 text-gray-800'>{post.title}</h2>
                <p className='text-base sm:text-lg text-gray-800 line-clamp-2'>{post.description}</p>
                <p className='text-xs sm:text-sm text-gray-700'>{dayjs(post.createdAt).format(DEFAULT_DATE_FORMAT)}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link 
          href="/posts/1" 
          className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
        >
          모든 포스트 보기
        </Link>
      </div> 
  )
}

export default RecentPosts