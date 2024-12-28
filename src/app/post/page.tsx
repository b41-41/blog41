import React from 'react'

// SSG를 위한 generateStaticParams 추가
export function generateStaticParams() {
  return [{}] // 정적 경로 생성
}

// SSG를 위해 async 컴포넌트로 변경
export default async function PostPage() {
  return (
    <div>PostPage</div>
  )
}