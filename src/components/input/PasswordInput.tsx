import { forwardRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { InputType, InputVariant } from '@customtypes/components';

interface IPasswordInputProps {
  id: string;
  label?: string;
  variant?: InputVariant;
  orientation?: 'row' | 'column';
  placeholder?: string;
  hasFullWidth?: boolean;
  hasConfirmPassword?: boolean;
  canHasError?: boolean;
  disabled?: boolean;
  onChange?: any;
  onKeyDown?: any;
}

const PasswordInput = forwardRef<HTMLInputElement, IPasswordInputProps>(
  (
    {
      id = '',
      label = '',
      variant = 'normal',
      orientation = 'column',
      placeholder = '',
      hasFullWidth = false,
      hasConfirmPassword = false,
      canHasError = false,
      disabled = false,
      onChange = () => {},
      onKeyDown = () => {},
    },
    ref,
  ) => {
    const [data, setData] = useState<{
      password: {
        value: string;
        type: InputType;
        isValid: boolean;
        isShowed: boolean;
        isFocus: boolean;
        hasError: boolean;
      };
      confirmPassword: {
        value: string;
        type: InputType;
        isValid: boolean;
        isShowed: boolean;
        isFocus: boolean;
        hasError: boolean;
      };
    }>({
      password: {
        value: '',
        type: 'password',
        isValid: false,
        isShowed: false,
        isFocus: false,
        hasError: false,
      },
      confirmPassword: {
        value: '',
        type: 'password',
        isValid: false,
        isShowed: false,
        isFocus: false,
        hasError: false,
      },
    });

    const inputVariant = (
      variant: InputVariant,
      value: string,
      name: 'password' | 'confirmPassword',
    ) => {
      let inputBorder: string = '';

      if (variant === 'normal') {
        inputBorder = 'border-gray-color-2 focus:border-blue-color-1';
      }

      if (variant === 'light') {
        inputBorder = 'border-gray-color-2 focus:border-white';
      }

      if (value.length > 0 && !data[name].isFocus) {
        inputBorder = 'border-white';
      }

      return inputBorder;
    };

    const handleValidation = (
      passwordValue: string,
      confirmPasswordValue: string,
      name: string,
    ) => {
      let isValid = false;

      if (name === 'confirmPassword') {
        isValid = confirmPasswordValue === passwordValue;
      }

      if (name === 'password') {
        if (
          passwordValue.match(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
          )
        ) {
          isValid = true;
        }
      }

      return isValid;
    };

    const handleChangeInputValue = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const value = event.target.value;
      const name = event.target.name as 'password' | 'confirmPassword';

      let passwordValue: string = '';
      let confirmPasswordValue: string = '';
      let isPasswordValid: boolean = false;
      let isConfirmPasswordValid: boolean = false;

      if (name === 'password') {
        passwordValue = value;
        confirmPasswordValue = data.confirmPassword.value;
      }

      if (name === 'confirmPassword') {
        passwordValue = data.password.value;
        confirmPasswordValue = value;
      }

      isPasswordValid = handleValidation(
        passwordValue,
        confirmPasswordValue,
        'password',
      );
      isConfirmPasswordValid = handleValidation(
        passwordValue,
        confirmPasswordValue,
        'confirmPassword',
      );

      const currentData = {
        password: {
          ...data['password'],
          value: passwordValue,
          isValid: isPasswordValid,
          hasError: canHasError ? !isPasswordValid : false,
        },
        confirmPassword: {
          ...data['confirmPassword'],
          value: confirmPasswordValue,
          isValid: isConfirmPasswordValid,
          hasError: canHasError ? !isConfirmPasswordValid : false,
        },
      };

      setData(currentData);
      onChange(currentData);
    };

    const handleFocusInput = (name: 'password' | 'confirmPassword') => {
      setData({
        ...data,
        [name]: {
          ...data[name],
          isFocus: true,
        },
      });
    };

    const handleBlurInput = (name: 'password' | 'confirmPassword') => {
      setData({
        ...data,
        [name]: {
          ...data[name],
          isFocus: false,
        },
      });
    };

    const handleShowInput = (name: 'password' | 'confirmPassword') => {
      setData({
        ...data,
        [name]: {
          ...data[name],
          type: !data[name].isShowed ? 'text' : 'password',
          isShowed: !data[name].isShowed,
        },
      });
    };

    useEffect(() => {
      if (disabled) {
        setData({
          password: {
            ...data['password'],
            hasError: !disabled,
          },
          confirmPassword: {
            ...data['confirmPassword'],
            hasError: !disabled,
          },
        });
      }
    }, [data, disabled]);

    return (
      <div
        className={`flex flex-col ${orientation === 'row' ? 'md:flex-row' : ''} gap-6`}
      >
        <div className="flex flex-col gap-2 w-full">
          {label !== '' && (
            <label
              htmlFor="password"
              className={`text-sm font-light ${disabled ? 'text-gray-color-1' : ''}`}
            >
              {label}
            </label>
          )}
          <div className="relative flex items-center justify-between">
            <input
              ref={ref}
              id={id}
              name="password"
              className={`bg-transparent ${hasFullWidth ? 'w-full' : ''} pb-[8px] border-b transition-regular ${inputVariant(variant, data.password.value, 'password')} ${data.password.hasError ? 'border-red-color-2' : ''}`}
              type={data.password.type}
              placeholder={placeholder}
              value={data.password.value}
              maxLength={100}
              autoComplete={'off'}
              disabled={disabled}
              onChange={handleChangeInputValue}
              onFocus={() => handleFocusInput('password')}
              onBlur={() => handleBlurInput('password')}
              onKeyDown={onKeyDown}
            />
            <i
              className="absolute top-[2px] right-0 cursor-pointer"
              onClick={() => handleShowInput('password')}
            >
              <Image
                src={
                  data.password.isShowed
                    ? '/baseline-eye.svg'
                    : '/outline-eye.svg'
                }
                width={20}
                height={20}
                alt={placeholder}
              />
            </i>
          </div>
          {data.password.hasError && !data.password.isFocus ? (
            <span className="text-xs md:text-sm text-red-color-2">
              Le falta: 1 mayúscula, 1 número, 1 símbolo o tiene menos de 8
              caracteres
            </span>
          ) : (
            <></>
          )}
        </div>
        {hasConfirmPassword ? (
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="confirmPassword"
              className={`text-sm font-light ${disabled ? 'text-gray-color-1' : ''}`}
            >
              Confirmar contraseña
            </label>
            <div className="relative flex items-center justify-between">
              <input
                name="confirmPassword"
                className={`bg-transparent ${hasFullWidth ? 'w-full' : ''} pb-[8px] border-b transition-regular ${inputVariant(variant, data.confirmPassword.value, 'confirmPassword')} ${data.confirmPassword.hasError ? 'border-red-color-2' : ''}`}
                type={data.confirmPassword.type}
                placeholder="Confirme su contraseña"
                value={data.confirmPassword.value}
                maxLength={100}
                autoComplete={'off'}
                disabled={disabled}
                onChange={handleChangeInputValue}
                onFocus={() => handleFocusInput('confirmPassword')}
                onBlur={() => handleBlurInput('confirmPassword')}
                onKeyDown={onKeyDown}
              />
              <i
                className="absolute top-[2px] right-0 cursor-pointer"
                onClick={() => handleShowInput('confirmPassword')}
              >
                <Image
                  src={
                    data.confirmPassword.isShowed
                      ? '/baseline-eye.svg'
                      : '/outline-eye.svg'
                  }
                  width={20}
                  height={20}
                  alt={placeholder}
                />
              </i>
            </div>
            {data.confirmPassword.hasError && !data.confirmPassword.isFocus ? (
              <span className="text-xs md:text-sm text-red-color-2">
                No coincide con la contraseña
              </span>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
