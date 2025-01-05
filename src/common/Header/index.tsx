import { MENU_ITEMS } from '../constants';
import MenuItem from '@/components/MenuItem';

const Header = () => {
  return (
    <header className="relative mb-[50px] flex w-full flex-col">
      <div
        id="header-image"
        className="animate-gradient flex h-[270px] w-full items-center justify-center rounded-b-3xl  bg-gradient-to-r from-[#F4C430] via-[#FFB90F] to-[#DAA520]"
      >
        <div id="logo-container" className="w-full overflow-hidden">
        <div id="logo" className="text-[220px] font-extrabold whitespace-nowrap animate-carMove text-white w-[150%]">
            Blog41
            </div>
        </div>
      </div>
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2">
        <div className="flex gap-4">{MENU_ITEMS.map(MenuItem)}</div>
      </div>
    </header>
  );
};

export default Header;
