'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from './Button';
import Skeleton from '@components/Skeleton';
import { MenuItem, MenuItems } from '@customtypes/components';
import { footerMenuItems } from '@constants/data';

const Footer = () => {
  const year = new Date().getFullYear();

  const [items, setItems] = useState<MenuItems>(footerMenuItems);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      setIsLoading(true);
      const isCommissionAgentStr = localStorage.getItem('isComissionAgent');
      const isCommissionAgent = JSON.parse(isCommissionAgentStr as string);

      if (isCommissionAgent) {
        const filteredItems = footerMenuItems.filter(
          (item) => item.id !== 'joinUs',
        );
        setItems(filteredItems);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <footer className="bg-custom-footer h-[560px] md:h-[800px] min-h-[560px] md:min-h-[800px] mt-auto shadow-footer">
      <div className="h-full relative">
        <span className="half-circle w-[300px] md:w-[400px] h-[150px] md:h-[200px] absolute top-0 left-[50%] translate-x-[-50%]"></span>
        <div className="h-full flex flex-col items-center pt-6 pb-12">
          <Image
            className="w-[120px] md:w-[160px]"
            src="/egz-logo.svg"
            width={160}
            height={160}
            alt="Logo de El Gran Zorro"
          />
          <span className="text-5xl md:text-7xl mt-[80px] md:mt-[160px]">
            Síguenos
          </span>
          <div className="md:hidden flex items-center gap-6 mt-8">
            <Image
              src="/instagram.svg"
              width={40}
              height={40}
              alt="Red social 1"
            />
            <Image
              src="/whatsapp.svg"
              width={40}
              height={40}
              alt="Red social 2"
            />
          </div>
          <div className="hidden md:flex items-center gap-6 mt-16 mb-6">
            <Button
              text="Instagram"
              color="gray"
              size="large"
              variant="bordered"
              icon={
                <Image
                  src="/instagram.svg"
                  width={32}
                  height={32}
                  alt="Ícono de la red social 1"
                />
              }
            />
            <Button
              text="Whatsapp"
              color="gray"
              size="large"
              variant="bordered"
              icon={
                <Image
                  src="/whatsapp.svg"
                  width={32}
                  height={32}
                  alt="Ícono de la red social 2"
                />
              }
            />
          </div>
          <div className="w-[90%] max-w-[1200px] mt-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 py-[24px] md:py-12 border-y border-white border-opacity-25">
              <nav>
                <ul className="flex items-center gap-8">
                  {items.map((menuItem: MenuItem) => (
                    <li
                      key={menuItem.id}
                      className="cursor-pointer text-center"
                    >
                      {isLoading ? (
                        <Skeleton className="w-[80px] md:w-[160px] h-[19px] md:h-[21px]" />
                      ) : (
                        <a href={menuItem.url}>
                          <span className="text-sm md:text-base text-center hover:underline">
                            {menuItem.name}
                          </span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <span className="text-xs text-center md:text-base">
                &copy; {year} El Gran Zorro | Todos los derechos reservados
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
