import { ButtonSize } from '@customtypes/components';

interface IButtonLoaderProps {
  size?: ButtonSize;
}

const ButtonLoader = ({ size = 'medium' }: IButtonLoaderProps) => {
  const sizeClass = {
    small: 'buttonLoader--small',
    medium: 'buttonLoader--medium',
    large: 'buttonLoader--large',
  }[size];

  return <span className={`buttonLoader ${sizeClass}`}></span>;
};

export default ButtonLoader;
