import { TIL_TAG } from '@/common/constants';
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { languages } from '@/i18n/settings';

export async function GET(request: NextRequest) {
  try {
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DB_URL as string, {
      auth: {
        username: process.env.NEXT_PUBLIC_DB_ID as string,
        password: process.env.NEXT_PUBLIC_DB_PASSWORD as string
      }
    });

    const db = client.db(process.env.NEXT_PUBLIC_DB_KEY);
    
    // "TIL" 태그가 있는 게시물만 필터링하는 쿼리 조건
    const query = { tags: TIL_TAG, deleted: { $ne: true } };
    
    // TIL 태그가 있는 모든 게시물 가져오기 (페이지네이션 없음)
    const posts = await db.collection('posts')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
      
    // 다국어 지원 필드 추가
    posts.forEach(post => {
      if (!post.originalLanguage) {
        post.originalLanguage = 'ko';
      }
      
      if (!post.availableLanguages) {
        post.availableLanguages = ['ko'];
      }
      
      if (!post.translations) {
        post.translations = {
          ko: {
            title: post.title,
            description: post.description || '',
            content: post.content,
            tags: post.tags || [],
            isComplete: true
          }
        };
      }
    });

    await client.close();
    
    return NextResponse.json({
      posts,
      totalPosts: posts.length
    });

  } catch (error) {
    console.error('데이터베이스 에러:', error);
    return NextResponse.json({ message: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
} 