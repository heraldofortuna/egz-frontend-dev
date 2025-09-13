import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CONFIG } from '@constants/config';
import { TournamentsApiResponse } from '@customtypes/tournaments';
import getMockTournamentsData from "@mocks/tournamentsMock";
import { getMockTournamentData } from '@mocks/tournamentMock';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const defaultTimeout = Number(process.env.NEXT_PUBLIC_DEFAULT_TIMEOUT);

export const getTournamentsData = async (
  authToken: string,
): Promise<AxiosResponse<TournamentsApiResponse>> => {
  if (CONFIG.USE_MOCKS || !authToken) {
    console.log('📦 Using mock tournaments data');
    return getMockTournamentsData();
  }

  const config: AxiosRequestConfig = {
    baseURL,
    url: '/tournaments',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    timeout: defaultTimeout,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error: any) {
    console.error('API Error, falling back to mock data:', error);
    return getMockTournamentsData();
  }
};

export const getTournamentData = async (
  tournament_id: string,
  authToken: string,
): Promise<AxiosResponse> => {
  if (CONFIG.USE_MOCKS || !authToken) {
    console.log('📦 Using mock tournament data');
    return getMockTournamentData(tournament_id);
  }

  const config: AxiosRequestConfig = {
    baseURL,
    url: `/tournaments/${tournament_id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    timeout: defaultTimeout,
  };

  try {
    const response = await axios(config);

    return response;
  } catch (error: any) {
    throw error.response;
  }
};
