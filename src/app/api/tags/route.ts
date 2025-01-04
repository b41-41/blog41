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
    
    // posts 컬렉션에서 모든 문서의 tags 필드를 가져옴
    const posts = await db.collection('posts').find({}, { projection: { tags: 1 } }).toArray();
    
    // 모든 태그를 하나의 배열로 합치고 중복 제거
    const allTags = [...new Set(posts.flatMap(post => post.tags || []))];

    await client.close();
    return NextResponse.json(allTags);

  } catch (error) {
    console.error('데이터베이스 에러:', error);
    return NextResponse.json({ message: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}