'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions } from './settings';

// 클라이언트 측 리소스 캐시
const runsOnServerSide = typeof window === 'undefined';

// i18next 인스턴스 초기화 여부
let initialized = false;

// i18next 초기화 함수
export function initI18next(lng: string, ns: string) {
  if (initialized) return;
  
  // 클라이언트 측에서만 초기화
  if (!runsOnServerSide) {
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
        },
        preload: [lng]
      });
      
      // 하이드레이션 오류 방지를 위한 설정
      i18next.options.react = {
        ...i18next.options.react,
        bindI18n: 'languageChanged',
        bindI18nStore: ''
      };
      
    initialized = true;
  }
}

// 클라이언트 컴포넌트에서 사용할 useTranslation 훅
export function useTranslation(lng: string, ns: string, options = {}) {
  // 서버 사이드에서는 초기화하지 않음
  if (!runsOnServerSide && !initialized) {
    initI18next(lng, ns);
  }
  return useTranslationOrg(ns, options);
}
