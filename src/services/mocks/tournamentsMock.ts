import { AxiosResponse } from 'axios';
import { createFutureDate, createPastDate } from '@actions/dateFormatter';
import { CONFIG } from '@constants/config';
import { TournamentsApiResponse, Tournament, TournamentStage } from '@customtypes/tournaments';

export const generateMockTournamentsResponse = (): AxiosResponse<TournamentsApiResponse> => {
  const stages: TournamentStage[] = [
    'EN ESPERA', 'GRUPOS', 'OCTAVOS', 'CUARTOS', 'SEMI-FINAL', 'FINAL', 'TERMINADO'
  ];

  const mockTournaments: Tournament[] = Array.from({ length: 12 }, (_, index) => {
    const stageIndex = index % stages.length;
    const isEnrolled = index % 3 === 0;
    const isActive = index % 4 !== 0;

    return {
      id: `tournament-${index + 1}`,
      name: `Torneo ${index + 1}`,
      start_date: createFutureDate(index * 2),
      end_date: createFutureDate((index * 2) + 7),
      quota: 10 + (index * 100),
      reward: 500 + (index * 500),
      stage: stages[stageIndex],
      level: `${(index % 5) + 1}`,
      is_enrolled_user: isEnrolled,
      active_for_user: isActive,
      description: `Descripción del torneo ${index + 1}. Un emocionante torneo con grandes premios.`,
      max_participants: 100,
      current_participants: Math.floor(Math.random() * 100),
      entry_fee: index % 2 === 0 ? 50 : 0,
      rules: `Reglas oficiales del torneo ${index + 1}. Todos los participantes deben seguir el código de conducta.`,
     created_at: createPastDate(index * 3),
      updated_at: createPastDate(index * 1),
    };
  });

  const mockResponse: AxiosResponse<TournamentsApiResponse> = {
    data: {
      data: mockTournaments,
      meta: {
        total: mockTournaments.length,
        page: 1,
        per_page: 20,
        total_pages: 1,
      }
    },
    status: 200,
    statusText: 'OK',
    headers: {
      'content-type': 'application/json'
    },
    config: {
      headers: {
        Authorization: 'Bearer mock-token',
        'Content-Type': 'application/json'
      }
    } as any
  };

  return mockResponse;
};

const getMockTournamentsData = (): Promise<AxiosResponse<TournamentsApiResponse>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockTournamentsResponse());
    }, CONFIG.MOCK_DELAY);
  });
};

export default getMockTournamentsData;