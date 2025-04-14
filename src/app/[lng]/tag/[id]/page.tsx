import { DEFAULT_DATE_FORMAT } from '@/common/constants';
import Link from 'next/link';
import { formatToLocalTime } from '@/utils/dayjs';
import type { PostType } from '../../post/post.type';
import { getTranslation } from '@/i18n';
import PostLanguageOverlay from '@/components/PostLanguageOverlay';
import { languages } from '@/i18n/settings';
import Tags from '@/components/Tags';

async function getPostsByTag(tag: string) {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?tag=${encodeURIComponent(tag)}`, {
			cache: 'no-store'
		});
		
		const data = await response.json();
		return data.posts as PostType[];
	} catch (error) {
		console.error('Failed to fetch posts by tag:', error);
		return [];
	}
}

// DB에서 모든 태그를 조회하는 함수
async function getAllTags() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
			cache: 'force-cache'
		});
		
		if (!response.ok) {
			console.error('태그 조회 실패:', response.status);
			return [];
		}
		
		return await response.json();
	} catch (error) {
		console.error('태그 조회 중 오류 발생:', error);
		return [];
	}
}

// 정적 생성을 위한 파라미터 정의
export async function generateStaticParams() {
	// DB에서 모든 태그 조회
	const allTags = await getAllTags();
	
	// 태그가 없으면 언어만 생성
	if (!allTags || allTags.length === 0) {
		console.warn('태그를 찾을 수 없습니다. 언어 경로만 생성합니다.');
		return languages.map(lng => ({
			lng,
			id: ''
		}));
	}
	
	// 지원하는 모든 언어와 태그의 조합을 생성합니다
	return allTags.flatMap((tag: string) => 
		languages.map(lng => ({
			lng,
			id: encodeURIComponent(tag)
		}))
	);
}

// 정적 생성이 아닌 경우에도 동적 파라미터 허용
export const dynamicParams = true;

interface TagPageProps {
  params: Promise<{ 
    lng: string;
    id: string;
  }>;
}

export default async function TagPage({ params }: TagPageProps) {
	const { lng, id } = await params;
	const { t } = await getTranslation(lng, 'common');
	const decodedTag = decodeURIComponent(id);
	const posts = await getPostsByTag(decodedTag);

	return (
		<div className="border-normal rounded-middle flex w-full flex-col gap-2 border-primary-dark bg-white p-4">
				<h1 className='text-4xl font-bold w-full text-gray-800'>
					{t('tag.title') || '태그'}: <span className="text-primary-dark">#{decodedTag}</span>
				</h1>
				
				{posts.length === 0 ? (
					<p className="text-gray-700">{t('tag.noPosts') || `'${decodedTag}' 태그가 있는 게시물이 없습니다.`}</p>
				) : (
					<div className="flex flex-col gap-4 w-full mt-4">
						{posts.map((post: PostType) => {
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
									<div className='block w-full border-normal rounded border-primary-dark bg-white p-3 sm:p-4 hover:bg-gray-50 shadow-sm hover:shadow-md transition-shadow relative'>
										<div className='flex flex-col gap-1 sm:gap-2'>
											<Link href={`/${lng}/post/${post.postId}`}>
												<h2 className='text-xl font-bold line-clamp-2 text-gray-900 hover:text-primary-blue'>{postData.title}</h2>
											</Link>
											<p className='text-base text-gray-800 line-clamp-2'>{postData.description || postData.content.substring(0, 150)}</p>
											<div className="flex overflow-x-auto">
												{post.tags && post.tags.length > 0 && (
													<Tags tags={post.tags} lng={lng} />
												)}
											</div>
											<p className='text-xs text-gray-700 mt-1'>{formatToLocalTime(post.createdAt, DEFAULT_DATE_FORMAT)}</p>
										</div>
									</div>
									
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