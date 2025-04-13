export const fallbackLng = 'ko';
export const languages = ['ko', 'en', 'ja'];
export const defaultNS = 'common';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // 지원하는 언어
    supportedLngs: languages,
    // 기본 언어
    fallbackLng,
    // 기본 네임스페이스
    defaultNS,
    // 현재 네임스페이스
    ns,
  };
}
