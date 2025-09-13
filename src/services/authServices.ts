import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from '@actions/axiosInstance';
import { IRegisterServiceData } from '@customtypes/services';
import { ILoginServiceData } from '@customtypes/services';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const defaultTimeout = Number(process.env.NEXT_PUBLIC_DEFAULT_TIMEOUT);

export const registerUser = async (
  data: IRegisterServiceData,
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: '/users/',
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

export const loginUser = async (
  step: number,
  data: ILoginServiceData,
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    baseURL,
    url: `/users/login/${step}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Api-Lambda-Key': apiKey,
    },
    data,
    timeout: defaultTimeout,
  };

  try {
    const response = await axiosInstance(config);

    return response;
  } catch (error: any) {
    throw error.response;
  }
};
