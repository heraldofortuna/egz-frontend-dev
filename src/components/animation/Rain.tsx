import React, { useEffect, useRef } from 'react';

const RainAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initial appearance (fade-in)
    canvas.style.opacity = '1';

    ctx.strokeStyle = 'rgba(174,194,224,0.5)';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    const init = [];
    const maxParts = 1000;

    for (let a = 0; a < maxParts; a++) {
      init.push({
        x: Math.random() * w,
        y: Math.random() * h,
        l: Math.random() * 1,
        xs: -4 + Math.random() * 4 + 2,
        ys: Math.random() * 10 + 10,
      });
    }

    const particles = init.map((p) => ({ ...p }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        ctx.stroke();
      });
      move();
    };

    const move = () => {
      particles.forEach((p) => {
        p.x += p.xs;
        p.y += p.ys;
        if (p.x > w || p.y > h) {
          p.x = Math.random() * w;
          p.y = -20;
        }
      });
    };

    const intervalId = setInterval(draw, 30);

    // Fade-out after 6 seconds
    const timeoutId = setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '0'; // Start fade-out transition
        setTimeout(() => {
          clearInterval(intervalId);
          canvasRef.current!.style.display = 'none';
        }, 1000); // Delay the removal to allow the fade-out to complete
      }
    }, 6000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0, // Start invisible
        transition: 'opacity 1s ease-in-out', // Smooth transition for fade-in and fade-out
      }}
    />
  );
};

export default RainAnimation;
