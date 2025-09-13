'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { registerUser } from '@services/authServices';
import useAutoFocus from '@hooks/useAutoFocus';
import redirectAfterService from '@actions/redirectAfterService';
import Input from '@components/input/Input';
import Button from '@components/Button';
import Modal from '@components/Modal';
import { ModalData } from '@customtypes/components';
import {
  IRegisterValues as IValues,
  IRegisterValidations as IValidations,
} from '@customtypes/states';
import { IRegisterServiceData } from '@customtypes/services';
import {
  DefaultRegisterValues as defValues,
  DefaultRegisterValidations as defValidations,
} from '@constants/default';

const RegisterPage = () => {
  const registerNameInputRef = useAutoFocus();

  const [values, setValues] = useState<IValues>(defValues);
  const [validations, setValidations] = useState<IValidations>(defValidations);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnabledButton, setIsEnabledButton] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    title: '',
    message: '',
    isOpen: false,
  });

  const handleCloseModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && isEnabledButton) {
      handleSubmitRegister();
      event.preventDefault();
    }
  };

  const handleSubmitRegister = async () => {
    setIsEnabledButton(false);
    setIsLoading(true);

    try {
      const registerServiceData: IRegisterServiceData = {
        name: values.name,
        lastname: values.lastname,
        phone: values.phone,
        email: values.email,
        dni: values.document,
      };

      const response = await registerUser(registerServiceData);
      const userId = response.data.user_id;

      localStorage.setItem('userId', userId);
      localStorage.setItem('userEmail', values.email);
      localStorage.setItem('userPhone', values.phone);

      await redirectAfterService('/register/validation');
    } catch (error: any) {
      setModalData({
        type: 'error',
        title: 'Ocurrió un error',
        message:
          error?.data?.detail?.message ??
          'Error en el servicio de registro de usuario.',
        isOpen: true,
      });
    } finally {
      setIsEnabledButton(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsEnabledButton(
      Object.values(validations).every((value: boolean) => value === true),
    );
  }, [validations]);

  return (
    <>
      <h1 className="w-full text-xl md:text-3xl text-center font-medium">
        Regístrate
      </h1>
      <form
        className="bg-secondary-color w-full max-w-[600px] rounded-[16px] md:rounded-[32px] p-[32px] md:p-[48px]"
        onSubmit={handleSubmitRegister}
      >
        <div className="flex flex-col gap-6">
          <Input
            ref={registerNameInputRef}
            name="registerNameInput"
            label="Nombres"
            type="name"
            placeholder="Ingresa tus nombres"
            hasFullWidth
            canHasError
            onChange={(value: string, isValid: boolean) => {
              setValues({ ...values, name: value });
              setValidations({ ...validations, name: isValid });
            }}
            onKeyDown={handleKeyDown}
          />
          <Input
            name="registerLastnameInput"
            label="Apellidos"
            type="name"
            placeholder="Ingresa tus apellidos"
            hasFullWidth
            canHasError
            onChange={(value: string, isValid: boolean) => {
              setValues({ ...values, lastname: value });
              setValidations({
                ...validations,
                lastname: isValid,
              });
            }}
            onKeyDown={handleKeyDown}
          />
          <Input
            name="registerPhoneInput"
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
          <Input
            name="registerEmailInput"
            label="Correo electrónico"
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
            name="registerDocumentInput"
            label="DNI"
            type="document"
            placeholder="Ingresa tu DNI"
            hasFullWidth
            canHasError
            onChange={(value: string, isValid: boolean) => {
              setValues({ ...values, document: value });
              setValidations({
                ...validations,
                document: isValid,
              });
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
      </form>
      <div className="w-full flex flex-col items-center gap-5">
        <div className="w-full md:w-[400px] flex items-center justify-center">
          <Button
            text="Registrar"
            color="blue"
            hasFullWidth
            isDisabled={!isEnabledButton}
            isLoading={isLoading}
            onClick={handleSubmitRegister}
          />
        </div>
        <p className="text-sm md:text-base text-center text-gray-color-3">
          ¿Ya estás registrado?
          <Link href="/login">
            {' '}
            <span className="text-red-color-2 cursor-pointer underline transition-regular hover:text-red-color-1">
              Ingresa aquí
            </span>
          </Link>
        </p>
      </div>
      <Modal
        data={modalData}
        isOpen={modalData.isOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default RegisterPage;
