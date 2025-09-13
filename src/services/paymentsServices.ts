import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const defaultTimeout = Number(process.env.NEXT_PUBLIC_DEFAULT_TIMEOUT);

export const createCommissionAgent = async (
  authToken: string,
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: '/payments/commission-agent',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
      'Api-Lambda-Key': apiKey,
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

export const getCommissionAgentData = async (
  authToken: string,
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: '/payments/commission-agent',
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

export const requestPayCommission = async (
  commissionId: string,
  authToken: string,
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: `/payments/commission-agent/${commissionId}`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
      'Api-Lambda-Key': apiKey,
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

export const getCouponDiscount = async (
  code: string,
  authToken: string,
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: `/payments/coupon/${code}`,
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

export const payTournament = async (
  data: any,
  authToken: string,
): Promise<any> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: '/payments/',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    data,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error: any) {
    throw error;
  }
};
