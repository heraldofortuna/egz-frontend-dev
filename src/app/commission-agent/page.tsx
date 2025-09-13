'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useAuthStatus from '@hooks/useAuthStatus';
import {
  getCommissionAgentData,
  requestPayCommission,
} from '@services/paymentsServices';
import PageLoader from '@components/loader/PageLoader';
import Modal from '@components/Modal';
import Card from '@components/container/Card';
import Skeleton from '@components/Skeleton';
import Table from '@components/Table';
import { ModalData, TableData } from '@customtypes/components';
import capitalize from '@actions/capitalize';

const CommissionAgentPage = () => {
  const { accessToken, isAuthenticated, isAuthProcessFinished } =
    useAuthStatus();

  const [agentData, setAgentData] = useState<any>(null);
  const [tableData, setTableData] = useState<TableData>([]);
  const [tableButtonData, setTableButtonData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    title: '',
    message: '',
    isOpen: false,
  });

  const handleCloseModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  const handleCommissionTableData = (tableData: any) => {
    const table: any[] = [];
    const buttons: any[] = [];

    tableData.forEach((item: any) => {
      if (!item.id_mercado_pago) return;

      table.push({
        id: item.id_mercado_pago,
        cells: [
          item.id_mercado_pago,
          item.tournament,
          item.day_hour,
          capitalize(item.status),
        ],
      });

      buttons.push({
        id: item.id_mercado_pago,
        text: item.text_botton,
        isShowed: item.is_active_botton,
        isActived:
          item.status === 'APROBADO' &&
          item.text_botton === 'LISTO PARA COBRAR',
      });
    });

    return { table, buttons };
  };

  const handleRequestPayCommission = async (commissionId: string) => {
    if (!isAuthProcessFinished) return;

    if (!isAuthenticated) {
      location.href = '/404';

      return;
    }

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
      if (!commissionId) return;

      setIsLoadingButton(true);

      await requestPayCommission(commissionId, accessToken);
      await getCommissionAgent();

      setModalData({
        type: 'success',
        title: 'Cobro exitoso',
        message:
          'Un agente comercial se comunicará con usted para darle todos los detalles.',
        isOpen: true,
      });
    } catch (error: any) {
      setModalData({
        type: 'error',
        title: 'Ocurrió un error',
        message:
          error?.data?.detail?.message ??
          'Error pedir el pago de comisión de agente.',
        isOpen: true,
      });
    } finally {
      setIsLoadingButton(false);
    }
  };

  const getCommissionAgent = useCallback(async () => {
    try {
      const response = await getCommissionAgentData(accessToken);
      const data = response.data.data;
      const { table, buttons } = handleCommissionTableData(
        data.commission_table,
      );
      setAgentData(data.commission_agent);
      setTableData(table);
      setTableButtonData(buttons);
    } catch (error: any) {
      setModalData({
        type: 'error',
        title: 'Ocurrió un error',
        message:
          error?.data?.detail?.message ??
          'Error al obtener la data del agente de comisiones.',
        button: {
          continue: {
            type: 'reload',
          },
        },
        isOpen: true,
      });
    }
  }, [accessToken]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthProcessFinished) return;

      if (isAuthProcessFinished && !isAuthenticated) {
        location.href = '/404';
        return;
      }

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

      setIsLoading(true);
      try {
        await getCommissionAgent();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accessToken, getCommissionAgent, isAuthProcessFinished, isAuthenticated]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <>
      {isAuthProcessFinished && isAuthenticated ? (
        <>
          {/* Información del agente de comisión */}
          <Card color="blue">
            <Image
              className="hidden md:block absolute top-0 left-0 w-auto h-full rounded-l-2xl md:rounded-l-3xl"
              width={500}
              height={250}
              src="/left-waffle.svg"
              alt="Header de la página"
              priority
            />
            <Image
              className="hidden md:block absolute top-0 right-0 w-auto h-full rounded-r-2xl md:rounded-r-3xl"
              width={500}
              height={250}
              src="/right-waffle.svg"
              alt="Header de la página"
              priority
            />
            <div className="flex flex-col items-center gap-4">
              {isLoading ? (
                <Skeleton className="w-[160px] md:w-[200px] h-7 md:h-9" />
              ) : (
                <h1 className="text-xl md:text-3xl text-center text-yellow-color-2 font-bold">
                  Código: {agentData.codigo}
                </h1>
              )}
              <span className="bg-yellow-color-2 w-10 h-1 rounded-3xl"></span>
              {isLoading ? (
                <Skeleton className="w-[160px] md:w-[200px] h-7 md:h-8" />
              ) : (
                <p className="text-lg md:text-2xl text-center text-yellow-color-2 font-medium">
                  {agentData.percent}% de descuento
                </p>
              )}
              {isLoading ? (
                <Skeleton className="w-[200px] md:w-[240px] h-[20px] md:h-7" />
              ) : (
                <p className="text-center text-sm md:text-lg font-medium">
                  Fecha de finalización: {agentData.end_date}
                </p>
              )}
            </div>
          </Card>
          {/* Tabla de comisiones */}
          <Card>
            <Table
              headers={['ID', 'Torneo', 'Fecha', 'Estado']}
              data={tableData}
              buttonData={tableButtonData}
              onClickButton={handleRequestPayCommission}
              isLoadingButton={isLoadingButton}
              isLoading={isLoading}
            />
          </Card>
        </>
      ) : (
        <div className="h-custom-loader">
          <PageLoader />
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

export default CommissionAgentPage;
