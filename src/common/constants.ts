import { MenuItemType } from './type';

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: 'posts',
    title: 'Posts',
    href: '/posts/1',
  },
  {
    key: 'til',
    title: 'TIL',
    href: '/til'
  },
  {
    key: 'portfolio',
    title: 'Portfolio',
    href: '/portfolio',
  },
];

export const POSTS_PER_PAGE = 10;
export const PAGINATION_DISPLAY_COUNT = 5;
export const RECENT_POSTS_COUNT = 5;
export const DEFAULT_DATE_FORMAT = 'YYYY.MM.DD';
export const TIL_TAG = 'TIL';