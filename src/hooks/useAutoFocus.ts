import { useEffect, useRef } from 'react';

const useAutoFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, []);

  return inputRef;
};

export default useAutoFocus;
