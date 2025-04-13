import React from 'react';
import Post from '../_component/Post';
import FullscreenOverlay from '@/common/FullscreenOverlay';
import PostOverlay from '../_component/PostOverlay';
import TableOfContents from '@/components/TableOfContents';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import { LANGUAGE_PRIORITY } from '@/common/constants';

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
    
    const availableLanguages = post.availableLanguages || ['ko'];
    const originalLanguage = post.originalLanguage || 'ko';
    
    let displayLanguage = lng;
    
    if (!availableLanguages.includes(lng)) {
      for (const priorityLang of LANGUAGE_PRIORITY) {
        if (availableLanguages.includes(priorityLang)) {
          displayLanguage = priorityLang;
          break;
        }
      }
      
      if (!availableLanguages.includes(displayLanguage)) {
        displayLanguage = originalLanguage;
      }
    }
    
    const postData = displayLanguage !== originalLanguage && post.translations && post.translations[displayLanguage] ? {
      title: post.translations[displayLanguage].title,
      description: post.translations[displayLanguage].description,
      content: post.translations[displayLanguage].content,
      tags: post.translations[displayLanguage].tags || post.tags
    } : {
      title: post.title,
      description: post.description,
      content: post.content,
      tags: post.tags
    };

    return (
      <>
        <ScrollProgressBar />
        <FullscreenOverlay>
          <PostOverlay
            postId={post.postId}
            order={post.order}
            title={postData.title}
            description={postData.description}
            tags={postData.tags}
            content={postData.content}
            createdAt={post.createdAt}
          />
        </FullscreenOverlay>
        <TableOfContents content={postData.content} />
        <Post
          postId={post.postId}
          order={post.order}
          title={postData.title}
          description={postData.description}
          tags={postData.tags}
          content={postData.content}
          createdAt={post.createdAt}
          lng={lng}
          originalLanguage={originalLanguage}
          availableLanguages={availableLanguages}
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