import { MenuItemType } from './type';

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: 'home',
    title: '홈',
    href: '/',
  },
  {
    key: 'portfolio',
    title: '포트폴리오',
    href: '/portfolio',
  },
  {
    key: 'contact',
    title: '연락하기',
    href: '/contact',
  },
] as const;

export const POSTS_PER_PAGE = 10;
export const PAGINATION_DISPLAY_COUNT = 5;
export const RECENT_POSTS_COUNT = 5;
export const DEFAULT_DATE_FORMAT = 'YYYY.MM.DD';