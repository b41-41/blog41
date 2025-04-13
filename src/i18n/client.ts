'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions } from './settings';

// i18next 인스턴스 초기화 여부
let initialized = false;

// i18next 초기화 함수
export function initI18next(lng: string, ns: string) {
  if (initialized) return;
  
  i18next
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => 
      import(`./locales/${language}/${namespace}.json`)
    ))
    .init({
      ...getOptions(lng, ns),
      lng,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      }
    });
    
  initialized = true;
}

// 클라이언트 컴포넌트에서 사용할 useTranslation 훅
export function useTranslation(lng: string, ns: string, options = {}) {
  if (!initialized) initI18next(lng, ns);
  return useTranslationOrg(ns, options);
}
