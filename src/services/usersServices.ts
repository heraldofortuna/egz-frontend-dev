import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const defaultTimeout = Number(process.env.NEXT_PUBLIC_DEFAULT_TIMEOUT);

export const getUserData = async (
  authToken: string,
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: '/users',
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

export const updateUserData = async (
  authToken: string,
  data: any,
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: '/users',
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    data,
    timeout: defaultTimeout,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error: any) {
    throw error.response;
  }
};

export const enrollUserToTournament = async (
  authToken: string,
  tournament_id: string,
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: `/users/enrollment/${tournament_id}`,
    method: 'POST',
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

export const declineUserToTournament = async (
  authToken: string,
  tournament_id: string,
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: `/users/declining/${tournament_id}`,
    method: 'DELETE',
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

export const userPlaysFootballGames = async (
  authToken: string,
  data: any,
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: '/users/plays',
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    data,
    timeout: defaultTimeout,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error: any) {
    throw error.response;
  }
};

export const recoverUserPasswordStepOne = async (
  data: any,
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: '/users/validation/password',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    timeout: defaultTimeout,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error: any) {
    throw error.response;
  }
};

export const recoverUserPasswordStepTwo = async (
  data: any,
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: '/users/password',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Api-Lambda-Key': apiKey,
    },
    data,
    timeout: defaultTimeout,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error: any) {
    throw error.response;
  }
};

export const sendOTPValidationCode = async (
  data: any,
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: '/users/otp/validation',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Lambda-Key': apiKey,
    },
    data,
    timeout: defaultTimeout,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error: any) {
    throw error.response;
  }
};

export const resendOTPValidationCode = async (
  data: any,
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: '/users/otp/resend',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Lambda-Key': apiKey,
    },
    data,
    timeout: defaultTimeout,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error: any) {
    throw error.response;
  }
};
