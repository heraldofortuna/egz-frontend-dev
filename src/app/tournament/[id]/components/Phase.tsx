'use client';
import { useEffect, useState } from 'react';
import { userPlaysFootballGames } from '@services/usersServices';
import useAuthStatus from '@hooks/useAuthStatus';
import formatDate from '@actions/formatDate';
import capitalize from '@actions/capitalize';
import Modal from '@components/Modal';
import { GameResult, ModalData, PlayResult } from '@customtypes/components';
import Game from './Game';

interface IPhaseProps {
  data: any;
  isOpen: boolean;
  onOpen: any;
}

const Phase = ({ data, isOpen, onOpen }: IPhaseProps) => {
  const { accessToken } = useAuthStatus();

  const [results, setResults] = useState<GameResult>([]);
  const [isShowedPlays, setIsShowedPlays] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    title: '',
    message: '',
    isOpen: false,
  });

  const handleCloseModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  const handleOpenPlays = () => {
    setIsShowedPlays(!isShowedPlays);
  };

  const handleChangeGameResult = (newResult: PlayResult) => {
    const updatedResults = results.map((result: any) => {
      if (result.id === newResult.id) {
        return {
          ...result,
          plays: result.plays.map((play: any) => {
            if (play.isUserPlay) {
              if (play.isLocalUser) {
                return {
                  ...play,
                  localPlays: newResult,
                };
              } else {
                return {
                  ...play,
                  visitPlays: newResult,
                };
              }
            }
            return play;
          }),
        };
      }
      return result;
    });

    setIsButtonActive(true);
    setResults(updatedResults);
  };

  const handleSubmitButton = async () => {
    setIsLoading(true);

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

      setIsLoading(false);

      return;
    }

    const request = results
      .map((result: any) => {
        const currentPlay = result.plays.find((play: any) => play.isUserPlay);
        const userPlay = currentPlay.isLocalUser
          ? currentPlay.localPlays
          : currentPlay.visitPlays;

        if (
          userPlay.localScore === undefined ||
          userPlay.visitScore === undefined
        )
          return;

        return {
          football_games_id: result.id,
          types_plays: userPlay.type,
          score_local: userPlay.localScore,
          score_visit: userPlay.visitScore,
        };
      })
      .filter((result: any) => result);

    try {
      await userPlaysFootballGames(accessToken, request);

      setModalData({
        type: 'success',
        title: '¡Buena jugada!',
        message: 'Se ha guardado correctamente tu pronóstico.',
        button: {
          continue: {
            type: 'reload',
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
          'Error al enviar el resultado del game.',
        isOpen: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      setIsButtonActive(false);
    }
  }, [isLoading]);

  useEffect(() => {
    setResults(data.games);
  }, [data]);

  useEffect(() => {
    setIsShowedPlays(data.isUserPlay);
  }, [data]);

  return (
    <>
      <div
        className={`flex flex-col border rounded-2xl ${isOpen ? (data.isPast ? 'border-gray-color-3 rounded-b-0' : 'border-blue-color-3 rounded-b-0') : 'border-gray-color-1 cursor-pointer'} ${data.isPast ? 'rounded-b-2xl' : ''}`}
        onClick={onOpen}
      >
        <div className="flex flex-col gap-2 p-4 rounded-t-2xl">
          <h3
            className={`text-center text-xl md:text-2xl ${isOpen ? 'text-white' : 'text-gray-color-1'} font-medium`}
          >
            {capitalize(data.name)}
          </h3>
          <p
            className={`text-center text-sm md:text-base ${isOpen ? 'text-white' : 'text-gray-color-1'} font-medium`}
          >
            {formatDate(data.date)}
          </p>
          {data.isUserPlay ? (
            <>
              {data.isPast ? (
                <div
                  className={`flex items-center justify-center gap-1 text-center text-sm md:text-base ${isOpen ? 'text-white' : 'text-gray-color-1'} font-light`}
                >
                  <p className="flex items-center gap-1 font-medium">
                    {data.points.userPoints > data.points.rivalPoints ? (
                      <span>[w]</span>
                    ) : (
                      <></>
                    )}
                    {data.userTeam}
                  </p>
                  <span className="font-medium">{`  (${data.points.userPoints})  -  (${data.points.rivalPoints})  `}</span>
                  <p className="flex items-center gap-1 font-medium">
                    {data.rivalTeam}
                    {data.points.userPoints < data.points.rivalPoints ? (
                      <span>[w]</span>
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              ) : (
                <p
                  className={`text-center text-sm md:text-base ${isOpen ? 'text-white' : 'text-gray-color-1'} font-light`}
                >
                  contra <span className="font-medium">{data.rivalTeam}</span>
                </p>
              )}
            </>
          ) : (
            <div
              className={`flex items-center justify-center gap-1 text-center text-sm md:text-base ${isOpen ? 'text-white' : 'text-gray-color-1'}`}
            >
              {isOpen ? (
                <>
                  <p
                    className={`${isShowedPlays ? 'text-red-color-2 hover:text-red-color-1' : 'text-gray-color-3 hover:text-white'} underline transition-regular cursor-pointer`}
                    onClick={handleOpenPlays}
                  >
                    {isShowedPlays ? 'Esconder resultados' : 'Ver resultados'}
                  </p>
                </>
              ) : (
                <p>No participaste</p>
              )}
            </div>
          )}
        </div>

        {/* Games */}
        {isOpen ? (
          <ul
            className={`flex flex-col md:grid md:grid-cols-3 border-t ${data.isPast ? 'border-gray-color-3' : 'border-blue-color-3'}`}
          >
            {results.map((game: any) => {
              return (
                <Game
                  key={game.id}
                  data={game}
                  phaseDate={data.date}
                  isShowed={isShowedPlays}
                  isPastPhase={data.isPast}
                  onChange={handleChangeGameResult}
                />
              );
            })}
          </ul>
        ) : (
          <></>
        )}

        {/* Botón */}
        {!data.isPast && isOpen ? (
          <div className="w-full rounded-b-2xl">
            <button
              className={`${isButtonActive ? 'bg-blue-color-3 text-white cursor-pointer pointer-events-auto' : 'bg-[#FFFFFF0A] text-gray-color-1 cursor-none pointer-events-none'} w-full h-full text-center md:text-lg font-medium p-4 border-t border-blue-color-3 rounded-b-xl`}
              disabled={!isButtonActive}
              onClick={handleSubmitButton}
            >
              {isLoading ? 'Cargando ...' : 'Enviar'}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <Modal
        data={modalData}
        isOpen={modalData.isOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Phase;
