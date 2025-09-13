import React, { FC } from 'react';

interface SkeletonProps {
  rounded?: number;
  className?: string;
}

const Skeleton: FC<SkeletonProps> = ({ rounded = 8, className = '' }) => {
  return (
    <div
      className={`bg-gray-color-3 opacity-10 animate-pulse ${className}`}
      style={{ borderRadius: `${rounded}px` }}
    ></div>
  );
};

export default Skeleton;
