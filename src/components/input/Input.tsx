import { forwardRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { InputType, InputVariant } from '@customtypes/components';
import Skeleton from '@components/Skeleton';

interface IInputProps {
  name: string;
  defaultValue?: string;
  label?: string;
  type?: InputType;
  variant?: InputVariant;
  placeholder?: string;
  autocapitalize?: string;
  hasFullWidth?: boolean;
  canHasError?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onChange?: (value: string, isValid: boolean) => void;
  onKeyDown?: any;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      name,
      defaultValue = '',
      label = '',
      type = 'text',
      variant = 'normal',
      placeholder = '',
      autocapitalize = 'sentences',
      hasFullWidth = false,
      canHasError = false,
      isDisabled = false,
      isLoading = false,
      onChange = () => {},
      onKeyDown = () => {},
    },
    ref,
  ) => {
    const [value, setValue] = useState<string>(defaultValue);
    const [currentType, setCurrentType] = useState<InputType>(type);
    const [maxLength, setMaxLength] = useState<number>(100);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isShowedPassword, setIsShowedPassword] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);

    const inputVariant = (variant: InputVariant) => {
      let inputBorder: string = '';

      if (variant === 'normal') {
        inputBorder = 'border-gray-color-2 focus:border-blue-color-1';
      }

      if (variant === 'light') {
        inputBorder = 'border-gray-color-2 focus:border-white';
      }

      if (value.length > 0 && !isFocused) {
        inputBorder = 'border-white';
      }

      return inputBorder;
    };

    const handleValidation = (value: string, type: InputType) => {
      let isValid = false;

      if (type === 'name') {
        if (value.match(/^[a-zA-Z\s]*$/)) {
          isValid = true;
        }
      }

      if (type === 'text') {
        if (value.length > 0) {
          isValid = true;
        }
      }

      if (type === 'email') {
        if (value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          isValid = true;
        }
      }

      if (type === 'password') {
        if (
          value.match(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
          )
        ) {
          isValid = true;
        }
      }

      if (type === 'phone') {
        if (value.match(/^[0-9\b]+$/) && value.length === 9) {
          isValid = true;
        }
        setMaxLength(9);
      }

      if (type === 'date') {
        if (value.length > 0) {
          isValid = true;
        }
      }

      if (type === 'document') {
        if (value.match(/^[0-9\b]+$/) && value.length === 8) {
          isValid = true;
        }
        setMaxLength(8);
      }

      if (type === 'coupon') {
        if (value.match(/^[a-zA-Z0-9]*$/) && value.length === 6) {
          isValid = true;
        }
        setMaxLength(6);
      }

      if (type === 'yapeCode') {
        if (value.match(/^[0-9\b]+$/) && value.length === 6) {
          isValid = true;
        }
        setMaxLength(6);
      }

      return isValid;
    };

    const handleValidateValue = (value: string, type: InputType) => {
      let currentValue = value;
      let isValidValue = false;

      if (type === 'name') {
        if (value.match(/^[a-zA-Z\s]*$/)) {
          isValidValue = true;
        }
      }

      if (type === 'text') {
        isValidValue = true;
      }

      if (type === 'email') {
        isValidValue = true;
      }

      if (type === 'password') {
        isValidValue = true;
      }

      if (type === 'phone') {
        if ((value.match(/^[0-9\b]+$/) && value[0] === '9') || value === '') {
          isValidValue = true;
        }
      }

      if (type === 'date') {
        isValidValue = true;
      }

      if (type === 'document') {
        if (value.match(/^[0-9\b]+$/) || value === '') {
          isValidValue = true;
        }
      }

      if (type === 'coupon') {
        if (value.match(/^[a-zA-Z0-9]*$/)) {
          isValidValue = true;
        }
      }

      if (type === 'yapeCode') {
        if (value.match(/^[0-9\b]+$/) || value === '') {
          isValidValue = true;
        }
      }

      return { currentValue, isValidValue };
    };

    const handleChangeInputValue = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const value = event.target.value;
      const { currentValue, isValidValue } = handleValidateValue(value, type);
      const isValid = handleValidation(value, type);

      if (!isValidValue) return;

      setValue(currentValue);
      setHasError(!isValid);

      onChange(currentValue, isValid);
    };

    const handleFocusInput = () => {
      setIsFocused(true);
    };

    const handleBlurInput = () => {
      setIsFocused(false);
    };

    const handleShowPasswordInput = () => {
      setIsShowedPassword(!isShowedPassword);
    };

    useEffect(() => {
      if (type === 'password') {
        if (isShowedPassword) {
          setCurrentType('text');
        } else {
          setCurrentType('password');
        }
      }
    }, [isShowedPassword, currentType, type]);

    useEffect(() => {
      switch (type) {
        case 'text':
          setErrorMessage('Error en el formato del texto');
          break;
        case 'email':
          setErrorMessage('Error en el formato del correo');
          break;
        case 'password':
          setErrorMessage(
            'Le falta: 1 mayúscula, 1 número, 1 símbolo o tiene menos de 8 caracteres',
          );
          break;
        case 'phone':
          setErrorMessage('Error en el formato de teléfono');
          break;
        case 'date':
          setErrorMessage('Error en el formato de fecha');
          break;
        case 'document':
          setErrorMessage('Error en el formato de documento');
          break;
        case 'coupon':
          setErrorMessage(
            'Solo se permiten letras y números, con 6 caracteres',
          );
          break;
        case 'yapeCode':
          setErrorMessage('Solo se permiten números, con 6 caracteres');
          break;
        default:
          setErrorMessage('');
      }
    }, [type]);

    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);

    /* Lógica que permite la existencia del mensaje de error */
    useEffect(() => {
      if (canHasError) {
        setHasError(hasError);
      } else {
        setHasError(false);
      }
    }, [canHasError, hasError]);

    /* Lógica que permite elimina el mensaje de error si el componente está deshabilitado */
    useEffect(() => {
      if (isDisabled) {
        setHasError(!isDisabled);
      }
    }, [isDisabled]);

    return (
      <div className="flex flex-col gap-2">
        {label !== '' && (
          <label
            htmlFor={name}
            className={`text-sm font-light ${isDisabled ? 'text-gray-color-4' : ''}`}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center justify-between">
          {isLoading ? (
            <Skeleton className="w-full md:w-[200px] h-[29px]" />
          ) : (
            <>
              <input
                ref={ref}
                id={name}
                name={name}
                className={`bg-transparent ${hasFullWidth ? 'w-full' : ''} pb-2 rounded-none border-b transition-regular ${isDisabled ? 'text-gray-color-3' : 'text-white'} ${inputVariant(variant)} ${hasError ? 'border-red-color-2' : ''} ${type === 'date' && (isFocused || value.length > 0) ? 'date-input--has-value' : ''}`}
                type={currentType}
                placeholder={placeholder}
                value={value}
                maxLength={maxLength}
                disabled={isDisabled}
                autoCapitalize={autocapitalize}
                onChange={handleChangeInputValue}
                onFocus={handleFocusInput}
                onBlur={handleBlurInput}
                onKeyDown={onKeyDown}
                {...(type === 'phone' ||
                type === 'document' ||
                type === 'yapeCode'
                  ? { inputMode: 'numeric', pattern: '\\d*' }
                  : {})}
              />
              {type === 'password' ? (
                <i
                  className="absolute top-[2px] right-0 cursor-pointer"
                  onClick={handleShowPasswordInput}
                >
                  <Image
                    src={
                      isShowedPassword
                        ? '/baseline-eye.svg'
                        : '/outline-eye.svg'
                    }
                    width={20}
                    height={20}
                    alt={placeholder}
                  />
                </i>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
        {type === 'phone' && !isDisabled ? (
          <span className="text-xs md:text-sm text-gray-color-3">
            * Recuerde comenzar con el &quot;9&quot;
          </span>
        ) : (
          <></>
        )}
        {hasError && !isFocused ? (
          <span className="text-xs md:text-sm text-red-color-2">
            {errorMessage}
          </span>
        ) : (
          <></>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
