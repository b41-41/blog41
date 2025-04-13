import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { languages } from '@/i18n/settings';

export async function POST(request: NextRequest) {
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
    if (!postData.title || !postData.content) {
      return NextResponse.json(
        { message: '제목과 내용은 필수입니다.' },
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
    
    // 가장 최근 order 값 가져오기
    const latestPost = await db.collection('posts')
      .find()
      .sort({ order: -1 })
      .limit(1)
      .toArray();
    
    // 다음 order 값 설정 (기존 게시물이 없으면 1부터 시작)
    const nextOrder = latestPost.length > 0 ? latestPost[0].order + 1 : 1;
    
    // postId 생성 (UUID)
    const postId = uuidv4();
    
    // 새 게시물 생성
    const newPost = {
      _id: new ObjectId(),
      postId,
      title: postData.title,
      description: postData.description || '',
      content: postData.content,
      tags: postData.tags || [],
      order: nextOrder,
      createdAt: new Date(postData.createdAt) || new Date(),
      deleted: false,
      // 다국어 필드 추가
      originalLanguage,
      availableLanguages,
      translations
    };
    
    // 데이터베이스에 저장
    await db.collection('posts').insertOne(newPost);
    await client.close();
    
    return NextResponse.json(
      { message: '포스트가 성공적으로 저장되었습니다.', postId },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('데이터베이스 에러:', error);
    return NextResponse.json(
      { message: '서버 에러가 발생했습니다.' },
      { status: 500 }
    );
  }
}
