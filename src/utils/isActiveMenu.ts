/**
 * 현재 경로를 기반으로 메뉴 아이템이 활성화 상태인지 확인하는 유틸리티 함수
 * @param href 메뉴 아이템의 링크 주소
 * @param currentPath 현재 경로
 * @returns 활성화 여부 (boolean)
 */
export const isActiveMenu = (href: string, currentPath: string = ''): boolean => {
  return (
    (href === '/posts/1' && (currentPath.startsWith('/post') || currentPath.startsWith('/posts'))) ||
    (href === '/til' && currentPath.startsWith('/til')) ||
    (href === '/portfolio' && currentPath.startsWith('/portfolio'))
  );
};
