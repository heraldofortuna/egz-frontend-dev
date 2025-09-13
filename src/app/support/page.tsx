'use client';
import { useRef, useState, useEffect } from 'react';
import { sendEmailService } from '@services/notificationServices';
import useAutoFocus from '@hooks/useAutoFocus';
import Textarea from '@components/Textarea';
import Input from '@components/input/Input';
import Button from '@components/Button';
import Dropdown from '@components/Dropdown';
import Modal from '@components/Modal';
import Hero from '@components/Hero';
import {
  ISupportValues as IValues,
  ISupportValidations as IValidations,
} from '@customtypes/states';
import { ModalData } from '@customtypes/components';
import { supportSubjectsList } from '@constants/data';
import {
  DefaultSupportValues as defValues,
  DefaultSupportValidations as defValidations,
} from '@constants/default';

const SupportPage = () => {
  const emailInputRef = useAutoFocus();
  const dropdownRef = useRef<any>(null);

  const [values, setValues] = useState<IValues>(defValues);
  const [validations, setValidations] = useState<IValidations>(defValidations);
  const [currentSubject, setCurrentSubject] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isEnabledButton, setIsEnabledButton] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    title: '',
    message: '',
    isOpen: false,
  });

  const handleCloseModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  const handleIsDropdownOpen = (isDropdownOpen: boolean) => {
    setIsDropdownOpen(isDropdownOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && isEnabledButton) {
      handleSubmitSupport();
      event.preventDefault();
    }
  };

  const handleSubmitSupport = async () => {
    setIsEnabledButton(false);
    setisLoading(true);

    try {
      const sendEmailServiceBody = {
        email: values.email,
        asunto: values.subject,
        mensaje: values.message,
      };

      await sendEmailService(sendEmailServiceBody);

      setModalData({
        type: 'success',
        title: 'Envío exitoso',
        message: 'Se envió correctamente el correo a soporte.',
        button: { continue: { type: 'redirect', url: '/' } },
        isOpen: true,
      });
    } catch (error: any) {
      setModalData({
        type: 'error',
        title: 'Ocurrió un error',
        message: error?.data?.detail?.message ?? 'Error al enviar un correo.',
        isOpen: true,
      });
    } finally {
      setIsEnabledButton(true);
      setisLoading(false);
    }
  };

  useEffect(() => {
    setIsEnabledButton(
      Object.values(validations).every((value: boolean) => value === true),
    );
  }, [validations]);

  useEffect(() => {
    const currentSubjectStr = localStorage.getItem('currentSubject');

    if (currentSubjectStr) {
      const currentSubject = Number(currentSubjectStr);

      setCurrentSubject(currentSubject);

      setValues({
        email: '',
        subject: supportSubjectsList[currentSubject].name,
        message: '',
      });

      setValidations({
        email: false,
        subject: true,
        message: false,
      });

      setTimeout(() => {
        localStorage.removeItem('currentSubject');
      }, 1000);
    }
  }, []);

  return (
    <>
      <Hero
        title="Contáctanos"
        description="¿Tienes preguntas o necesitas ayuda? Estamos aquí para asistirte. Usa el formulario de contacto y te escribiremos los más pronto posible."
        image="support"
      />
      <form className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="h-full flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <Input
              ref={emailInputRef}
              name="email"
              label="Correo"
              type="email"
              variant="light"
              placeholder="Ingrese su correo aquí"
              hasFullWidth
              onChange={(value: string, isValid: boolean) => {
                setValues({ ...values, email: value });
                setValidations({
                  ...validations,
                  email: isValid,
                });
              }}
              onKeyDown={handleKeyDown}
            />
            <Dropdown
              ref={dropdownRef}
              data={supportSubjectsList}
              label="Asunto"
              currentValue={currentSubject}
              isOpen={handleIsDropdownOpen}
              onChange={(value: string, isValid: boolean) => {
                setValues({ ...values, subject: value });
                setValidations({
                  ...validations,
                  subject: isValid,
                });
              }}
            />
            <div
              className={`${isDropdownOpen ? 'opacity-0' : 'opacity-100'} transition-regular`}
            >
              <Textarea
                name="message"
                label="Mensaje"
                placeholder="Escriba su mensaje aquí"
                onChange={(value: string, isValid: boolean) => {
                  setValues({ ...values, message: value });
                  setValidations({
                    ...validations,
                    message: isValid,
                  });
                }}
              />
            </div>
          </div>
          <div className="m-0 mt-auto">
            <Button
              text="Enviar"
              color="blue"
              hasFullWidth
              isDisabled={!isEnabledButton}
              isLoading={isLoading}
              onClick={handleSubmitSupport}
            />
          </div>
        </div>
      </form>
      <Modal
        data={modalData}
        isOpen={modalData.isOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default SupportPage;
