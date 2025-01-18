import {  DEFAULT_DATE_FORMAT, RECENT_POSTS_COUNT } from '@/common/constants';
import dayjs from 'dayjs';
import Link from 'next/link';

async function getRecentPosts() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?page=1`, {
	  headers: {
		'count': RECENT_POSTS_COUNT.toString()
	  },
	  cache: 'force-cache'
	});
  
	if (!response.ok) {
	  throw new Error('포스트를 가져오는데 실패했습니다');
	}
  
	const data = await response.json();
	return data.posts;
  }

const RecentPosts = async () => {
	const posts = await getRecentPosts();
  return (
       <div className='flex flex-col items-center justify-center gap-4'>
        <h1 className='text-4xl font-bold w-full'>Recent Posts</h1>
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
        <Link 
          href="/posts/1" 
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          모든 포스트 보기
        </Link>
      </div> 
  )
}

export default RecentPosts