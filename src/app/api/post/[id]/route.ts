import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { languages } from '@/i18n/settings';

export async function GET(request: NextRequest) {
  try {
    console.log('MongoDB 연결 시도중...');
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DB_URL as string, {
      auth: {
        username: process.env.NEXT_PUBLIC_DB_ID as string,
        password: process.env.NEXT_PUBLIC_DB_PASSWORD as string
      }
    });
    console.log('MongoDB 연결 성공!');

    const db = client.db(process.env.NEXT_PUBLIC_DB_KEY);
    console.log(`데이터베이스 ${process.env.NEXT_PUBLIC_DB_KEY} 접속 성공`);

    const urlParts = request.url.split('/');
    const id = urlParts[urlParts.length - 1];
    
    // 포스트 조회
    const post = await db.collection('posts').findOne({ postId: id });
    
    // 다국어 지원 필드 추가
    if (post && !post.originalLanguage) {
      post.originalLanguage = 'ko';
    }
    
    if (post && !post.availableLanguages) {
      post.availableLanguages = ['ko'];
    }
    
    if (post && !post.translations) {
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
    console.log('포스트 조회 결과:', post ? '성공' : '실패', 'id:', id);

    await client.close();
    console.log('MongoDB 연결 종료!');

    if (!post || post.deleted === true) {
      return NextResponse.json({ error: '포스트를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('데이터베이스 에러:', error);
    return NextResponse.json({ message: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}