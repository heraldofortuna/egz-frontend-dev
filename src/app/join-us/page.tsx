'use client';
import { useState } from 'react';
import Hero from '@components/Hero';
import Button from '@components/Button';
import Modal from '@components/Modal';
import { ModalData } from '@customtypes/components';
import { createCommissionAgent } from '@services/paymentsServices';
import useAuthStatus from '@hooks/useAuthStatus';

const JoinUsPage = () => {
  const { accessToken, isAuthenticated } = useAuthStatus();

  const [modalData, setModalData] = useState<ModalData>({
    title: '',
    message: '',
    isOpen: false,
  });

  const handleCloseModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  const handleSubmitButton = () => {
    setModalData({
      title: '¿Estás seguro?',
      message: '¡Será un honor trabajar juntos!',
      button: {
        continue: {
          text: 'No',
        },
        secondary: {
          text: 'Unirme',
          action: handleOpenSuccessModal,
        },
      },
      isOpen: true,
    });
  };

  const handleOpenSuccessModal = async () => {
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
      await createCommissionAgent(accessToken);

      setModalData({
        type: 'success',
        title: '¡Bienvenido al equipo!',
        message:
          'Un agente comercial se comunicará con usted para darle todos los detalles.',
        button: {
          continue: {
            type: 'redirect',
            url: '/',
          },
        },
        isOpen: true,
      });
    } catch (error: any) {
      console.error(error);

      setModalData({
        type: 'error',
        title: 'Ocurrió un error',
        message:
          error?.data?.detail?.message ??
          'Error al crear un agente de comisiones. Inténtelo más tarde.',
        button: {
          continue: {
            type: 'redirect',
            url: '/',
          },
        },
        isOpen: true,
      });
    }
  };

  return (
    <>
      <Hero
        title="¿Quieres generar ingresos extra?"
        description="Hazlo trabajando con nosotros mediante comisiones otorgados por el uso de cupones."
        image="join-us"
      />
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">1. ¿Cómo se comisiona?</h2>
          <p>
            Al volverte un agente comisionador se te proporcionará un código de
            descuento.
          </p>
          <p>
            Deberás promocionar dicho código entre tus conocidos y si uno de
            ellos se inscribe a un torneo usando tu código y NO SE RETIRA
            durante este, obtendrás 1 sol de comisión.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            2. ¿Cuándo puedo retirar mi dinero?
          </h2>
          <p>
            Una vez que tengas 10 comisiones aprobadas como mínimo, puedes
            solicitar el desembolso. Nuestro equipo de finanzas se contactará
            contigo al número de celular registrado.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            3. ¿Cuánto es el descuento que tiene mi código?
          </h2>
          <p>
            El código inicial asignado es por un descuento del 10% de la
            inscripción de un torneo, sin embargo, si vemos que varias personas
            usan tu código, mejoraremos el porcentaje.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            4. ¿Existe algún requisito para volverme agente comisionador?
          </h2>
          <p>
            La única condición es haber cumplido la mayoría de edad legal en el
            Perú.
          </p>
        </div>
      </section>
      {isAuthenticated ? (
        <Button
          text="Quiero comisionar"
          color="blue"
          onClick={handleSubmitButton}
        />
      ) : (
        <></>
      )}
      <Modal
        data={modalData}
        isOpen={modalData.isOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default JoinUsPage;
