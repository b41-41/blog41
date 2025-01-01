import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DB_URL as string, {
      auth: {
        username: process.env.NEXT_PUBLIC_DB_ID as string,
        password: process.env.NEXT_PUBLIC_DB_PASSWORD as string
      }
    });

    const db = client.db(process.env.NEXT_PUBLIC_DB_KEY);
    const posts = await db.collection('posts').find().toArray();
    
    await client.close();
    return NextResponse.json(posts);

  } catch (error) {
    console.error('데이터베이스 에러:', error);
    return NextResponse.json({ message: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}