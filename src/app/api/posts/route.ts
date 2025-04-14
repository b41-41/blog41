import { TIL_TAG } from '@/common/constants';
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DB_URL as string, {
      auth: {
        username: process.env.NEXT_PUBLIC_DB_ID as string,
        password: process.env.NEXT_PUBLIC_DB_PASSWORD as string
      }
    });

    const db = client.db(process.env.NEXT_PUBLIC_DB_KEY);
    
    const searchParams = new URL(request.url).searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const count = parseInt(request.headers.get('count') || '10');
    const tag = searchParams.get('tag');
    
    // 쿼리 조건 설정
    let query: any = { deleted: { $ne: true } };
    
    // 태그 파라미터가 있으면 해당 태그를 포함하는 포스트만 필터링
    if (tag) {
      query.tags = tag;
    } else {
      // 기본적으로는 TIL 태그가 없는 게시물만 필터링
      query.tags = { $ne: TIL_TAG };
    }
    
    // 전체 게시물 수 계산 (필터링된 쿼리 적용)
    const totalPosts = await db.collection('posts').countDocuments(query);
    const totalPages = Math.ceil(totalPosts / count);
    
    // 페이지네이션 적용 (TIL 태그 제외)
    const posts = await db.collection('posts')
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * count)
      .limit(count)
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
      currentPage: page,
      totalPages,
      totalPosts
    });

  } catch (error) {
    console.error('데이터베이스 에러:', error);
    return NextResponse.json({ message: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}