import { DEFAULT_DATE_FORMAT } from '@/common/constants';
import Link from 'next/link';
import { formatToLocalTime } from '@/utils/dayjs';
import type { PostType } from '../post/post.type';
import { getTranslation } from '@/i18n';
import PostLanguageOverlay from '@/components/PostLanguageOverlay';

async function getTilPosts() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/til`, {
			cache: 'force-cache'
		});
		
		const data = await response.json();
		return data.posts as PostType[];
	} catch (error) {
		throw new Error('TIL 데이터를 가져오는데 실패했습니다.', { cause: error });
	}
}

interface TILPageProps {
  params: { lng: string };
}

export default async function TILPage({ params }: TILPageProps) {
	const { lng } = params;
	const { t } = await getTranslation(lng, 'common');
	const tilPosts = await getTilPosts();

	return (
		<div className="border-normal rounded-middle flex w-full flex-col gap-2 border-primary-dark bg-white p-4">
				<h1 className='text-4xl font-bold w-full text-gray-800'>{t('menu.til')}</h1>
				
				{tilPosts.length === 0 ? (
					<p className="text-gray-700">{t('post.noTilPosts') || '아직 TIL 게시물이 없습니다.'}</p>
				) : (
					<div className="flex flex-col gap-4 w-full">
						{tilPosts.map((post: PostType) => {
							const availableLanguages = post.availableLanguages || ['ko'];
							const originalLanguage = post.originalLanguage || 'ko';
							const hasTranslation = availableLanguages.includes(lng);
							
							const postData = hasTranslation && post.translations && post.translations[lng] ? {
								title: post.translations[lng].title,
								description: post.translations[lng].description,
								content: post.translations[lng].content
							} : {
								title: post.title,
								description: post.description,
								content: post.content
							};
							
							return (
								<div key={post.postId} className="relative w-full">
									<Link 
										href={`/${lng}/post/${post.postId}`}
										className="block w-full border-normal rounded border-primary-dark bg-white p-4 hover:bg-gray-50 relative"
									>
										<div className="flex flex-col gap-2">
											<div className="flex items-center">
												<h2 className="text-xl font-semibold text-gray-900 truncate mr-3">{postData.title}</h2>
												<span className="text-sm text-gray-700 whitespace-nowrap flex-shrink-0 ml-auto">
													{formatToLocalTime(post.createdAt, DEFAULT_DATE_FORMAT)}
												</span>
											</div>
											<p className="text-gray-800 line-clamp-2">{postData.description || postData.content.substring(0, 150)}</p>
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
				)}
			</div>
	);
}
  