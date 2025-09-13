import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from 'react';
import OTPInput from '@components/otp/OTPInput';

export interface IOTPHandle {
  focusFirstInput: () => void;
}

interface IOTPProps {
  isReseted: boolean;
  isDisabled: boolean;
  onChange: (value: string[]) => void;
}

const OTP = forwardRef<IOTPHandle, IOTPProps>(
  ({ isReseted = false, isDisabled = false, onChange = () => {} }, ref) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleInputChange = (index: number, value: string) => {
      const updatedOtp = [...otp];

      updatedOtp[index] = value;

      setOtp(updatedOtp);
      onChange(updatedOtp);
    };

    const handleBackspace = (index: number) => {
      if (index > 0) {
        const prevIndex = index - 1;
        const updatedOtp = [...otp];

        updatedOtp[index] = '';

        setOtp(updatedOtp);

        inputRefs.current[prevIndex]?.focus();
      }
    };

    const handlePaste = (
      index: number,
      event: React.ClipboardEvent<HTMLInputElement>,
    ) => {
      event.preventDefault();

      const pasteData = event.clipboardData
        .getData('text')
        .slice(0, 4)
        .replace(/[^0-9]/g, '');
      const updatedOtp = [...otp];

      for (let i = 0; i < pasteData.length && i + index < otp.length; i++) {
        updatedOtp[i + index] = pasteData[i];
      }

      setOtp(updatedOtp);
      onChange(updatedOtp);

      const nextIndex = Math.min(index + pasteData.length, otp.length - 1);

      inputRefs.current[nextIndex]?.focus();
    };

    useEffect(() => {
      setOtp(['', '', '', '']);
    }, [isReseted]);

    useImperativeHandle(ref, () => ({
      focusFirstInput: () => {
        inputRefs.current[0]?.focus();
      },
    }));

    return (
      <div className="flex items-center justify-center gap-2 md:gap-4">
        {otp.map((value, index) => (
          <OTPInput
            ref={(el: any) => (inputRefs.current[index] = el)}
            key={index}
            value={value}
            index={index}
            isDisabled={isDisabled}
            onChange={(newValue) => handleInputChange(index, newValue)}
            onBackspace={handleBackspace}
            onPaste={handlePaste}
          />
        ))}
      </div>
    );
  },
);

OTP.displayName = 'OTP';

export default OTP;
