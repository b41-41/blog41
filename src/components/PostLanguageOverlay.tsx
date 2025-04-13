'use client';

import React from 'react';
import { useTranslation } from '@/i18n';
import Link from 'next/link';
import { languages } from '@/i18n/settings';

interface PostLanguageOverlayProps {
  lng: string;
  availableLanguages: string[];
  originalLanguage: string;
  postId?: string;
  isList?: boolean;
}

const PostLanguageOverlay = ({ 
  lng, 
  availableLanguages, 
  originalLanguage,
  postId,
  isList = false
}: PostLanguageOverlayProps) => {
  const { t } = useTranslation(lng, 'common');

  if (availableLanguages.includes(lng)) {
    return null;
  }
  
  if (!isList) {
    return null;
  }

  const fallbackLanguages = languages.filter(lang => 
    availableLanguages.includes(lang) && lang !== lng
  );

  if (fallbackLanguages.length === 0) {
    return null;
  }

  if (isList) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10 rounded">
        <div className="bg-white p-3 rounded-lg max-w-xs text-center">
          <p className="text-sm mb-2">
            {t('post.notAvailableInLanguage')}
          </p>
          <div className="flex justify-center gap-2">
            {fallbackLanguages.map(lang => (
              <Link 
                key={lang}
                href={postId ? `/${lang}/post/${postId}` : `/${lang}`}
                className="px-2 py-1 bg-primary-dark text-white text-xs rounded hover:bg-opacity-90 transition-all"
              >
                {t(`language.${lang}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10 rounded">
      <div className="bg-white p-6 rounded-lg max-w-md text-center">
        <p className="text-lg mb-4">
          {t('post.notAvailableInLanguage')}
        </p>
        <p className="mb-6">
          {t('post.viewInOtherLanguage')}
        </p>
        <div className="flex justify-center gap-3">
          {fallbackLanguages.map(lang => (
            <Link 
              key={lang}
              href={postId ? `/${lang}/post/${postId}` : `/${lang}`}
              className="px-4 py-2 bg-primary-dark text-white rounded hover:bg-opacity-90 transition-all"
            >
              {t(`language.${lang}`)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostLanguageOverlay;
