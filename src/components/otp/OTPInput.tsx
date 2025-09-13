import { forwardRef, useImperativeHandle, useRef } from 'react';

interface IOTPInputProps {
  value: string;
  index: number;
  isDisabled: boolean;
  onChange: (value: string) => void;
  onBackspace: (index: number) => void;
  onPaste: (
    index: number,
    event: React.ClipboardEvent<HTMLInputElement>,
  ) => void;
}

const OTPInput = forwardRef<HTMLInputElement, IOTPInputProps>(
  (
    {
      value = '',
      isDisabled = false,
      onChange = () => {},
      onBackspace = () => {},
      onPaste = () => {},
      index,
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value.replace(/[^0-9]/g, '');

      onChange(newValue);

      if (newValue.length === 1) {
        const nextInput = inputRef.current
          ?.nextElementSibling as HTMLInputElement;

        if (nextInput) {
          nextInput.focus();
        }
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Backspace' && value === '') {
        onBackspace(index);
      }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      onPaste(index, event);
    };

    return (
      <input
        ref={inputRef}
        className={`h-[50px] md:h-20 w-[50px] md:w-20 ${
          isDisabled ? 'bg-gray-color-3' : 'bg-white'
        } text-primary-color text-3xl text-center font-medium border-4 border-gray-color-2 rounded-xl md:rounded-2xl`}
        type="text"
        maxLength={1}
        inputMode="numeric"
        pattern="\d*"
        value={value}
        disabled={isDisabled}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      />
    );
  },
);

OTPInput.displayName = 'OTPInput';

export default OTPInput;
