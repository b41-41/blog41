import React from 'react';
import EditPostForm from '../_components/EditPostForm';
import { notFound, redirect } from 'next/navigation';

interface EditPostPageProps {
  params: Promise<{
    id: string;
    lng: string;
  }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id, lng } = await params;
  
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    redirect(`/${lng}`);
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
      cache: 'no-store' // 항상 최신 데이터 가져오기
    });
    
    if (!response.ok) {
      return notFound();
    }
    
    const post = await response.json();

    return (
      <div className="border-normal rounded-middle flex w-full flex-col gap-2 border-primary-dark bg-white p-4">
        <EditPostForm post={post} lng={lng} />
      </div>
    );
  } catch (error) {
    console.error('포스트 데이터 가져오기 실패:', error);
    return notFound();
  }
}
