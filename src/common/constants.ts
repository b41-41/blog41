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
