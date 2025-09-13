'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { loginUser } from '@services/authServices';
import {
  resendOTPValidationCode,
  sendOTPValidationCode,
} from '@services/usersServices';
import useAutoFocus from '@hooks/useAutoFocus';
import redirectAfterService from '@actions/redirectAfterService';
import Input from '@components/input/Input';
import Button from '@components/Button';
import Modal from '@components/Modal';
import OTP, { IOTPHandle } from '@components/otp/OTP';
import CountDown from '@components/CountDown';
import {
  ILoginValues as IValues,
  ILoginValidations as IValidations,
} from '@customtypes/states';
import { ILoginServiceData } from '@customtypes/services';
import { ModalData } from '@customtypes/components';
import {
  DefaultLoginValues as defValues,
  DefaultLoginValidations as defValidations,
} from '@constants/default';

const LoginPage = () => {
  const loginEmailInputRef = useAutoFocus();
  const loginOTPComponentRef = useRef<IOTPHandle>(null);

  const [step, setStep] = useState<number>(1);
  const [userId, setUserId] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const [expirationTime, setExpirationTime] = useState<string>('');
  const [values, setValues] = useState<IValues>(defValues);
  const [validations, setValidations] = useState<IValidations>(defValidations);
  const [OTPValue, setOTPValue] = useState<string[]>(['', '', '', '']);
  const [isCommissionAgent, setIsComissionAgent] = useState<boolean>(false);
  const [isOTPReseted, setIsOTPReseted] = useState<boolean>(false);
  const [isOTPDisabled, setIsOTPDisabled] = useState<boolean>(false);
  const [isCountDownReseted, setIsCountDownReseted] = useState<boolean>(false);
  const [isLoadingUserLogin, setIsLoadingUserLogin] = useState<boolean>(false);
  const [isEnabledButton, setIsEnabledButton] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    title: '',
    message: '',
    isOpen: false,
  });

  const handleCloseModal = useCallback(() => {
    setModalData((prevModalData) => ({ ...prevModalData, isOpen: false }));
  }, [setModalData]);

  const handleSuccessfulSendOTPModalAction = () => {
    handleCloseModal();
    handleResetCountDown();

    setIsOTPReseted(true);

    setTimeout(() => {
      handleFocusOTP();
    }, 100);
  };

  const handleErrorSendOTPModalAction = useCallback(() => {
    handleCloseModal();

    setIsOTPReseted(true);

    setTimeout(() => {
      handleFocusOTP();
    }, 100);
  }, [handleCloseModal, setIsOTPReseted]);

  const handleSubmitLogin = async () => {
    setIsEnabledButton(false);
    setIsLoadingUserLogin(true);

    try {
      const loginServiceData: ILoginServiceData = {
        username: values.email,
        password: values.phone,
      };

      // const response: any = await loginUser(1, loginServiceData);

      // const data = response.data;
      // const userId = data.appuser_id;
      // const isCommissionAgent = data.is_commission_agent;
      // const accessToken = data.access_token;
      // const expiresIn = Number(data.expires_in);
      // const now = Date.now();
      // const expirationTime = String(now + expiresIn * 1000);

      // setAccessToken(accessToken);
      // setExpirationTime(expirationTime);
      // setUserId(userId);
      // setIsComissionAgent(isCommissionAgent);
      setStep(2);
    } catch (error: any) {
      setModalData({
        type: 'error',
        title: 'Ocurrió un error',
        message: error?.data?.detail?.message ?? 'Credenciales inválidas.',
        isOpen: true,
      });
    } finally {
      setIsEnabledButton(true);
      setIsLoadingUserLogin(false);
    }
  };

  const handleResendOTPValidation = async () => {
    setIsOTPDisabled(true);
    setIsLoadingUserLogin(true);

    try {
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
          'Error en el servicio de reenvío del código de validación de login del usuario.',
        button: {
          continue: { type: 'other', action: handleErrorSendOTPModalAction },
        },
        isOpen: true,
      });
    } finally {
      setIsOTPDisabled(false);
      setIsLoadingUserLogin(false);
    }
  };

  const handleChangeOTPValue = (OTPValue: string[]) => {
    setOTPValue(OTPValue);
  };

  const handleFocusOTP = () => {
    if (loginOTPComponentRef.current) {
      loginOTPComponentRef.current.focusFirstInput();
    }
  };

  const handleClickLostPhone = async () => {
    localStorage.setItem('currentSubject', '1');

    await redirectAfterService('/support');
  };

  const handleFinishCountDown = () => {
    setIsOTPDisabled(true);
  };

  const handleResetCountDown = () => {
    setIsCountDownReseted(!isCountDownReseted);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && isEnabledButton && !modalData.isOpen) {
      event.preventDefault();
      handleSubmitLogin();
    }
  };

  useEffect(() => {
    setIsEnabledButton(
      Object.values(validations).every((value: boolean) => value === true),
    );
  }, [validations]);

  useEffect(() => {
    const handleSubmitLoginValidation = async () => {
      setIsOTPDisabled(true);
      setIsLoadingUserLogin(true);

      try {
        // const loginValidationServiceData: any = {
        //   appuser_id: userId,
        //   otp: OTPValue.join(''),
        // };

        // await sendOTPValidationCode(loginValidationServiceData);

        // localStorage.setItem('accessToken', accessToken);
        // localStorage.setItem('expirationTime', expirationTime);
        // localStorage.setItem('isComissionAgent', isCommissionAgent.toString());
        localStorage.setItem('accessToken', 'heraldofortuna');
        localStorage.setItem('expirationTime', '1000000');
        await redirectAfterService('/tournaments');
      } catch (error: any) {
        setModalData({
          type: 'error',
          title: 'Ocurrió un error',
          message:
            error?.data?.detail?.message ??
            'Error en el servicio de validación de login del usuario.',
          button: {
            continue: { type: 'other', action: handleErrorSendOTPModalAction },
          },
          isOpen: true,
        });
      } finally {
        setIsOTPDisabled(false);
        setIsLoadingUserLogin(false);
      }
    };

    if (OTPValue.join('').length === 4) {
      handleSubmitLoginValidation();
    }
  }, [
    OTPValue,
    accessToken,
    expirationTime,
    userId,
    isCommissionAgent,
    handleErrorSendOTPModalAction,
  ]);

  useEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        if (loginOTPComponentRef.current) {
          loginOTPComponentRef.current.focusFirstInput();
        }
      }, 100);
    }
  }, [step]);

  return (
    <>
      <h1 className="hidden md:block w-full md:text-3xl md:text-center font-medium pl-[16px] md:pl-0">
        {step === 1 ? 'Ingresar' : 'Verifica tu cuenta'}
      </h1>
      {step === 1 ? (
        <form
          className="bg-secondary-color w-full max-w-[600px] rounded-[16px] md:rounded-[24px] p-[32px] md:p-[48px]"
          onSubmit={handleSubmitLogin}
        >
          <div className="flex flex-col gap-6">
            <Input
              ref={loginEmailInputRef}
              name="loginEmailInput"
              label="Correo"
              type="email"
              placeholder="Ingresa tu correo"
              hasFullWidth
              canHasError
              onChange={(value: string, isValid: boolean) => {
                setValues({ ...values, email: value });
                setValidations({ ...validations, email: isValid });
              }}
              onKeyDown={handleKeyDown}
            />
            <Input
              name="loginPhoneInput"
              label="Celular"
              type="phone"
              placeholder="Ingresa tu celular"
              hasFullWidth
              canHasError
              onChange={(value: string, isValid: boolean) => {
                setValues({ ...values, phone: value });
                setValidations({ ...validations, phone: isValid });
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
        </form>
      ) : (
        <form className="bg-secondary-color w-full rounded-[16px] md:rounded-[32px] p-[32px] md:p-[48px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-sm md:text-base text-center">
                Te enviamos un código al Whatsapp.
              </p>
              <p className="text-sm md:text-base text-center">
                Por favor ingresalo aquí:
              </p>
            </div>
            <OTP
              ref={loginOTPComponentRef}
              isReseted={isOTPReseted}
              isDisabled={isOTPDisabled}
              onChange={handleChangeOTPValue}
            />
          </div>
        </form>
      )}
      {step === 1 ? (
        <>
          <div className="w-full flex flex-col items-center gap-5">
            <div className="w-full md:w-[600px] flex items-center justify-center">
              <Button
                text="¡Vamos a jugar!"
                color="blue"
                hasFullWidth
                isDisabled={!isEnabledButton}
                isLoading={isLoadingUserLogin}
                onClick={handleSubmitLogin}
              />
            </div>
            <p className="text-sm md:text-base text-center text-gray-color-3">
              ¿No eres un miembro aún?{' '}
              <Link href="/register">
                <span className="text-red-color-2 cursor-pointer underline transition-regular hover:text-red-color-1">
                  Registrate aquí
                </span>
              </Link>
            </p>
          </div>
          <span
            className="text-xs md:text-sm text-gray-color-3 underline cursor-pointer transition-regular hover:text-white"
            onClick={handleClickLostPhone}
          >
            Perdí mi teléfono
          </span>
        </>
      ) : (
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
      )}
      <Modal
        data={modalData}
        isOpen={modalData.isOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default LoginPage;
