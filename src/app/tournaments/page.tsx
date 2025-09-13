'use client';
import { useState, useEffect } from 'react';
import PageLoader from '@components/loader/PageLoader';
import Modal from '@components/Modal';
import Tabs from '@components/Tabs';
import Skeleton from '@components/Skeleton';
import Card from '@components/container/Card';
import useAuthStatus from '@hooks/useAuthStatus';
import { getTournamentsData } from '@services/tournamentsServices';
import { ModalData } from '@customtypes/components';
import TournamentsList from './components/TournamentsList';

export default function Tournaments() {
  const { accessToken, isAuthenticated, isAuthProcessFinished } =
    useAuthStatus();

  const [userTournaments, setUserTournaments] = useState<any>({});
  const [availableTournaments, setAvailableTournaments] = useState<any>({});
  const [selectedTab, setSelectedTab] = useState<any>('availables-tournaments');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalData, setModalData] = useState<ModalData>({
    title: '',
    message: '',
    isOpen: false,
  });

  const handleCloseModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  useEffect(() => {
    // if (!isAuthProcessFinished) return;

    // if (!accessToken) {
    //   setModalData({
    //     type: 'error',
    //     title: 'Ocurrió un error',
    //     message: 'La sesión expiró. Vuelva a ingresar.',
    //     button: {
    //       continue: {
    //         text: 'Salir',
    //         type: 'logout',
    //       },
    //     },
    //     isOpen: true,
    //   });
    //   return;
    // }

    // if (isAuthProcessFinished && !isAuthenticated) {
    //   location.href = '/404';
    //   return;
    // }

    const getTournaments = async () => {
      setIsLoading(true);

      try {
        const tournaments = await getTournamentsData(accessToken);
        const userTournaments = tournaments.data.data.filter(
          (tournament: any) => {
            return tournament.is_enrolled_user;
          },
        );
        const availableTournaments = tournaments.data.data.filter(
          (tournament: any) => {
            const isNotEnrolledUser = !tournament.is_enrolled_user;

            return isNotEnrolledUser;
          },
        );
        if (!availableTournaments.length) {
          setSelectedTab('user-tournaments');
        }
        setUserTournaments(userTournaments);
        setAvailableTournaments(availableTournaments);
      } catch (error: any) {
        setModalData({
          type: 'error',
          title: 'Ocurrió un error',
          message:
            error?.data?.detail?.message ??
            'Error al obtener la data de todos los torneos.',
          button: {
            continue: {
              type: 'reload',
            },
          },
          isOpen: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    getTournaments();
  }, [accessToken, isAuthProcessFinished, isAuthenticated]);

  return (
    <>
      {isLoading ? (
        <div className="h-custom-loader">
          <PageLoader />
        </div>
      ) : (
        <>
          {/* Tabulador de torneos */}
          <Tabs
            title="Torneos"
            selectedTab={selectedTab}
            data={[
              {
                id: 'availables-tournaments',
                label: 'Disponibles',
                isShowed: true,
                content: (
                  <Card>
                    {isLoading ? (
                      <Skeleton rounded={16} className="w-full h-[300px]" />
                    ) : availableTournaments.length ? (
                      <TournamentsList tournaments={availableTournaments} />
                    ) : (
                      <p className="text-center text-sm md:text-base">
                        Actualmente no hay torneos disponibles.
                      </p>
                    )}
                  </Card>
                ),
              },
              {
                id: 'user-tournaments',
                label: 'Mis torneos',
                isShowed: true,
                content: (
                  <Card>
                    {isLoading ? (
                      <Skeleton rounded={16} className="w-full h-[300px]" />
                    ) : userTournaments.length ? (
                      <TournamentsList tournaments={userTournaments} />
                    ) : (
                      <p className="text-center text-sm md:text-base">
                        Actualmente no estas incrito a algún torneo.
                      </p>
                    )}
                  </Card>
                ),
              },
            ]}
            isLoading={isLoading}
            onTabChange={setSelectedTab}
          />
        </>
      )}
      <Modal
        data={modalData}
        isOpen={modalData.isOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
