import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: any) => {
    const customError =
      error.response?.data?.detail?.message ||
      error.message ||
      'Ha ocurrido un error desconocido';

    return Promise.reject(customError);
  },
);

export default axiosInstance;
