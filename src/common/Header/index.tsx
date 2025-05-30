'use client';

import { MENU_ITEMS } from '../constants';
import MenuItem from '@/components/MenuItem';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface HeaderProps {
  lng: string;
}

const Header = ({ lng }: HeaderProps) => {
  const { t } = useTranslation(lng, 'common');
  const pathname = usePathname();
  return (
    <header className="relative mb-[40px] sm:mb-[50px] md:mb-[60px] flex w-full flex-col">
      <div
        id="header-image"
        className="animate-gradient flex h-[200px] sm:h-[250px] md:h-[330px] w-full items-center justify-center rounded-b-3xl bg-gradient-to-r from-[#F4C430] via-[#FFB90F] to-[#DAA520]"
      >
        <div id="logo-container" className="w-full overflow-hidden">
          <Link href={`/${lng}`} className="cursor-pointer">
            <div id="logo" className="text-[120px] sm:text-[180px] md:text-[220px] font-extrabold whitespace-nowrap animate-carMove text-white w-[150%]">
              Blog41
            </div>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-row justify-center items-center gap-4">
          {MENU_ITEMS.map((item) => (
            <MenuItem 
              key={item.key} 
              itemKey={item.key} 
              title={t(`menu.${item.key}`) || item.title} 
              href={`/${lng}${item.href}`} 
              currentPath={pathname} 
            />
          ))}
        </div>
      </div>
      
      {/* 언어 전환기 */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher lng={lng} />
      </div>
    </header>
  );
};

export default Header;
