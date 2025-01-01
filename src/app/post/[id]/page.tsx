import React from 'react';
import Post from '../_component/Post';
import FullscreenOverlay from '@/common/FullscreenOverlay';
import PostOverlay from '../_component/PostOverlay';

// SSG를 위한 generateStaticParams 추가
export function generateStaticParams() {
  return [{ id: '1' }]; // 정적 경로 생성
}

// SSG를 위해 async 컴포넌트로 변경
export default async function PostPage() {
  return (
    <>
      <FullscreenOverlay>
        <PostOverlay
          postId="post-1"
          order={0}
          title="Next.js로 블로그 만들기"
          description="Next.js와 TypeScript를 활용한 개인 블로그 제작기"
          tags={['Next.js', 'React', 'TypeScript', '블로그']}
          content="Next.js는 React 기반의 풀스택 웹 프레임워크입니다. 이번 포스트에서는 Next.js를 사용하여 개인 블로그를 제작하는 과정을 상세히 다루어보겠습니다."
          createdAt="2024-01-01"
        />
      </FullscreenOverlay>
      <Post
        postId="post-1"
        order={0}
        title="Next.js로 블로그 만들기"
        description="Next.js와 TypeScript를 활용한 개인 블로그 제작기"
        tags={['Next.js', 'React', 'TypeScript', '블로그']}
        content="Next.js는 React 기반의 풀스택 웹 프레임워크입니다. 이번 포스트에서는 Next.js를 사용하여 개인 블로그를 제작하는 과정을 상세히 다루어보겠습니다."
        createdAt="2024-01-01"
      />
    </>
  );
}
