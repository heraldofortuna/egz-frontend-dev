'use client';
import { useState } from 'react';
import Image from 'next/image';

interface ICardProps {
  title?: string;
  color?: any;
  isDeletable?: boolean;
  children: any;
}

const Card = ({
  title = '',
  color = 'secondary',
  isDeletable = false,
  children,
}: ICardProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const cardColor: any = {
    primary: 'bg-primary-color',
    secondary: 'bg-secondary-color',
    blue: 'bg-gradient-to-b from-dark-blue-color-1 to-dark-blue-color-2',
  };

  const handleDelete = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return <></>;
  }

  return (
    <section
      className={`relative ${cardColor[color]} w-full p-4 md:p-8 ${title.length ? 'pt-0 md:pt-0' : ''} rounded-2xl md:rounded-3xl`}
    >
      <div className="flex flex-col gap-4 md:gap-8">
        {isDeletable ? (
          <span
            className="bg-white w-[24px] md:w-[32px] h-[24px] md:h-[32px] flex items-center justify-center text-red-color-2 rounded-lg absolute top-[8px] md:top-[16px] right-[8px] md:right-[16px] cursor-pointer"
            onClick={handleDelete}
          >
            <Image
              className="w-[12px] md:w-[16px] h-[12px] md:h-[16px]"
              width={16}
              height={16}
              src="/close-outline.svg"
              alt="Cerrar el card."
              priority
            />
          </span>
        ) : (
          <></>
        )}
        {title.length ? (
          <div className="bg-[#FFFFFF0A] w-fit-content px-[32px] md:px-[64px] py-[16px] mx-auto rounded-b-[36px]">
            <h2 className="font-medium text-xl md:text-2xl text-center">
              {title}
            </h2>
          </div>
        ) : (
          <></>
        )}
        {children}
      </div>
    </section>
  );
};

export default Card;
