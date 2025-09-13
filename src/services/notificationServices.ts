import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const defaultTimeout = Number(process.env.NEXT_PUBLIC_DEFAULT_TIMEOUT);

export const sendEmailService = async (data: any): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: '/notifications/email',
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
