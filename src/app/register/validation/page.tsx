'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import {
  resendOTPValidationCode,
  sendOTPValidationCode,
} from '@services/usersServices';
import { loginUser } from '@services/authServices';
import Modal from '@components/Modal';
import OTP, { IOTPHandle } from '@components/otp/OTP';
import CountDown from '@components/CountDown';
import { ModalData } from '@customtypes/components';
import { ILoginServiceData } from '@customtypes/services';

const RegisterValidationPage = () => {
  const registerOTPComponentRef = useRef<IOTPHandle>(null);

  const [OTPValue, setOTPValue] = useState<string[]>(['', '', '', '']);
  const [isOTPReseted, setIsOTPReseted] = useState<boolean>(false);
  const [isOTPDisabled, setIsOTPDisabled] = useState<boolean>(false);
  const [isCountDownReseted, setIsCountDownReseted] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    title: '',
    message: '',
    isOpen: false,
  });

  const handleCloseModal = useCallback(() => {
    setModalData((prevModalData) => ({ ...prevModalData, isOpen: false }));
  }, [setModalData]);

  const handleResetCountDown = useCallback(() => {
    setIsCountDownReseted(
      (prevIsCountDownReseted: boolean) => !prevIsCountDownReseted,
    );
  }, [setIsCountDownReseted]);

  const handleSuccessfulSendOTPModalAction = useCallback(() => {
    handleCloseModal();
    handleResetCountDown();

    setIsOTPReseted((prevState) => !prevState);

    setTimeout(() => {
      handleFocusOTP();
    }, 100);
  }, [handleCloseModal, handleResetCountDown, setIsOTPReseted]);

  const handleErrorSendOTPModalAction = useCallback(() => {
    handleCloseModal();

    setIsOTPReseted((prevState) => !prevState);

    setTimeout(() => {
      handleFocusOTP();
    }, 100);
  }, [handleCloseModal, setIsOTPReseted]);

  const handleChangeOTPValue = (OTPValue: string[]) => {
    setOTPValue(OTPValue);
  };

  const handleFocusOTP = () => {
    if (registerOTPComponentRef.current) {
      registerOTPComponentRef.current.focusFirstInput();
    }
  };

  const handleResendOTPValidation = async () => {
    setIsOTPDisabled(true);

    try {
      const userId = localStorage.getItem('userId');

      const resendOTPValidationServiceData: any = {
        appuser_id: userId,
      };

      await resendOTPValidationCode(resendOTPValidationServiceData);

      setModalData({
        type: 'success',
        title: 'Reenvío exitoso',
        message: 'Se reenvió el código correctamente.',
        button: {
          continue: {
            type: 'other',
            action: handleSuccessfulSendOTPModalAction,
          },
        },
        isOpen: true,
      });
    } catch (error: any) {
      setModalData({
        type: 'error',
        title: 'Ocurrió un error',
        message:
          error?.data?.detail?.message ??
          'Error en el servicio de reenvío del código de validación de registro del nuevo usuario.',
        button: {
          continue: { type: 'other', action: handleErrorSendOTPModalAction },
        },
        isOpen: true,
      });
    } finally {
      setIsOTPDisabled(false);
    }
  };

  const handleFinishCountDown = () => {
    setIsOTPDisabled(true);
  };

  useEffect(() => {
    const handleSubmitRegisterValidation = async () => {
      setIsOTPDisabled(true);

      try {
        const userId = localStorage.getItem('userId');

        const registerValidationServiceData: any = {
          appuser_id: userId,
          otp: OTPValue.join(''),
        };

        await sendOTPValidationCode(registerValidationServiceData);

        const userEmail = localStorage.getItem('userEmail');
        const userPhone = localStorage.getItem('userPhone');

        if (userEmail && userPhone) {
          const loginServiceData: ILoginServiceData = {
            username: userEmail,
            password: userPhone,
          };

          const response = await loginUser(2, loginServiceData);

          const data = response.data;
          const accessToken = data.access_token;
          const expiresIn = Number(data.expires_in);
          const now = Date.now();
          const expirationTime = String(now + expiresIn * 1000);

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('expirationTime', expirationTime);
        }

        setModalData({
          type: 'success',
          title: 'Validación exitosa',
          message:
            'Su cuenta ha sido validada correctamente. ¡Bienvenido al Gran Zorro!',
          button: { continue: { type: 'redirect', url: '/tournaments' } },
          isOpen: true,
        });
      } catch (error: any) {
        setModalData({
          type: 'error',
          title: 'Ocurrió un error',
          message:
            error?.data?.detail?.message ??
            'Error en el servicio de validación de registro del nuevo usuario.',
          button: {
            continue: { type: 'other', action: handleErrorSendOTPModalAction },
          },
          isOpen: true,
        });
      } finally {
        setIsOTPDisabled(false);
      }
    };

    if (OTPValue.join('').length === 4) {
      handleSubmitRegisterValidation();
    }
  }, [OTPValue, handleErrorSendOTPModalAction]);

  return (
    <>
      <h1 className="w-full text-xl md:text-3xl text-center font-medium">
        Verifica tu cuenta
      </h1>
      <form className="bg-secondary-color w-full rounded-[16px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 text-center">
            <p>Te enviamos un código al Whatsapp.</p>
            <p>Por favor ingresalo aquí:</p>
          </div>
          <OTP
            ref={registerOTPComponentRef}
            isReseted={isOTPReseted}
            isDisabled={isOTPDisabled}
            onChange={handleChangeOTPValue}
          />
        </div>
      </form>
      <div className="flex flex-col gap-2">
        <CountDown
          maxTime={60}
          onFinish={handleFinishCountDown}
          reset={isCountDownReseted}
        />
        <div className="w-full flex flex-col items-center gap-5">
          <p className="text-sm md:text-base text-center text-gray-color-3">
            ¿No te llegó el código?{' '}
            <span
              className="text-red-color-2 cursor-pointer underline transition-regular hover:text-red-color-1"
              onClick={handleResendOTPValidation}
            >
              Reenvialo aquí
            </span>
          </p>
        </div>
      </div>
      <Modal
        data={modalData}
        isOpen={modalData.isOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default RegisterValidationPage;
