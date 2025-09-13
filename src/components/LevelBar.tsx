import React from 'react';
import Skeleton from '@components/Skeleton';

interface LevelBarProps {
  level: number;
  isLoading?: boolean;
}

const LevelBar: React.FC<LevelBarProps> = ({ level, isLoading = false }) => {
  const limitedLevel = Math.max(0, Math.min(level, 5));

  return isLoading ? (
    <Skeleton className="w-[140px] md:w-[272px] h-3 md:h-6" />
  ) : (
    <div className="flex space-x-1 md:space-x-2">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`w-6 md:w-12 h-3 md:h-6 rounded transition-colors duration-200 ${
            index < limitedLevel ? 'bg-green-color-2' : 'bg-white'
          }`}
        />
      ))}
    </div>
  );
};

export default LevelBar;
