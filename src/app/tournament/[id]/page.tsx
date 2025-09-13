'use client';
import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { getTournamentData } from '@services/tournamentsServices';
import { declineUserToTournament } from '@services/usersServices';
import useAuthStatus from '@hooks/useAuthStatus';
import formatDate from '@actions/formatDate';
import PageLoader from '@components/loader/PageLoader';
import Modal from '@components/Modal';
import Tabs from '@components/Tabs';
import Table from '@components/Table';
import Skeleton from '@components/Skeleton';
import Card from '@components/container/Card';
import ConfettiAnimation from '@components/animation/Confetti';
import RainAnimation from '@components/animation/Rain';
import { ModalData, PlayResult } from '@customtypes/components';
import Phase from './components/Phase';

const TournamentPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { accessToken, isAuthenticated, isAuthProcessFinished } =
    useAuthStatus();
  const { id } = use(params);

  const [userStage, setUserStage] = useState<string>('');
  const [tournamentInfo, setTournamentInfo] = useState<any>({});
  const [winner, setWinner] = useState<string>('');
  const [isUserEliminated, setIsUserEliminated] = useState<boolean>(false);
  const [userTeam, setUserTeam] = useState<string>('');
  const [nextPhases, setNextPhases] = useState<any>([]);
  const [keysPhases, setKeysPhases] = useState<any>([]);
  const [groupPhases, setGroupPhases] = useState<any>([]);
  const [groupName, setGroupName] = useState<string>('');
  const [groupData, setGroupData] = useState<any>({});
  const [selectedTab, setSelectedTab] = useState<any>('next-phases');
  const [openPhase, setOpenPhase] = useState<any>({
    id: 'next-phases',
    index: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    title: '',
    message: '',
    isOpen: false,
  });

  const handleCloseModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  const handleOpenConfirmModal = () => {
    setModalData({
      title: '¿Estás seguro?',
      message: '¿Abandorás un gran premio?',
      button: {
        continue: {
          text: 'No',
        },
        secondary: {
          text: 'Sí',
          action: handleDeclineTournament,
        },
      },
      isOpen: true,
    });
  };

  const tournamentDateMessage = (stage: any, date: any) => {
    let message = '';

    if (stage === 'EN ESPERA') {
      message = `Comienza el ${formatDate(date, 'large').toLowerCase()}`;
    }

    if (stage === 'EN PROCESO') {
      message = 'Estás jugando actualmente.';
    }

    if (stage.includes('ELIMINADO')) {
      message = 'Fuiste eliminado. ¡Más suerte la próxima vez!';
    }

    return message;
  };

  const handleTournamentTableData = (tableData: any) => {
    return tableData.map((team: any) => {
      const teamName = team.team_name ?? 'Por definir';

      return {
        id: team.id,
        cells: [team.position, teamName, team.points],
      };
    });
  };

  const handleReturnToTournaments = () => {
    location.href = '/tournaments';
  };

  const handleDeclineTournament = async () => {
    try {
      await declineUserToTournament(accessToken, id);

      setModalData({
        title: '¡Atención!',
        message:
          'En unas horas te contactará un asesor para la devolución de dinero.',
        button: {
          continue: {
            type: 'other',
            action: handleReturnToTournaments,
          },
        },
        isOpen: true,
      });
    } catch (error: any) {
      setModalData({
        type: 'error',
        title: 'Ocurrió un error',
        message:
          error?.data?.detail?.message ?? 'Error al desuscribirnos del torneo.',
        isOpen: true,
      });
    }
  };

  const handleOpenPhase = (phaseId: string, phaseIndex: number) => {
    setOpenPhase({ id: phaseId, index: phaseIndex });
  };

  const renderPhasesList = (phases: any, phaseId: any) => (
    <ul className="flex flex-col gap-4 md:gap-8">
      {phases.map((phase: any, index: number) => {
        const isPhaseListId = openPhase.id === phaseId;
        const isPhaseIndex = openPhase.index === index;
        const isOpenPhase = isPhaseListId && isPhaseIndex;

        return (
          <li key={phase.name}>
            <Phase
              data={phase}
              isOpen={isOpenPhase}
              onOpen={() => handleOpenPhase(phaseId, index)}
            />
          </li>
        );
      })}
    </ul>
  );

  function handlePhases(games: any) {
    const phasesList = [];

    for (const [name, gameList] of Object.entries(games)) {
      if (Array.isArray(gameList) && gameList.length > 0) {
        const gameName = name ?? 'Fecha X';
        const gameDate = gameList[0].date ?? 'Por definir';
        const isGroupStage = gameList[0].tournament_stage.includes('GRUPOS');
        const isPastStage = gameList.every((game: any) => game.is_past);

        const gamesList = gameList.map((game: any) => {
          const isPastGame = game.is_past;

          const playsList = game.plays.map((play: any) => {
            const localTeamName = play.team_local_name ?? 'Por definir';
            const visitTeamName = play.team_visit_name ?? 'Por definir';

            const localPoints = play.points_local ?? 0;
            const visitPoints = play.points_visit ?? 0;

            const localPlays: PlayResult = {
              id: game.id,
              type: play.plays_local?.types_plays ?? 'NORMAL',
              localScore:
                play.plays_local !== null
                  ? play.plays_local.score_local
                  : isPastGame
                    ? undefined
                    : 0,
              visitScore:
                play.plays_local !== null
                  ? play.plays_local.score_visit
                  : isPastGame
                    ? undefined
                    : 0,
            };

            const visitPlays: PlayResult = {
              id: game.id,
              type: play.plays_visit?.types_plays ?? 'NORMAL',
              localScore:
                play.plays_visit !== null
                  ? play.plays_visit.score_local
                  : isPastGame
                    ? undefined
                    : 0,
              visitScore:
                play.plays_visit !== null
                  ? play.plays_visit.score_visit
                  : isPastGame
                    ? undefined
                    : 0,
            };

            return {
              isUserPlay: play.is_user_play,
              isLocalUser: play.is_appuser_local,
              localTeamName: localTeamName,
              localPlays: localPlays,
              localPoints: localPoints,
              visitTeamName: visitTeamName,
              visitPlays: visitPlays,
              visitPoints: visitPoints,
            };
          });

          const isUserPlay = game.plays.some(
            (play: any) => play.is_user_play === true,
          );

          return {
            id: game.id,
            code: game.codigo,
            homeTeam: game.home_team ?? 'Por definir',
            homeScore: game.home_score ?? '-',
            homeLogo: game.home_team_logo ?? '/shield-team.svg',
            awayTeam: game.away_team ?? 'Por definir',
            awayScore: game.away_score ?? '-',
            awayLogo: game.away_team_logo ?? '/shield-team.svg',
            hour: game.hour,
            plays: playsList,
            isPast: isPastGame,
            isUserPlay: isUserPlay,
          };
        });

        const isUserPlay = gamesList[0].isUserPlay;
        let userTeam = 'Por definir';
        let rivalTeam = 'Por definir';

        if (isUserPlay) {
          const userPlays = gamesList[0].plays.filter(
            (play: any) => play.isUserPlay,
          )[0];

          if (userPlays.isLocalUser) {
            userTeam = userPlays.localTeamName;
            rivalTeam = userPlays.visitTeamName;
          } else {
            userTeam = userPlays.visitTeamName;
            rivalTeam = userPlays.localTeamName;
          }
        }

        const calculateUserAndRivalPoints = (games: any) => {
          let userPoints = 0;
          let rivalPoints = 0;

          games.forEach((game: any) => {
            game.plays.forEach((play: any) => {
              if (play.isUserPlay) {
                if (play.isLocalUser) {
                  userPoints += play.localPoints;
                  rivalPoints += play.visitPoints;
                } else {
                  userPoints += play.visitPoints;
                  rivalPoints += play.localPoints;
                }
              }
            });
          });

          return {
            userPoints,
            rivalPoints,
          };
        };

        const points = calculateUserAndRivalPoints(gamesList);

        phasesList.push({
          name: gameName,
          date: gameDate,
          games: gamesList,
          userTeam: userTeam,
          rivalTeam: rivalTeam,
          points: points,
          isGroupStage: isGroupStage,
          isPast: isPastStage,
          isUserPlay: isUserPlay,
        });
      }
    }

    return phasesList;
  }

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

    const getTournament = async () => {
      setIsLoading(true);

      try {
        const tournament = await getTournamentData(id, accessToken);
        const userTeam = tournament.data.user.team_name;
        const userStage = tournament.data.user.stage;
        const userStageMsg = tournament.data.user.msg;
        const tournamentInfo = tournament.data.tournament;
        const winner = tournament.data.tournament.winner ?? '';
        const tournamentStage = tournament.data.tournament.stage;
        const allKeysPhases = tournament.data.football_stage_keys;
        const allGroupPhases = tournament.data.football_stage_group;
        const currentGroupData = tournament.data.group_stage_table;
        const groupName = `Grupo ${currentGroupData[0].group}`;
        const groupData = handleTournamentTableData(currentGroupData);
        const isTournamentGroupStage = tournamentStage.includes('GRUPOS');
        const isTournamentStarted = !tournamentStage.includes('EN ESPERA');
        const isUserEliminated = userStage.includes('ELIMINADO');

        let nextPhases: any = [];
        let keysPhases: any = handlePhases(allKeysPhases);
        let groupPhases: any = handlePhases(allGroupPhases);

        if (isTournamentStarted) {
          if (isTournamentGroupStage) {
            nextPhases = groupPhases.filter((game: any) => !game.isPast);
            keysPhases = [];
            groupPhases = groupPhases.filter((game: any) => game.isPast);
          } else {
            nextPhases = keysPhases.filter(
              (game: any) => !game.isPast && game.name === tournamentStage,
            );
            keysPhases = keysPhases.filter((game: any) => game.isPast);
          }
        } else {
          nextPhases = groupPhases;
          keysPhases = [];
          groupPhases = [];
        }

        if (isUserEliminated) {
          nextPhases = [];
        }

        setUserStage(userStage);
        setTournamentInfo(tournamentInfo);
        setWinner(winner);
        setIsUserEliminated(isUserEliminated);
        setUserTeam(userTeam);
        setNextPhases(nextPhases);
        setKeysPhases(keysPhases);
        setGroupData(groupData);
        setGroupName(groupName);
        setGroupPhases(groupPhases);

        if (userStageMsg) {
          setModalData({
            type: 'success',
            title: '¡Atención!',
            message: userStageMsg,
            isOpen: true,
          });
        }
      } catch (error: any) {
        console.error(error);

        setModalData({
          type: 'error',
          title: 'Ocurrió un error',
          message:
            error?.data?.detail?.message ??
            'Error al obtener la data del actual torneo.',
          button: {
            continue: {
              type: 'redirect',
              url: '/tournaments',
            },
          },
          isOpen: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    getTournament();
  }, [params, accessToken, isAuthProcessFinished, isAuthenticated]);

  /** Este efecto hace que al cambiar el tab seleccionado, se abra el primer game salvo
   *  si son llaves o grupos.
   */
  useEffect(() => {
    let index: number | null = 0;

    if (selectedTab === 'keys-phases' || selectedTab === 'group-phases') {
      index = null;
    }

    setOpenPhase({
      id: selectedTab,
      index,
    });
  }, [selectedTab]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <>
      {isAuthProcessFinished && isAuthenticated && !isLoading ? (
        <>
          {/* Información del torneo */}
          <Card color="blue">
            <Image
              className="hidden md:block absolute top-0 left-0 w-auto h-full rounded-l-[16px] md:rounded-l-[24px]"
              width={500}
              height={250}
              src="/left-waffle.svg"
              alt="Header de la página"
              priority
            />
            <Image
              className="hidden md:block absolute top-0 right-0 w-auto h-full rounded-r-[16px] md:rounded-r-[24px]"
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
                  {tournamentInfo.name}
                </h1>
              )}
              <span className="bg-yellow-color-2 w-[40px] h-[4px] rounded-[24px]"></span>
              {isLoading ? (
                <Skeleton className="w-[160px] md:w-[200px] h-[28px] md:h-[32px]" />
              ) : (
                <p className="text-lg md:text-2xl text-center text-yellow-color-2 font-medium">
                  {userTeam}
                </p>
              )}
              {isLoading ? (
                <Skeleton className="w-[200px] md:w-[240px] h-[20px] md:h-[28px]" />
              ) : (
                <p className="text-center text-sm md:text-lg font-medium">
                  {tournamentDateMessage(userStage, tournamentInfo.start_date)}
                </p>
              )}
            </div>
          </Card>

          {/* Tipo de game */}
          <Card color="blue" isDeletable>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col md:flex-row md:gap-2">
                <span className="text-sm md:text-base font-medium">
                  Jugada normal:
                </span>
                <p className="text-sm md:text-base font-light">
                  +1 si aciertas el ganador o empate.
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:gap-2">
                <span className="text-sm md:text-base font-medium">
                  Jugada arriesgada:
                </span>
                <p className="text-sm md:text-base font-light">
                  +3 si aciertas el marcador.
                </p>
              </div>
            </div>
          </Card>

          {/* Tabulador de torneos */}
          <Tabs
            title="Torneo"
            selectedTab={selectedTab}
            data={[
              {
                id: 'next-phases',
                label: 'Próximos',
                isShowed: nextPhases.length > 0,
                content: (
                  <Card>
                    {isLoading ? (
                      <Skeleton
                        rounded={16}
                        className="w-full h-[300px] md:h-[500px]"
                      />
                    ) : nextPhases.length ? (
                      renderPhasesList(nextPhases, 'next-phases')
                    ) : (
                      <p className="text-center text-sm md:text-base">
                        No hay partidos por jugar.
                      </p>
                    )}
                  </Card>
                ),
              },
              {
                id: 'winner-team',
                label: 'Ganador',
                isShowed: winner.length > 0,
                content: (
                  <Card>
                    {isLoading ? (
                      <Skeleton
                        rounded={16}
                        className="w-full h-[300px] md:h-[500px]"
                      />
                    ) : nextPhases.length ? (
                      renderPhasesList(nextPhases, 'next-phases')
                    ) : (
                      <p className="text-center text-sm md:text-base">
                        El ganador del torneo fue{' '}
                        <span className="font-medium">{winner}</span>
                      </p>
                    )}
                  </Card>
                ),
              },
              {
                id: 'keys-phases',
                label: 'Llaves',
                isShowed: true,
                content: (
                  <Card>
                    {isLoading ? (
                      <Skeleton
                        rounded={16}
                        className="w-full h-[300px] md:h-[500px]"
                      />
                    ) : keysPhases.length > 0 ? (
                      renderPhasesList(keysPhases, 'keys-phases')
                    ) : (
                      <p className="text-center text-sm md:text-base">
                        No se han jugado partidos de llaves.
                      </p>
                    )}
                  </Card>
                ),
              },
              {
                id: 'group-phases',
                label: 'Grupo',
                isShowed: true,
                content: (
                  <>
                    <Card>
                      {isLoading ? (
                        <Skeleton
                          rounded={16}
                          className="w-full h-[300px] md:h-[500px]"
                        />
                      ) : groupPhases.length > 0 ? (
                        renderPhasesList(groupPhases, 'group-phases')
                      ) : (
                        <p className="text-center text-sm md:text-base">
                          No se han jugado partidos de grupo.
                        </p>
                      )}
                    </Card>
                    <Card>
                      {isLoading ? (
                        <Skeleton
                          rounded={16}
                          className="w-full h-[28px] md:h-[32px]"
                        />
                      ) : (
                        <h2 className="text-center text-xl md:text-2xl font-medium">
                          {groupName}
                        </h2>
                      )}
                      {groupData.length > 0 ? (
                        <Table
                          headers={['Posición', 'Equipo', 'Puntaje']}
                          data={groupData}
                          isLoading={isLoading}
                        />
                      ) : (
                        <p className="text-center text-sm font-light">
                          No hay información del grupo.
                        </p>
                      )}
                    </Card>
                  </>
                ),
              },
            ]}
            isLoading={isLoading}
            onTabChange={setSelectedTab}
          />
          {userStage === 'EN ESPERA' ? (
            <section className="w-full mt-[32px]">
              <div className="w-full text-center">
                <span
                  className="text-center text-sm md:text-base text-gray-color-3 cursor-pointer transition-regular hover:text-red-color-1"
                  onClick={handleOpenConfirmModal}
                >
                  Salir del torneo
                </span>
              </div>
            </section>
          ) : (
            <></>
          )}
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
      {winner.length && winner === userTeam ? <ConfettiAnimation /> : <></>}
      {isUserEliminated ? <RainAnimation /> : <></>}
    </>
  );
};

export default TournamentPage;
