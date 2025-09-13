import { useState, useEffect } from 'react';

const useAuthStatus = () => {
  const [accessToken, setAccessToken] = useState<string>('default');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthProcessFinished, setIsAuthProcessFinished] =
    useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const expirationTime = localStorage.getItem('expirationTime');
    const now = Date.now();
    // const isTokenExpired = now > Number(expirationTime);
    const isTokenExpired = false;
    const isAuthenticated = accessToken && expirationTime && !isTokenExpired;

    if (isAuthenticated) {
      setAccessToken(accessToken);
      setIsAuthenticated(true);
    } else {
      setAccessToken('');
      setIsAuthenticated(false);
    }

    setIsAuthProcessFinished(true);
  }, []);

  return { accessToken, isAuthenticated, isAuthProcessFinished };
};

export default useAuthStatus;
