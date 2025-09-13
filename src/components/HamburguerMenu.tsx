import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MenuItem, MenuItems } from '@customtypes/components';

interface HamburguerMenuProps {
  menuMobileItems: MenuItems;
  isAuthenticated: boolean;
  isCommissionAgent: boolean;
  handleToggleHamburguerMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleClickMenuMobileItem: () => void;
  userLogout: () => void;
}

const HamburguerMenu: React.FC<HamburguerMenuProps> = ({
  menuMobileItems,
  isAuthenticated,
  handleToggleHamburguerMenu,
  handleClickMenuMobileItem,
  userLogout,
}) => {
  const menuMobileRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-[#0B091A80] blur-background inset-0 w-full h-custom-menu-mobile fixed z-30 overflow-y-auto">
      <div
        ref={menuMobileRef}
        className="bg-purple-color-1 w-full md:w-1/2 h-full md:hidden absolute right-0 z-40 flex flex-col"
      >
        <nav className="w-[90%] flex flex-col m-0 mx-auto">
          <div className="min-h-[80px] h-20 flex items-center justify-between md:justify-end">
            <div className="md:hidden">
              <Image
                className="w-[60px] md:w-[100px] transition-regular"
                src="/egz-logo.svg"
                width={60}
                height={60}
                alt="Logo de El Gran Zorro"
                priority={false}
              />
            </div>
            <div
              className="bg-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
              onClick={handleToggleHamburguerMenu}
            >
              <i className="w-4 h-4 flex flex-col justify-center gap-1">
                <span className="bg-red-color-1 w-4 h-[2px] rounded-full transition-regular transform -rotate-45 translate-y-[3px]"></span>
                <span className="bg-red-color-1 h-[2px] rounded-full transition-regular w-4 transform rotate-45 translate-y-[-3px]"></span>
              </i>
            </div>
          </div>
          <ul className="h-full">
            {menuMobileItems.map((menuMobileItem: MenuItem) => (
              <li
                key={menuMobileItem.id}
                className="text-center border-b border-gray-color-2 cursor-pointer"
                onClick={handleClickMenuMobileItem}
              >
                <Link
                  href={menuMobileItem.url}
                  scroll={true}
                  replace
                  className="w-full flex items-center justify-center"
                >
                  <span className="w-full h-full block items-center p-4">
                    {menuMobileItem.name}
                  </span>
                </Link>
              </li>
            ))}
            {isAuthenticated ? (
              <li
                className="text-center border-b border-gray-color-2 cursor-pointer"
                onClick={userLogout}
              >
                <span className="w-full h-full block items-center p-4">
                  Cerrar sesión
                </span>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HamburguerMenu;
