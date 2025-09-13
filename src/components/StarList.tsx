import Image from 'next/image';
import Skeleton from '@components/Skeleton';

interface IStarListProps {
  id: string;
  level?: number;
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

const StarList = ({
  id,
  level = 1,
  isLoading = false,
  size = 'medium',
}: IStarListProps) => {
  const maxStars = 3;

  const sizeClasses = {
    small: 'w-4 h-4 md:w-8 md:h-8',
    medium: 'w-6 h-6 md:w-10 md:h-10',
    large: 'w-8 h-8 md:w-12 md:h-12',
  };

  return isLoading ? (
    <Skeleton
      className={`${
        size === 'small'
          ? 'w-16 h-4 md:w-24 md:h-6'
          : 'w-24 h-6 md:w-40 md:h-12'
      }`}
    />
  ) : (
    <ul className="flex items-center gap-2">
      {Array.from({ length: maxStars }, (_, index) => (
        <li key={`star-${id}-${index}`} className={sizeClasses[size]}>
          <Image
            src={index < level ? '/star.svg' : '/star-outline.svg'}
            width={32}
            height={32}
            alt={index < level ? 'Estrella llena' : 'Estrella contorno'}
          />
        </li>
      ))}
    </ul>
  );
};

export default StarList;
