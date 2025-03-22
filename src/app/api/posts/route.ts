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
    
    // "TIL" 태그가 없는 게시물만 필터링하는 쿼리 조건
    const query = { tags: { $ne: TIL_TAG }, deleted: { $ne: true } };
    
    // 전체 게시물 수 계산 (TIL 태그 제외)
    const totalPosts = await db.collection('posts').countDocuments(query);
    const totalPages = Math.ceil(totalPosts / count);
    
    // 페이지네이션 적용 (TIL 태그 제외)
    const posts = await db.collection('posts')
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * count)
      .limit(count)
      .toArray();

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