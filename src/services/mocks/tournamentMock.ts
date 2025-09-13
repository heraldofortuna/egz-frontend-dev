import { AxiosResponse } from 'axios';
import { createFutureDate, createPastDate } from '@actions/dateFormatter';

const generateMockTournamentResponse = (tournamentId: string): AxiosResponse<any> => {
  // Datos del usuario
  const mockUser: any = {
    team_name: 'Los Campeones FC',
    stage: 'EN ESPERA',
    msg: '¡Bienvenido al torneo! Prepárate para la competencia.'
  };

  // Información del torneo
  const mockTournament: any = {
    id: tournamentId,
    name: 'Torneo Premium Diciembre 2025',
    start_date: createFutureDate(5),
    end_date: createFutureDate(35),
    stage: 'EN ESPERA',
    quota: 1500,
    reward: 7500,
    level: '3',
    max_participants: 32,
    current_participants: 24
  };

  // Tabla de grupos
  const mockGroupStageTable: any = [
    { id: 'team-1', position: 1, team_name: 'Los Campeones FC', points: 9, group: 'A' },
    { id: 'team-2', position: 2, team_name: 'Dragones FC', points: 6, group: 'A' },
    { id: 'team-3', position: 3, team_name: 'Águilas Real', points: 3, group: 'A' },
    { id: 'team-4', position: 4, team_name: 'Tigres FC', points: 0, group: 'A' }
  ];

  // Generar partidos de grupos
  const mockGroupGames: Record<string, any> = {
    'Fecha 1': Array.from({ length: 2 }, (_, index) => createMockGame(index, 'GRUPOS A', true, index === 0)),
    'Fecha 2': Array.from({ length: 2 }, (_, index) => createMockGame(index + 2, 'GRUPOS A', false, index === 0))
  };

  // Generar partidos de llaves
  const mockKeyGames: Record<string, any> = {
    'Octavos de final': Array.from({ length: 4 }, (_, index) => createMockGame(index + 4, 'OCTAVOS', false, index === 0)),
    'Cuartos de final': Array.from({ length: 2 }, (_, index) => createMockGame(index + 8, 'CUARTOS', false, index === 0)),
    'Semifinal': Array.from({ length: 1 }, (_, index) => createMockGame(index + 10, 'SEMI-FINAL', false, index === 0)),
    'Final': Array.from({ length: 1 }, (_, index) => createMockGame(index + 11, 'FINAL', false, index === 0))
  };

  const mockResponse: AxiosResponse<any> = {
    data: {
      user: mockUser,
      tournament: mockTournament,
      group_stage_table: mockGroupStageTable,
      football_stage_keys: mockKeyGames,
      football_stage_group: mockGroupGames
    },
    status: 200,
    statusText: 'OK',
    headers: { 'content-type': 'application/json' },
    config: {
      headers: {
        Authorization: 'Bearer mock-token',
        'Content-Type': 'application/json'
      }
    } as any
  };

  return mockResponse;
};

