import { useState } from 'react';
import Image from 'next/image';
import formatDate from '@actions/formatDate';
import capitalize from '@actions/capitalize';
import redirectAfterService from '@actions/redirectAfterService';
import Modal from '@components/Modal';
import StarList from '@/components/StarList';
import PaymentModal from './PaymentModal';
import { ComponentColor, ModalData } from '@customtypes/components';

interface ITournamentCardProps {
  id: string;
  title: string;
  startDate: string;
  quota: number;
  reward: number;
  stage: any;
  level: number;
  color?: ComponentColor;
  isEnrolled?: boolean;
  isUnlevel?: boolean;
}

const TournamentCard = ({
  id = '',
  title = 'Torneo Random',
  startDate = '01 de enero',
  quota = 20,
  reward = 200,
  stage = 'EN ESPERA',
  level = 1,
  color = 'red',
  isEnrolled = false,
  isUnlevel = false,
}: ITournamentCardProps) => {
  const [modalData, setModalData] = useState<ModalData>({
    title: '',
    message: '',
    isOpen: false,
  });

  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  const handleClosePaymentModal = () => {
    setOpenPaymentModal(false);
  };

  const backgroundColor = () => {
    if (isUnlevel) {
      return 'bg-white/80 opacity-75';
    }

    if (color === 'primary') {
      return 'bg-gradient-to-b from-purple-color-1 to-purple-color-2';
    }

    if (color === 'blue') {
      return 'bg-gradient-to-b from-blue-color-1 to-blue-color-2';
    }

    if (color === 'green') {
      return 'bg-gradient-to-b from-green-color-1 to-green-color-2';
    }

    if (color === 'yellow') {
      return 'bg-gradient-to-b from-yellow-color-1 to-yellow-color-2';
    }

    if (color === 'orange') {
      return 'bg-gradient-to-b from-orange-color-2 to-orange-color-3';
    }

    if (color === 'red') {
      return 'bg-gradient-to-b from-red-color-1 to-red-color-2';
    }
  };

  const handleOpenUnlevelModal = () => {
    setModalData({
      title: '¡Lo sentimos!',
      message: 'Aún no tienes nivel para este torneo. ¡Sigue participando!',
      button: {
        continue: {
          text: 'Continuar',
        },
      },
      isOpen: true,
    });
  };

  const handleOpenPaymentModal = () => {
    handleCloseModal();
    setOpenPaymentModal(true);
  };

  const handleClickTournamentCard = async () => {
    if (isEnrolled) {
      await redirectAfterService(`/tournament/${id}`);
    } else {
      if (isUnlevel) {
        handleOpenUnlevelModal();
      } else {
        handleOpenPaymentModal();
      }
    }
  };

  return (
    <>
      <div
        className={`${backgroundColor()} max-w-full h-30 md:min-h-[240px] flex flex-col items-stretch gap-4 rounded-2xl p-4 md:p-8 cursor-pointer`}
        onClick={handleClickTournamentCard}
      >
        <div className="flex flex-grow flex-col items-start gap-4">
          <div className="w-full flex items-center justify-between gap-4">
            <h3 className="w-[200px] md:w-[300px] text-2xl md:text-3xl text-left font-medium truncate">
              {title}
            </h3>
            <StarList id={id} level={level} size="small" />
          </div>
          <div className="flex flex-wrap items-start gap-x-4 gap-y-1">
            <div className="flex flex-nowrap items-center gap-1">
              <Image
                src="/calendar.svg"
                width={20}
                height={20}
                alt="Lorem Ipsum is simply dummy text of the printing"
              />
              <span className="text-sm md:text-base font-medium">
                {formatDate(startDate, 'short')}
              </span>
            </div>
            <div className="flex flex-nowrap items-center gap-1">
              <Image
                src="/ticket.svg"
                width={20}
                height={20}
                alt="Lorem Ipsum is simply dummy text of the printing"
              />
              <span className="text-sm md:text-base font-medium">
                {quota} PEN
              </span>
            </div>
            <div className="flex flex-nowrap items-center gap-1">
              <Image
                src="/trophy.svg"
                width={18}
                height={18}
                alt="Lorem Ipsum is simply dummy text of the printing"
              />
              <span className="text-sm md:text-base font-medium">
                {reward} PEN
              </span>
            </div>
          </div>
          <p className="text-xs md:text-sm px-4 py-1 md:py-2 border border-white rounded-lg md:rounded-xl">
            {capitalize(stage)}
          </p>
        </div>
      </div>
      <Modal
        data={modalData}
        isOpen={modalData.isOpen}
        onClose={handleCloseModal}
      />
      <PaymentModal
        tournamentId={id}
        tournamentQuota={quota}
        isOpen={openPaymentModal}
        onClose={handleClosePaymentModal}
      />
    </>
  );
};

export default TournamentCard;
