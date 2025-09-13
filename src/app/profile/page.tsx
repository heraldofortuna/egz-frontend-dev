'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import redirectAfterService from '@actions/redirectAfterService';
import useAuthStatus from '@hooks/useAuthStatus';
import useAutoFocus from '@hooks/useAutoFocus';
import { getUserData, updateUserData } from '@services/usersServices';
import PageLoader from '@components/loader/PageLoader';
import Button from '@components/Button';
import Input from '@components/input/Input';
import Modal from '@components/Modal';
import LevelBar from '@components/LevelBar';
import { ModalData } from '@customtypes/components';
import {
  IProfileValues as IValues,
  IProfileValidations as IValidations,
} from '@customtypes/states';
import {
  DefaultProfileValues as defValues,
  DefaultProfileValidations as defValidations,
} from '@constants/default';
import StarList from '@/components/StarList';
import Skeleton from '@/components/Skeleton';

const ProfilePage = () => {
  const userTeamInputRef = useAutoFocus();
  const { accessToken, isAuthenticated, isAuthProcessFinished } =
    useAuthStatus();

  const [values, setValues] = useState<Object>({});
  const [originalValues, setOriginalValues] = useState<IValues>(defValues);
  const [validations, setValidations] = useState<IValidations>(defValidations);
  const [userLevel, setUserLevel] = useState<number>(0);
  const [userBarLevel, setUserBarLevel] = useState<number>(0);
  const [remainingMatches, setRemainingMatches] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnabledButton, setIsEnabledButton] = useState<boolean>(false);
  const [canUpdateData, setCanUpdateData] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    title: '',
    message: '',
    isOpen: false,
  });

  const handleCloseModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  const handleClickUpdateUserData = () => {
    setIsEnabledButton(true);
    setCanUpdateData(true);

    setTimeout(() => {
      if (userTeamInputRef.current) {
        userTeamInputRef.current.focus();
      }
    }, 300);
  };

  const handleClickCancelUpdateUserData = () => {
    setValues({});
    setValidations({ ...defValidations });
    setCanUpdateData(false);
  };

  const handleClickSubmitNewUserData = async () => {
    if (accessToken === 'default') return;

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

    setIsEnabledButton(false);

    const allFieldsAreValid = Object.values(validations).every(
      (value: boolean) => value === true,
    );

    if (!allFieldsAreValid) {
      setModalData({
        type: 'error',
        title: 'Ocurrió un error',
        message: 'Revise los nuevos valores ingresados.',
        isOpen: true,
      });

      setIsEnabledButton(true);

      return;
    }

    try {
      await updateUserData(accessToken, values);
      await redirectAfterService('/tournaments');
    } catch (error: any) {
      setModalData({
        type: 'error',
        title: 'Ocurrió un error',
        message:
          error?.data?.detail?.message ??
          'Error al actualizar la data del usuario.',
        isOpen: true,
      });
    } finally {
      setIsEnabledButton(true);
    }
  };

  useEffect(() => {
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

    if (isAuthProcessFinished && !isAuthenticated) {
      location.href = '/404';

      return;
    }

    const getUser = async () => {
      setIsLoading(true);

      try {
        const response = await getUserData(accessToken);

        const userData = response.data.data;
        const userLevel = response.data.bar_level;
        const userBarLevel = userLevel.current_completed_tournaments % 5;
        const currentUserLevel = Number(userLevel.current_level);
        const currentTournaments = userLevel.current_completed_tournaments;
        const nextTournaments = userLevel.next_completed_tournaments;
        const remainingMatches = nextTournaments - currentTournaments;

        const originalProfileValues = {
          userTeam: userData.team_name,
          userName: userData.name,
          userLastname: userData.lastname,
          userPhone: userData.phone,
          userEmail: userData.email,
          userDocument: userData.dni,
        };

        setValues({});
        setOriginalValues(originalProfileValues);
        setUserLevel(currentUserLevel);
        setUserBarLevel(userBarLevel);
        setRemainingMatches(remainingMatches);
      } catch (error: any) {
        setModalData({
          type: 'error',
          title: 'Ocurrió un error',
          message:
            error?.data?.detail?.message ??
            'Error al obtener la data del usuario.',
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

    getUser();
  }, [accessToken, isAuthProcessFinished, isAuthenticated]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <>
      {isAuthProcessFinished && isAuthenticated ? (
        <section className="w-full max-w-[600px] border border-gray-color-1 rounded-2xl md:rounded-3xl">
          <div className="h-full flex flex-col">
            <div className="flex flex-col items-center justify-center gap-2 md:gap-4 p-8 md:p-12">
              <Image
                src="/menu-profile.svg"
                className="w-[120px] md:w-[160px] h-[120px] md:h-[160px]"
                width={120}
                height={120}
                alt="Foto de perfil del usuario."
                priority
              />
              <div className="flex flex-col items-center justify-center gap-4">
                {isLoading ? (
                  <Skeleton className="w-10 md:w-20 h-6 md:h-7" />
                ) : (
                  <p className="text-center text-base md:text-lg font-medium">
                    Nivel {userLevel}
                  </p>
                )}
                <StarList
                  id="currentUserLevel"
                  level={userLevel}
                  isLoading={isLoading}
                />
                <LevelBar level={userBarLevel} isLoading={isLoading} />
                {isLoading ? (
                  <Skeleton className="w-[160px] md:w-[300px] h-5 md:h-6" />
                ) : (
                  <p className="text-center text-sm md:text-base">
                    Juega {remainingMatches} torneos más para subir de nivel.
                  </p>
                )}
              </div>
            </div>
            <div className="bg-secondary-color flex flex-col md:items-center gap-6 md:gap-8 p-8 md:p-12 rounded-b-2xl md:rounded-b-3xl">
              <h2 className="text-2xl text-center font-medium">
                Datos del usuario
              </h2>
              <form className="w-full flex flex-col md:flex-row justify-between md:justify-start gap-x-16 gap-y-4">
                <div className="w-full md:w-1/2 flex grow flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Input
                      ref={userTeamInputRef}
                      name="userTeam"
                      label="Equipo"
                      defaultValue={
                        originalValues.userTeam ?? 'Aun sin nombrar'
                      }
                      hasFullWidth
                      canHasError={canUpdateData}
                      isDisabled={!canUpdateData}
                      isLoading={isLoading}
                      onChange={(value: string, isValid: boolean) => {
                        setValues({
                          ...values,
                          team_name: value,
                        });
                        setValidations({
                          ...validations,
                          userTeam: isValid,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Input
                      name="userName"
                      label="Nombres"
                      defaultValue={originalValues.userName}
                      hasFullWidth
                      canHasError={canUpdateData}
                      isDisabled={!canUpdateData}
                      isLoading={isLoading}
                      onChange={(value: string, isValid: boolean) => {
                        setValues({ ...values, name: value });
                        setValidations({
                          ...validations,
                          userName: isValid,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Input
                      name="userLastname"
                      label="Apellidos"
                      defaultValue={originalValues.userLastname}
                      hasFullWidth
                      canHasError={canUpdateData}
                      isDisabled={!canUpdateData}
                      isLoading={isLoading}
                      onChange={(value: string, isValid: boolean) => {
                        setValues({
                          ...values,
                          lastname: value,
                        });
                        setValidations({
                          ...validations,
                          userLastname: isValid,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex grow flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Input
                      name="userPhone"
                      label="Teléfono"
                      type="phone"
                      defaultValue={originalValues.userPhone}
                      hasFullWidth
                      canHasError={canUpdateData}
                      isDisabled={true}
                      isLoading={isLoading}
                      onChange={(value: string, isValid: boolean) => {
                        setValues({
                          ...values,
                          phone: value,
                        });
                        setValidations({
                          ...validations,
                          userPhone: isValid,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Input
                      name="userEmail"
                      label="Correo"
                      type="email"
                      defaultValue={originalValues.userEmail}
                      hasFullWidth
                      canHasError={canUpdateData}
                      isDisabled={true}
                      isLoading={isLoading}
                      onChange={(value: string, isValid: boolean) => {
                        setValues({
                          ...values,
                          email: value,
                        });
                        setValidations({
                          ...validations,
                          userEmail: isValid,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Input
                      name="userDocument"
                      label="DNI"
                      type="document"
                      defaultValue={originalValues.userDocument}
                      hasFullWidth
                      canHasError={canUpdateData}
                      isDisabled={true}
                      isLoading={isLoading}
                      onChange={(value: string, isValid: boolean) => {
                        setValues({
                          ...values,
                          dni: value,
                        });
                        setValidations({
                          ...validations,
                          userDocument: isValid,
                        });
                      }}
                    />
                  </div>
                </div>
              </form>
              <div className="w-full md:w-fit h-[84px] md:h-[96px] min-h-[84px] md:min-h-[96px] flex flex-col justify-end gap-4 mt-[16px]">
                {canUpdateData ? (
                  <>
                    <Button
                      text="Guardar"
                      color="blue"
                      hasFullWidth
                      isDisabled={!isEnabledButton}
                      onClick={handleClickSubmitNewUserData}
                    />
                    <span
                      className="text-gray-color-3 text-center text-sm md:text-base cursor-pointer underline transition-regular hover:text-white"
                      onClick={handleClickCancelUpdateUserData}
                    >
                      Cancelar
                    </span>
                  </>
                ) : (
                  <Button
                    text="Actualizar"
                    color="blue"
                    hasFullWidth
                    isDisabled={isLoading}
                    onClick={handleClickUpdateUserData}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
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

export default ProfilePage;
