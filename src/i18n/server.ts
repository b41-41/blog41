import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getOptions } from './settings';

// 서버 측 인스턴스 캐시
const initI18nextInstance = async (lng: string, ns: string, options = {}) => {
  const i18nextInstance = createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => 
      import(`./locales/${language}/${namespace}.json`)
    ))
    .init({
      ...getOptions(lng, ns),
      lng,
      ns,
      ...options,
    });

  return i18nextInstance;
};

// 서버 컴포넌트에서 사용할 번역 함수
export const getTranslation = async (lng: string, ns: string, options = {}) => {
  // 매번 새로운 인스턴스 생성 (하이드레이션 오류 방지)
  const i18nextInstance = await initI18nextInstance(lng, ns, options);

  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns),
    i18n: i18nextInstance,
  };
};
