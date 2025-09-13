import {
  ComponentColor,
  ButtonSize,
  ButtonVariant,
} from '@customtypes/components';
import ButtonLoader from '@components/loader/ButtonLoader';

interface IButtonProps {
  text: string;
  color?: ComponentColor;
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: any;
  hasFullWidth?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = ({
  text,
  color = 'primary',
  size = 'medium',
  variant = 'solid',
  icon,
  hasFullWidth = false,
  isDisabled = false,
  isLoading = false,
  onClick,
}: IButtonProps) => {
  const buttonColor = (color: ComponentColor, variant: ButtonVariant) => {
    let backgroundColor: string = '';
    let borderColor: string = '';

    const buttonBackgroundColor = {
      primary: 'bg-primary-color',
      secondary: 'bg-secondary-color',
      blue: 'bg-gradient-to-r from-blue-color-1 to-blue-color-2',
      green: 'bg-gradient-to-r from-green-color-1 to-green-color-2',
      yellow: 'bg-gradient-to-r from-yellow-color-1 to-yellow-color-2',
      orange: 'bg-gradient-to-r from-orange-color-1 to-orange-color-2',
      red: 'bg-gradient-to-r from-red-color-1 to-red-color-2',
      gray: 'bg-gray-color-1',
    };

    const buttonBorderColor = {
      primary: 'border border-primary-color',
      secondary: 'border border-secondary-color',
      blue: 'border border-blue-color-1',
      green: 'border border-green-color-1',
      yellow: 'border border-yellow-color-1',
      orange: 'border border-orange-color-1',
      red: ' border border-red-color-1',
      gray: 'border border-gray-color-1',
    };

    if (variant === 'solid') {
      backgroundColor = buttonBackgroundColor[color];
    }

    if (variant === 'bordered') {
      borderColor = buttonBorderColor[color];
    }

    if (isDisabled) {
      backgroundColor = 'bg-gray-color-2';
      borderColor = 'bg-gray-color-2';
    }

    return `${backgroundColor} ${borderColor}`;
  };

  const buttonSize = {
    small: 'h-9 px-4 md:h-10 md:px-6',
    medium: 'h-12 px-6 md:h-[56px] md:px-8',
    large: 'h-[86px] px-8 md:h-[88px] md:px-10',
  };

  const textButtonSize = {
    small: 'text-sm md:text-base',
    medium: 'text-base md:text-lg',
    large: 'text-lg md:text-xl',
  };

  return (
    <button
      className={`${buttonColor(color, variant)} ${buttonSize[size]} ${hasFullWidth ? 'w-full' : ''} flex items-center justify-center gap-4 rounded-full cursor-pointer transition-regular`}
      disabled={isDisabled}
      onClick={onClick}
    >
      <span aria-hidden="true" className={`invisible absolute`}>
        {icon}
        {text}
      </span>
      {isLoading ? (
        <ButtonLoader size={size} />
      ) : (
        <>
          {icon}
          <span
            className={`${isDisabled ? 'text-gray-color-2' : 'text-white'} ${textButtonSize[size]} font-medium`}
          >
            {text}
          </span>
        </>
      )}
    </button>
  );
};

export default Button;