// Función auxiliar para crear partidos mock MEJORADA
const createMockGame = (index: number, stage: string, isPast: boolean, isUserGame: boolean): any => {
  const teams = [
    { home: 'Barcelona', away: 'Real Madrid', homeLogo: '/teams/barcelona.png', awayLogo: '/teams/realmadrid.png' },
    { home: 'Bayern Munich', away: 'PSG', homeLogo: '/teams/bayern.png', awayLogo: '/teams/psg.png' },
    { home: 'Manchester United', away: 'Liverpool', homeLogo: '/teams/manutd.png', awayLogo: '/teams/liverpool.png' },
    { home: 'Juventus', away: 'Inter Milan', homeLogo: '/teams/juventus.png', awayLogo: '/teams/inter.png' }
  ];

  const teamPair = teams[index % teams.length];
  
  // Crear plays con estructura consistente
  const plays: any = [];
  
  // Siempre crear al menos un play
  const mainPlay: any = {
    is_user_play: isUserGame,
    is_appuser_local: isUserGame ? true : false, // ← ESTA ES LA CLAVE
    team_local_name: teamPair.home,
    team_visit_name: teamPair.away,
    points_local: isPast ? (index % 2 === 0 ? 3 : 1) : 0,
    points_visit: isPast ? (index % 2 === 0 ? 1 : 3) : 0,
    plays_local: isPast ? {
      id: `play-${index + 1}-local`,
      types_plays: index % 2 === 0 ? 'NORMAL' : 'ARRIESGADA',
      score_local: index % 2 === 0 ? 2 : 1,
      score_visit: index % 2 === 0 ? 1 : 2
    } : null,
    plays_visit: isPast ? {
      id: `play-${index + 1}-visit`,
      types_plays: index % 3 === 0 ? 'NORMAL' : 'ARRIESGADA',
      score_local: index % 2 === 0 ? 2 : 1,
      score_visit: index % 2 === 0 ? 1 : 2
    } : null
  };
  
  plays.push(mainPlay);

  // Agregar plays adicionales para partidos importantes
  if (stage.includes('FINAL') || stage.includes('SEMI')) {
    const additionalPlay: any = {
      is_user_play: false,
      is_appuser_local: false,
      team_local_name: 'Equipo Adicional',
      team_visit_name: 'Rival Adicional',
      points_local: isPast ? 2 : 0,
      points_visit: isPast ? 1 : 0,
      plays_local: isPast ? {
        id: `play-${index + 1}-add-local`,
        types_plays: 'NORMAL',
        score_local: 2,
        score_visit: 1
      } : null,
      plays_visit: isPast ? {
        id: `play-${index + 1}-add-visit`,
        types_plays: 'NORMAL',
        score_local: 2,
        score_visit: 1
      } : null
    };
    plays.push(additionalPlay);
  }

  return {
    id: `game-${index + 1}`,
    codigo: `MATCH-${index + 1}`,
    home_team: teamPair.home,
    home_score: isPast ? (index % 2 === 0 ? '2' : '1') : '-',
    home_team_logo: teamPair.homeLogo,
    away_team: teamPair.away,
    away_score: isPast ? (index % 2 === 0 ? '1' : '2') : '-',
    away_team_logo: teamPair.awayLogo,
    hour: '19:00',
    date: isPast ? createPastDate(index + 1) : createFutureDate(index + 1),
    tournament_stage: stage,
    is_past: isPast,
    plays: plays
  };
};

// Mock específico para evitar el error de currentPlay
export const getMockTournamentWithUserPlays = (tournamentId: string): Promise<AxiosResponse<any>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = generateMockTournamentResponse(tournamentId);
      
      // Asegurar que al menos un juego tenga is_user_play = true
      Object.values(response.data.football_stage_group).forEach((games: any) => {
        games.forEach((game: any, index: any) => {
          if (index === 0 && game.plays.length > 0) {
            game.plays[0].is_user_play = true;
            game.plays[0].is_appuser_local = true;
          }
        });
      });
      
      Object.values(response.data.football_stage_keys).forEach((games: any) => {
        games.forEach((game: any, index: any) => {
          if (index === 0 && game.plays.length > 0) {
            game.plays[0].is_user_play = true;
            game.plays[0].is_appuser_local = true;
          }
        });
      });

      resolve(response);
    }, 800);
  });
};

export const getMockTournamentData = (tournamentId: string): Promise<AxiosResponse<any>> => {
  return getMockTournamentWithUserPlays(tournamentId);
};

// Mocks para diferentes escenarios
export const getMockEliminatedTournament = (tournamentId: string): Promise<AxiosResponse<any>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = generateMockTournamentResponse(tournamentId);
      response.data.user.stage = 'ELIMINADO';
      response.data.user.msg = 'Fuiste eliminado en la fase de grupos.';
      resolve(response);
    }, 800);
  });
};

export const getMockWinnerTournament = (tournamentId: string): Promise<AxiosResponse<any>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = generateMockTournamentResponse(tournamentId);
      response.data.tournament.stage = 'TERMINADO';
      response.data.tournament.winner = 'Los Campeones FC';
      response.data.user.stage = 'GANADOR';
      response.data.user.msg = '¡Felicidades! Eres el campeón del torneo.';
      resolve(response);
    }, 800);
  });
};

export const getMockInProgressTournament = (tournamentId: string): Promise<AxiosResponse<any>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = generateMockTournamentResponse(tournamentId);
      response.data.tournament.stage = 'GRUPOS';
      response.data.user.stage = 'EN PROCESO';
      response.data.user.msg = 'El torneo está en marcha. ¡Buena suerte!';
      resolve(response);
    }, 800);
  });
};