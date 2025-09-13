import React, { useState, useEffect, useRef } from 'react';

interface CountDownProps {
  maxTime: number;
  onFinish: () => void;
  reset: boolean;
}

const CountDown: React.FC<CountDownProps> = ({ maxTime, onFinish, reset }) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [timeLeft, setTimeLeft] = useState<number>(maxTime);
  const [label, setLabel] = useState<string>('segundos');

  useEffect(() => {
    setTimeLeft(maxTime);
  }, [reset, maxTime]);

  useEffect(() => {
    if (timeLeft > 0) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(intervalRef.current!);
              intervalRef.current = null;
              onFinish();
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
      }

      if (timeLeft === 1) {
        setLabel('segundo');
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timeLeft, onFinish]);

  return (
    <div>
      <h1 className="text-sm md:text-base text-center text-yellow-color-2 font-regular">
        {timeLeft} {label}
      </h1>
    </div>
  );
};

export default CountDown;
