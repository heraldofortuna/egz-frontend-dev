'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useAuthStatus from '@hooks/useAuthStatus';
import userLogout from '@actions/userLogout';
import { MenuItem, MenuItems } from '@customtypes/components';
import Button from '@components/Button';
import HamburguerMenu from '@components/HamburguerMenu';
import Skeleton from '@components/Skeleton';
import {
  headerMainItem as initMainItem,
  headerMenuItems as initItems,
  headerMenuMobileItems as initMobileItems,
} from '@constants/data';

const Header = () => {
  const { isAuthenticated, isAuthProcessFinished } = useAuthStatus();

  const menuMobileRef = useRef<HTMLDivElement>(null);
  const menuMobileIconRef = useRef<HTMLDivElement>(null);
  const menuProfileRef = useRef<HTMLDivElement>(null);
  const menuProfileIconRef = useRef<HTMLSpanElement>(null);

  const [mainItem, setMainItem] = useState<MenuItem>(initMainItem);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [items, setItems] = useState<MenuItems>(initItems);
  const [mobileItems, setMobileItems] = useState<MenuItems>(initMobileItems);
  const [isCommissionAgent, setIsCommissionAgent] = useState<boolean>(false);
  const [isOpenHamburguer, setIsOpenHamburguer] = useState<boolean>(false);
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleToggleHamburguerMenu = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    setIsOpenHamburguer(!isOpenHamburguer);
  };

  const handleClickMenuMobileItem = () => {
    setTimeout(() => {
      setIsOpenHamburguer(false);
    }, 500);
  };

  const handleClickMenuProfile = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsOpenProfile(!isOpenProfile);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuMobileRef.current &&
        !menuMobileRef.current.contains(event.target as Node) &&
        menuMobileIconRef.current &&
        !menuMobileIconRef.current.contains(event.target as Node)
      ) {
        setIsOpenHamburguer(false);
      }

      if (
        menuProfileRef.current &&
        !menuProfileRef.current.contains(event.target as Node) &&
        menuProfileIconRef.current &&
        !menuProfileIconRef.current.contains(event.target as Node)
      ) {
        setIsOpenProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpenHamburguer) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  }, [isOpenHamburguer]);

  useEffect(() => {
    if (!isAuthProcessFinished) return;

    try {
      setIsLoading(true);
      const isCommissionAgentStr = localStorage.getItem('isComissionAgent');
      const isCommissionAgent = JSON.parse(isCommissionAgentStr as string);
      setIsCommissionAgent(isCommissionAgent);

      if (isAuthenticated) {
        const currentMainItem = {
          id: 'tournaments',
          url: '/tournaments',
          name: 'Torneos',
          isUserAuth: true,
        };

        setMainItem(currentMainItem);

        if (isCommissionAgent) {
          const commissionItem = {
            id: 'commissionAgent',
            url: '/commission-agent',
            name: 'Comisiones',
            isUserAuth: true,
          };

          setItems((prevItems) => {
            const hasCommissionAgent = prevItems.some(
              (item) => item.id === 'commissionAgent',
            );

            if (!hasCommissionAgent) {
              return [...prevItems, commissionItem];
            }

            return prevItems;
          });

          setMobileItems((prevItems) => {
            const hasCommissionAgent = prevItems.some(
              (item) => item.id === 'commissionAgent',
            );

            if (!hasCommissionAgent) {
              return [commissionItem, ...prevItems];
            }

            return prevItems;
          });
        }

        const profileItem = {
          id: 'profile',
          url: '/profile',
          name: 'Mi cuenta',
          isUserAuth: true,
        };

        setMobileItems((prevItems) => {
          const hasProfile = prevItems.some((item) => item.id === 'profile');

          if (!hasProfile) {
            return [profileItem, ...prevItems];
          }

          return prevItems;
        });
      }

      if (!isCommissionAgent) {
        const joinUsItem = {
          id: 'joinUs',
          url: '/join-us',
          name: 'Únete a nosotros',
          isUserAuth: false,
        };

        setMobileItems((prevItems) => {
          const hasJoinUs = prevItems.some((item) => item.id === 'joinUs');

          if (!hasJoinUs) {
            return [...prevItems, joinUsItem];
          }

          return prevItems;
        });
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [items, isAuthProcessFinished, isAuthenticated]);

  return (
    <header className="bg-gradient-to-r from-purple-color-3 to-purple-color-4 h-20 md:h-[130px] min-h-[80px] md:min-h-[130px] sticky top-0 z-20">
      <div className="h-full relative">
        <Image
          className="absolute top-0 left-0 w-auto h-full"
          src="/left-waffle.svg"
          width={40}
          height={40}
          alt="Header de la página"
          priority
        />
        <Image
          className="absolute top-0 right-0 w-auto h-full"
          src="/right-waffle.svg"
          width={40}
          height={40}
          alt="Header de la página"
          priority
        />
        <div className="w-[90%] max-w-[1200px] h-full flex items-center justify-between m-0 mx-auto relative z-10">
          <Link href="/">
            <Image
              className="w-[100px] md:w-[120px] transition-regular"
              src="/egz-logotipo.svg"
              width={60}
              height={60}
              alt="Logo de El Gran Zorro"
              priority={false}
            />
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center justify-between gap-8 px-4">
              {items
                .filter(
                  (menuItem: MenuItem) =>
                    !menuItem.isUserAuth || isAuthenticated,
                )
                .map((menuItem: MenuItem) => (
                  <li key={menuItem.id} className="text-center cursor-pointer">
                    {isLoading ? (
                      <Skeleton className="w-[40px] md:w-[80px] h-[19px] md:h-[21px]" />
                    ) : (
                      <Link href={menuItem.url} scroll={true}>
                        <span className="hover:underline">{menuItem.name}</span>
                      </Link>
                    )}
                  </li>
                ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Link href={mainItem.url}>
              <Button
                text={mainItem.name}
                color="orange"
                size="small"
                isLoading={!isAuthProcessFinished}
              />
            </Link>
            <div className="hidden md:flex">
              {isAuthenticated ? (
                <div
                  className="relative w-10 h-10 flex items-center justify-center"
                  onClick={handleClickMenuProfile}
                >
                  <span
                    ref={menuProfileIconRef}
                    className="h-10 w-10 bg-gradient-to-r from-purple-color-1 to-purple-color-2 flex items-center justify-center rounded-full cursor-pointer"
                  >
                    <Image
                      src="/menu-profile.svg"
                      width={32}
                      height={32}
                      alt="Lorem Ipsum is simply dummy text of the printing"
                    />
                  </span>
                  {isOpenProfile ? (
                    <div
                      ref={menuProfileRef}
                      className="absolute w-[200px] flex flex-col gap-4 top-12 right-0 bg-secondary-color p-4 pt-8 rounded-lg shadow-card"
                    >
                      <Link
                        href="/profile"
                        className="h-8 md:10 hover:underline"
                      >
                        <span className="block w-full h-full text-center text-base md:text-lg">
                          Mi cuenta
                        </span>
                      </Link>
                      <span
                        className="text-gray-color-3 text-center text-xs md:text-sm cursor-pointer transition-regular hover:text-red-color-2"
                        onClick={userLogout}
                      >
                        Cerrar sesión
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="flex md:hidden">
              {/* Botón para abrir el menú hamburguesa */}
              <div
                ref={menuMobileIconRef}
                className={`bg-gradient-to-r from-purple-color-2 to-purple-color-1 w-10 h-10 ${isOpenHamburguer ? 'hidden md:flex' : 'flex'} items-center justify-center rounded-full cursor-pointer`}
                onClick={handleToggleHamburguerMenu}
              >
                <i className="w-4 h-4 flex flex-col justify-center gap-1">
                  <span
                    className={`bg-white w-4 h-[2px] rounded-full transition-regular ${isOpenHamburguer ? 'transform -rotate-45 translate-y-[3px]' : ''}`}
                  ></span>
                  <span
                    className={`bg-white h-[2px] rounded-full transition-regular ${isOpenHamburguer ? 'w-4 transform rotate-45 translate-y-[-3px]' : 'w-2'}`}
                  ></span>
                </i>
              </div>
            </div>
          </div>
        </div>
        {/* Menu Hamburguesa */}
        {isOpenHamburguer ? (
          <HamburguerMenu
            menuMobileItems={mobileItems}
            isAuthenticated={isAuthenticated}
            isCommissionAgent={isCommissionAgent}
            handleToggleHamburguerMenu={handleToggleHamburguerMenu}
            handleClickMenuMobileItem={handleClickMenuMobileItem}
            userLogout={userLogout}
          />
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};

export default Header;
