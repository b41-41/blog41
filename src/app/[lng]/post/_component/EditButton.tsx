'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/i18n/client';

interface EditButtonProps {
  lng: string;
  postId: string;
}

export default function EditButton({ lng, postId }: EditButtonProps) {
  const { t } = useTranslation(lng, 'common');
  const [isLocalhost, setIsLocalhost] = useState(false);
  
  useEffect(() => {
    // 클라이언트 측에서 실행되는 환경 확인
    const isLocal = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1';
    setIsLocalhost(isLocal);
  }, []);
  
  if (!isLocalhost) return null;
  
  return (
    <div className="mt-4">
      <a 
        href={`/${lng}/edit/${postId}`}
        className="px-4 py-2 bg-primary-dark text-white rounded hover:bg-opacity-90 transition-all inline-block"
      >
        {t('post.edit') || '수정하기'}
      </a>
    </div>
  );
}
