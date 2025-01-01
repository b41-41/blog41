import React from 'react';
import Post from '../_component/Post';
import FullscreenOverlay from '@/common/FullscreenOverlay';
import PostOverlay from '../_component/PostOverlay';

interface PostPageProps {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;  

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
    cache: 'force-cache'  // SSG를 위한 설정
  });
  
  if (!response.ok) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  const post = await response.json();

  return (
    <>
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
      <Post
        postId={post.postId}
        order={post.order}
        title={post.title}
        description={post.description}
        tags={post.tags}
        content={post.content}
        createdAt={post.createdAt}
      />
    </>
  );
}