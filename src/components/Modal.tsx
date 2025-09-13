'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import userLogout from '@actions/userLogout';
import reloadAfterService from '@actions/reloadAfterService';
import Button from '@components/Button';
import { ModalData, ModalType } from '@customtypes/components';

interface IModalProps {
  data: ModalData;
  isOpen: boolean;
  canBeClosed?: boolean;
  onClose: () => void;
}

const Modal = ({ data, isOpen, canBeClosed = false, onClose }: IModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const modalIcon = (type: ModalType = 'default') => {
    if (type === 'default') {
      return '/question-white.svg';
    }

    if (type === 'error') {
      return '/cancel-white.svg';
    }

    if (type === 'success') {
      return '/check-white.svg';
    }
  };

  const modalIconColor = (type: ModalType = 'default') => {
    if (type === 'default') {
      return 'bg-gradient-to-b from-blue-color-1 to-blue-color-2';
    }

    if (type === 'error') {
      return 'bg-gradient-to-b from-red-color-1 to-red-color-2';
    }

    if (type === 'success') {
      return 'bg-gradient-to-b from-green-color-1 to-green-color-2';
    }
  };

  const modalTitleColor = (type: ModalType = 'default') => {
    if (type === 'default') {
      return 'text-blue-color-1';
    }

    if (type === 'error') {
      return 'text-red-color-2';
    }

    if (type === 'success') {
      return 'text-green-color-2';
    }
  };

  const modalButtonColor = (type: ModalType = 'default') => {
    if (type === 'default') {
      return 'blue';
    }

    if (type === 'error') {
      return 'red';
    }

    if (type === 'success') {
      return 'green';
    }
  };

  const handleClickClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  };

  const handleClickCancelButton = async () => {
    if (data?.button?.continue?.type === 'logout') {
      return await userLogout();
    }

    if (data?.button?.continue?.type === 'redirect') {
      return (location.href = data?.button?.continue?.url ?? '/');
    }

    if (data?.button?.continue?.type === 'reload') {
      return await reloadAfterService();
    }

    if (data?.button?.continue?.type === 'other') {
      return data?.button?.continue?.action();
    }

    return handleClickClose();
  };

  const handleClickSecondaryButton = async () => {
    if (!data.button || !data.button.secondary) return;

    setIsLoading(true);

    await data.button.secondary.action();

    setIsLoading(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!canBeClosed) return;

      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsClosing(true);

        setTimeout(() => {
          setIsClosing(false);
          onClose();
        }, 250);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [canBeClosed, onClose]);

  useEffect(() => {
    const handleOpen = () => {
      if (!isOpen) return;

      document.documentElement.style.overflow = 'hidden';
    };

    const handleClose = () => {
      if (!isClosing) return;

      document.documentElement.style.overflow = 'auto';
    };

    window.addEventListener('resize', handleClose);

    handleOpen();

    return () => {
      window.removeEventListener('resize', handleClose);
      document.documentElement.style.overflow = 'auto';
    };
  }, [isOpen, isClosing, onClose]);

  if (!isOpen && !isClosing) return;

  return (
    <>
      <div className="fixed inset-0 bg-[#0B091A80] blur-background overflow-y-auto h-full w-full flex items-center justify-center z-30">
        <div
          ref={modalRef}
          className={`bg-secondary-color w-[90%] md:w-[50%] max-w-[400px] px-[16px] md:px-[32px] ${canBeClosed ? 'py-[56px] md:py-[64px]' : 'py-[32px]'} rounded-[16px] md:rounded-[24px] relative`}
        >
          {canBeClosed ? (
            <span
              className="bg-white w-[24px] h-[24px] flex items-center justify-center text-red-color-2 rounded-lg absolute top-[16px] md:top-[32px] right-[16px] md:right-[32px] cursor-pointer"
              onClick={handleClickClose}
            >
              <Image
                className="w-[16px] h-[16px]"
                width={16}
                height={16}
                src="/close-outline.svg"
                alt="Cerrar el modal"
                priority
              />
            </span>
          ) : (
            <></>
          )}
          <div className="flex flex-col items-center gap-6 md:gap-8">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`${modalIconColor(data.type)} w-[40px] md:w-[48px] h-[40px] md:h-[48px] rounded-full flex items-center justify-center`}
              >
                <Image
                  className="w-[20px] md:w-[24px] h-[20px] md:h-[24px]"
                  src={modalIcon(data.type) as any}
                  width={20}
                  height={20}
                  alt="Ícono del modal"
                />
              </div>
              <h3
                className={`${modalTitleColor(data.type)} text-xl md:text-2xl text-center font-medium`}
              >
                {data.title}
              </h3>
            </div>
            <p className="text-center md:text-lg">{data.message}</p>
            <div className="w-full flex items-center gap-4 mt-auto">
              <div
                className={
                  data.button && data.button.secondary ? 'w-1/2' : 'w-full'
                }
              >
                <Button
                  text={data?.button?.continue?.text ?? 'Continuar'}
                  color={modalButtonColor(data.type)}
                  variant="bordered"
                  hasFullWidth
                  isDisabled={isLoading}
                  onClick={handleClickCancelButton}
                />
              </div>
              {data.button && data.button.secondary ? (
                <div className="w-1/2">
                  <Button
                    text={data.button.secondary.text}
                    color={modalButtonColor(data.type)}
                    hasFullWidth
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    onClick={handleClickSecondaryButton}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
