import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Input from '@components/input/Input';
import Button from '@components/Button';
import Modal from '@components/Modal';
import ConfettiAnimation from '@components/animation/Confetti';
import Steps from './Steps';
import { getCouponDiscount, payTournament } from '@services/paymentsServices';
import { enrollUserToTournament } from '@/services/usersServices';
import useAuthStatus from '@hooks/useAuthStatus';
import useAutoFocus from '@hooks/useAutoFocus';
import { ModalData } from '@customtypes/components';

interface IPaymentModalProps {
  tournamentId: string;
  tournamentQuota: number;
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({
  tournamentId,
  tournamentQuota,
  isOpen,
  onClose,
}: IPaymentModalProps) => {
  const { accessToken, isAuthProcessFinished } = useAuthStatus();
  const couponInputRef = useAutoFocus();
  const userPhoneInputRef = useAutoFocus();
  const modalRef = useRef<HTMLDivElement>(null);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [discount, setDiscount] = useState<any>(null);
  const [values, setValues] = useState<{
    coupon: string;
    phone: string;
    approvalCode: string;
  }>({
    coupon: '',
    phone: '',
    approvalCode: '',
  });
  const [validations, setValidations] = useState<{
    coupon: boolean;
    phone: boolean;
    approvalCode: boolean;
  }>({
    coupon: false,
    phone: false,
    approvalCode: false,
  });
  const [payment, setPayment] = useState<string>('');
  const [hasDiscount, setHasDiscount] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    title: '',
    message: '',
    isOpen: false,
  });

  const handleCloseModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  const handleClickClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      setCurrentStep(1);
      onClose();
    }, 250);
  };

  const handleFocusInCouponInput = useCallback(() => {
    setTimeout(() => {
      if (couponInputRef.current) {
        couponInputRef.current.focus();
      }
    }, 300);
  }, [couponInputRef]);

  const handleFocusInUserPhoneInput = () => {
    setTimeout(() => {
      if (userPhoneInputRef.current) {
        userPhoneInputRef.current.focus();
      }
    }, 300);
  };

  const handleCouponErrorModalButton = () => {
    handleCloseModal();
    handleFocusInCouponInput();
  };

  const handleYapeErrorModalButton = () => {
    handleCloseModal();
    handleFocusInUserPhoneInput();
  };

  const handleGoToSecondStep = () => {
    setCurrentStep(2);
    handleFocusInUserPhoneInput();
  };

  const resetModalData = useCallback(() => {
    setCurrentStep(1);
    setDiscount(null);
    setValues({ coupon: '', phone: '', approvalCode: '' });
    setValidations({ coupon: false, phone: false, approvalCode: false });
    setPayment('');
    setHasDiscount(false);
    setIsDisabled(true);
    setModalData({
      title: '',
      message: '',
      isOpen: false,
    });

    handleFocusInCouponInput();
  }, [handleFocusInCouponInput]);

  const handleUseCoupon = async () => {
    if (!isAuthProcessFinished) return;

    if (!accessToken) {
      setModalData({
        type: 'error',
        title: 'Ocurrió un error',
        message: 'La sesión expiró. Vuelva a ingresar.',
        button: {
          continue: {
            text: 'Salir',
            type: 'logout',
          },
        },
        isOpen: true,
      });

      return;
    }

    try {
      setIsLoading(true);

      const couponDiscount = await getCouponDiscount(
        values.coupon,
        accessToken,
      );
      const discount = couponDiscount.data.detail.coupon;
      setDiscount(discount);
      setHasDiscount(true);
    } catch (error: any) {
      setModalData({
        type: 'error',
        title: 'Ocurrió un error',
        message:
          error?.data?.detail?.message ??
          'Error al obtener el cupón de descuento.',
        button: {
          continue: {
            type: 'other',
            action: handleCouponErrorModalButton,
          },
        },
        isOpen: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetCoupon = () => {
    setDiscount(null);
    setHasDiscount(false);
  };

  const handlePayWithYape = async () => {
    if (!isAuthProcessFinished) return;

    if (!accessToken) {
      setModalData({
        type: 'error',
        title: 'Ocurrió un error',
        message: 'La sesión expiró. Vuelva a ingresar.',
        button: {
          continue: {
            text: 'Salir',
            type: 'logout',
          },
        },
        isOpen: true,
      });

      return;
    }

    try {
      setIsLoading(true);

      const payTournamentServiceData: any = {
        commission_agent_id: discount?.id,
        phone: values.phone,
        approval_code: values.approvalCode,
        tournament_id: tournamentId,
      };

      await payTournament(payTournamentServiceData, accessToken);
      await handleUserEnrollment();
      setCurrentStep(3);
    } catch (error: any) {
      setModalData({
        type: 'error',
        title: 'Ocurrió un error',
        message: error?.data?.detail?.message ?? 'Error al yapear.',
        button: {
          continue: {
            type: 'other',
            action: handleYapeErrorModalButton,
          },
        },
        isOpen: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturnToFirstStep = () => {
    setCurrentStep(1);
    resetModalData();
  };

  const handleUserEnrollment = async () => {
    try {
      await enrollUserToTournament(accessToken, tournamentId);
    } catch (error: any) {
      setModalData({
        type: 'error',
        title: 'Ocurrió un error',
        message:
          error?.data?.detail?.message ??
          'Error al inscribir al usuario a un torneo.',
        isOpen: true,
      });
    }
  };

  const handleGoToTournament = () => {
    location.href = `/tournament/${tournamentId}`;
  };

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

  useEffect(() => {
    setIsDisabled(true);
  }, [currentStep]);

  useEffect(() => {
    const isValid = validations.phone && validations.approvalCode;
    setIsDisabled(!isValid);
  }, [validations]);

  useEffect(() => {
    if (hasDiscount) {
      const discountPercent = (100 - discount.percent) * tournamentQuota;
      const currentPayment = (discountPercent / 100).toFixed(2);
      setPayment(currentPayment);
    } else {
      const currentPayment = tournamentQuota.toFixed(2).toString();
      setPayment(currentPayment);
    }
  }, [discount, hasDiscount, tournamentQuota]);

  useEffect(() => {
    if (isOpen) {
      resetModalData();
    }
  }, [isOpen, resetModalData]);

  if (!isOpen && !isClosing) return;

  return (
    <>
      <div className="fixed inset-0 bg-[#0B091A80] blur-background overflow-y-auto h-full w-full flex items-center justify-center z-30">
        <div
          ref={modalRef}
          className={`bg-secondary-color w-[90%] md:w-[75%] max-w-[640px] md:h-[640px] p-4 md:py-8 md:px-14 rounded-[16px] md:rounded-[24px] relative`}
        >
          <span
            className="bg-white w-6 md:w-8 h-6 md:h-8 flex items-center justify-center text-red-color-2 rounded-lg md:rounded-xl absolute top-3 md:top-4 right-3 md:right-4 cursor-pointer"
            onClick={handleClickClose}
          >
            <Image
              className="w-3 md:w-4 h-3 md:h-4"
              width={16}
              height={16}
              src="/close-outline.svg"
              alt="Cerrar el modal"
              priority
            />
          </span>
          <div className="h-full flex flex-col items-center gap-6 md:gap-8">
            <p className="text-center text-lg md:text-2xl font-medium">
              Inscripción del torneo
            </p>
            <Image
              className="w-[60px] md:w-[100px] transition-regular"
              src="/egz-logo.svg"
              width={60}
              height={60}
              alt="Logo de El Gran Zorro"
              priority={false}
            />
            <div className="md:bg-gradient-to-r md:from-[#363167] md:to-[#2C275C] w-full md:px-12 md:py-4 md:rounded-3xl md:shadow-steps">
              <Steps currentStep={currentStep} />
            </div>
            <div className="w-full h-full">
              {currentStep === 1 ? (
                <div className="h-full flex flex-col gap-6 md:gap-8">
                  <Input
                    ref={couponInputRef}
                    name="coupon"
                    label="Agrega tu código de cupón"
                    type="coupon"
                    placeholder="Ingresalo aquí"
                    autocapitalize="characters"
                    hasFullWidth
                    isDisabled={hasDiscount}
                    onChange={(value: string, isValid: boolean) => {
                      setValues({
                        ...values,
                        coupon: value,
                      });
                      setValidations({
                        ...validations,
                        coupon: isValid,
                      });
                    }}
                  />
                  {hasDiscount ? (
                    <p className="text-center text-yellow-color-2 font-medium">
                      ¡Felicidades! Ahorraste el {discount.percent}% del precio
                      total.
                    </p>
                  ) : (
                    <></>
                  )}
                  <div className="flex flex-col items-center gap-6 mt-auto">
                    <div className="w-full md:w-3/4">
                      {hasDiscount ? (
                        <Button
                          text="Siguiente"
                          color="blue"
                          hasFullWidth
                          onClick={handleGoToSecondStep}
                        />
                      ) : (
                        <Button
                          text="Canjear"
                          color="orange"
                          hasFullWidth
                          isDisabled={!validations.coupon}
                          isLoading={isLoading}
                          onClick={handleUseCoupon}
                        />
                      )}
                    </div>
                    {hasDiscount ? (
                      <p
                        className="text-center text-xs md:text-sm text-gray-color-3 underline cursor-pointer transition-regular hover:text-white"
                        onClick={handleResetCoupon}
                      >
                        Cambiar el cupón
                      </p>
                    ) : (
                      <p
                        className="text-center text-xs md:text-sm text-gray-color-3 underline cursor-pointer transition-regular hover:text-white"
                        onClick={handleGoToSecondStep}
                      >
                        Omitir el cupón
                      </p>
                    )}
                  </div>
                </div>
              ) : currentStep === 2 ? (
                <>
                  <div className="h-full flex flex-col gap-6 md:gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <Input
                        ref={userPhoneInputRef}
                        name="yapePhone"
                        label="Ingresa tu celular"
                        type="phone"
                        placeholder="Ingresalo aquí"
                        hasFullWidth
                        onChange={(value: string, isValid: boolean) => {
                          setValues({
                            ...values,
                            phone: value,
                          });
                          setValidations({
                            ...validations,
                            phone: isValid,
                          });
                        }}
                      />
                      <Input
                        name="yapeCode"
                        label="Ingresa tu código de aprobación Yape"
                        type="yapeCode"
                        placeholder="Ingresalo aquí"
                        hasFullWidth
                        onChange={(value: string, isValid: boolean) => {
                          setValues({
                            ...values,
                            approvalCode: value,
                          });
                          setValidations({
                            ...validations,
                            approvalCode: isValid,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-6 mt-auto">
                      <div className="w-full md:w-3/4">
                        <Button
                          text={`Yapear S/ ${payment}`}
                          color="orange"
                          hasFullWidth
                          isDisabled={isDisabled}
                          isLoading={isLoading}
                          onClick={handlePayWithYape}
                        />
                      </div>
                      <p
                        className="text-center text-xs md:text-sm text-gray-color-3 underline cursor-pointer transition-regular hover:text-white"
                        onClick={handleReturnToFirstStep}
                      >
                        Retroceder
                      </p>
                    </div>
                  </div>
                </>
              ) : currentStep === 3 ? (
                <>
                  <div className="flex flex-col items-center gap-6 md:gap-8 mt-auto">
                    <h2 className="text-xl md:text-2xl text-center">
                      ¡Bienvenido al torneo!
                    </h2>
                    <div className="w-full md:w-3/4">
                      <Button
                        text="Ir al torneo"
                        color="blue"
                        hasFullWidth
                        onClick={handleGoToTournament}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <p>Error</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        data={modalData}
        isOpen={modalData.isOpen}
        onClose={handleCloseModal}
      />
      {currentStep === 3 ? <ConfettiAnimation /> : <></>}
    </>
  );
};

export default PaymentModal;
