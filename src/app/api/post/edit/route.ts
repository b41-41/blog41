import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { languages } from '@/i18n/settings';

export async function PUT(request: NextRequest) {
  try {
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DB_URL as string, {
      auth: {
        username: process.env.NEXT_PUBLIC_DB_ID as string,
        password: process.env.NEXT_PUBLIC_DB_PASSWORD as string
      }
    });

    const db = client.db(process.env.NEXT_PUBLIC_DB_KEY);
    const postData = await request.json();
    
    // 필수 필드 검증
    if (!postData.postId || !postData.title || !postData.content) {
      return NextResponse.json(
        { message: '포스트 ID, 제목과 내용은 필수입니다.' },
        { status: 400 }
      );
    }
    
    // 다국어 필드 검증 및 기본값 설정
    const originalLanguage = postData.originalLanguage || 'ko';
    const availableLanguages = postData.availableLanguages || ['ko'];
    const translations = postData.translations || {
      ko: {
        title: postData.title,
        description: postData.description || '',
        content: postData.content,
        tags: postData.tags || [],
        isComplete: true
      }
    };
    
    // 포스트 업데이트
    const updateResult = await db.collection('posts').updateOne(
      { postId: postData.postId },
      { 
        $set: {
          title: postData.title,
          description: postData.description || '',
          content: postData.content,
          tags: postData.tags || [],
          originalLanguage,
          availableLanguages,
          translations,
          updatedAt: new Date()
        } 
      }
    );
    
    await client.close();
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: '해당 포스트를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: '포스트가 성공적으로 업데이트되었습니다.', postId: postData.postId },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('데이터베이스 에러:', error);
    return NextResponse.json(
      { message: '서버 에러가 발생했습니다.' },
      { status: 500 }
    );
  }
}
