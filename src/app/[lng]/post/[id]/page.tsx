import React from 'react';
import Post from '../_component/Post';
import FullscreenOverlay from '@/common/FullscreenOverlay';
import PostOverlay from '../_component/PostOverlay';
import TableOfContents from '@/components/TableOfContents';
import ScrollProgressBar from '@/components/ScrollProgressBar';

interface PostPageProps {
  params: Promise<{
    id: string;
    lng: string;
  }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { id, lng } = await params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
      cache: 'force-cache' 
    });
    
    const post = await response.json();

    return (
      <>
        <ScrollProgressBar />
        <FullscreenOverlay>
          <PostOverlay
            postId={post.postId}
            order={post.order}
            title={post.title}
            description={post.description}
            tags={post.tags}
            content={post.content}
            createdAt={post.createdAt}
          />
        </FullscreenOverlay>
        <TableOfContents content={post.content} />
        <Post
          postId={post.postId}
          order={post.order}
          title={post.title}
          description={post.description}
          tags={post.tags}
          content={post.content}
          createdAt={post.createdAt}
          lng={lng}
        />
      </>
    );
  } catch (error) {
    return (
      <div className="border-normal rounded-middle flex w-full flex-col gap-2 border-primary-dark bg-white p-8 my-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">포스트를 찾을 수 없습니다</h2>
          <p className="mb-6 text-gray-600">요청하신 포스트가 존재하지 않거나 삭제되었습니다.</p>
          <a 
            href={`/${lng}`}
            className="px-4 py-2 bg-primary-dark text-white rounded hover:bg-opacity-90 transition-all inline-block"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    );
  }
}