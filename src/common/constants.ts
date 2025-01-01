import { MenuItemType } from './type';

export const MENU_ITEMS: MenuItemType[] = [
  {
    title: '홈',
    href: '/',
  },
  {
    title: '포트폴리오',
    href: '/portfolio',
  },
  {
    title: '연락하기',
    href: '/contact',
  },
] as const;
