import confetti from 'canvas-confetti';
import { useEffect, useRef } from 'react';

const ConfettiAnimation = () => {
  const duration = 6 * 1000;
  const animationEnd = useRef(Date.now() + duration); // Usa una referencia para animationEnd
  const intervalRef = useRef<number | null>(null); // Usa una referencia para almacenar el intervalo

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    const handleConfetti = () => {
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
      };

      intervalRef.current = window.setInterval(() => {
        const timeLeft = animationEnd.current - Date.now();

        if (timeLeft <= 0 && intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          }),
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          }),
        );
      }, 250);
    };

    handleConfetti();

    // Limpiar el intervalo al desmontar el componente
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [duration]); // Solo depende de duration, ya que animationEnd es una referencia y no cambia

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default ConfettiAnimation;
