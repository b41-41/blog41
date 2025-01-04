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
    
    const count = request.headers.get('count');
    const query = db.collection('posts').find().sort({ createdAt: -1 }); // createdAt 필드를 기준으로 내림차순 정렬
    
    if (count) {
      const posts = await query.limit(parseInt(count)).toArray();
      await client.close();
      return NextResponse.json(posts);
    }

    const posts = await query.toArray();
    await client.close();
    return NextResponse.json(posts);

  } catch (error) {
    console.error('데이터베이스 에러:', error);
    return NextResponse.json({ message: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}