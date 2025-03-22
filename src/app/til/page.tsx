import { PostType } from '../post/post.type';
import { DEFAULT_DATE_FORMAT } from '@/common/constants';
import dayjs from 'dayjs';
import Link from 'next/link';

export default async function TILPage() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/til`, {
		cache: 'force-cache'
	});
	
	if (!response.ok) {
		throw new Error('TIL 데이터를 가져오는데 실패했습니다.');
	}
	
	const data = await response.json();
	const tilPosts = data.posts as PostType[];

	return (
		<div className="border-normal rounded-middle flex w-full flex-col gap-2 border-primary-dark bg-white p-4">
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-6">Today I Learned</h1>
				
				{tilPosts.length === 0 ? (
					<p className="text-gray-500">아직 TIL 게시물이 없습니다.</p>
				) : (
					<div className="flex flex-col gap-4 w-full">
						{tilPosts.map((post: PostType) => (
							<Link 
								href={`/post/${post.postId}`}
								key={post.postId}
								className="w-full border-normal rounded border-primary-dark bg-white p-4 hover:bg-gray-50"
							>
								<div className="flex flex-col gap-2">
									<div className="flex justify-between items-center">
										<h2 className="text-xl font-semibold">{post.title}</h2>
										<span className="text-sm text-gray-500">
											{dayjs(post.createdAt).format(DEFAULT_DATE_FORMAT)}
										</span>
									</div>
									<p className="text-gray-600">{post.description || post.content.substring(0, 150)}</p>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
	return <></>
}
  