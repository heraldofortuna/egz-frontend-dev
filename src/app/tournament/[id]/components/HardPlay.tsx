import { useState } from 'react';
import { PlayResult } from '@customtypes/components';

interface IHardPlayProps {
  data: PlayResult;
  isPastGame: boolean;
  isDisabled?: boolean;
  onChange: (result: PlayResult) => void;
}

const HardPlay = ({
  data,
  isPastGame,
  isDisabled,
  onChange,
}: IHardPlayProps) => {
  const [result, setResult] = useState<PlayResult>(data);

  const handleChange = (name: string, value: number) => {
    if (isDisabled) return;

    const currentResult = {
      ...result,
      [name]: value,
    };

    setResult(currentResult);
    onChange(currentResult);
  };

  const handleIncrement = (name: 'localScore' | 'visitScore') => {
    if (isDisabled) return;

    const newValue = Math.min(result[name] + 1, 9);
    handleChange(name, newValue);
  };

  const handleDecrement = (name: 'localScore' | 'visitScore') => {
    if (isDisabled) return;

    const newValue = Math.max(result[name] - 1, 0);
    handleChange(name, newValue);
  };

  if (data.localScore === undefined || data.visitScore === undefined) {
    return (
      <div className="w-full h-10 md:h-[60px] flex items-center justify-center">
        <p className="text-center text-gray-color-1 text-lg md:text-xl font-medium">
          No jugó
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-10 md:h-[60px] grid grid-cols-2">
      {['localScore', 'visitScore'].map((name) => (
        <div
          key={name}
          className={`flex items-center justify-between border-r ${isPastGame ? 'border-gray-color-1' : 'border-blue-color-3'}`}
        >
          {isPastGame ? (
            <div className="w-1/3 h-full px-2"></div>
          ) : (
            <button
              type="button"
              className={`w-1/3 h-full px-2 text-lg md:text-2xl transition-regular hover:bg-primary-color ${isDisabled ? 'text-gray-color-1 cursor-default hover:!bg-transparent' : 'text-orange-color-1 cursor-pointer'}`}
              onClick={() =>
                handleDecrement(name as 'localScore' | 'visitScore')
              }
              disabled={isDisabled}
            >
              -
            </button>
          )}
          <input
            className={`h-full w-1/3 text-center text-lg sm:text-2xl font-medium bg-transparent ${isDisabled ? 'text-gray-color-1 cursor-default' : 'text-white cursor-pointer'}`}
            name={name}
            autoComplete="off"
            maxLength={1}
            inputMode="numeric"
            pattern="\d*"
            value={result[name as 'localScore' | 'visitScore']}
            onChange={(e) =>
              handleChange(
                name,
                Math.max(0, Math.min(9, Number(e.target.value))),
              )
            }
            disabled={isDisabled}
          />
          {isPastGame ? (
            <div className="w-1/3 h-full px-2"></div>
          ) : (
            <button
              type="button"
              className={`w-1/3 h-full px-2 text-lg md:text-2xl transition-regular hover:bg-primary-color ${isDisabled ? 'text-gray-color-1 cursor-default hover:!bg-transparent' : 'text-orange-color-1 cursor-pointer'}`}
              onClick={() =>
                handleIncrement(name as 'localScore' | 'visitScore')
              }
              disabled={isDisabled}
            >
              +
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default HardPlay;
