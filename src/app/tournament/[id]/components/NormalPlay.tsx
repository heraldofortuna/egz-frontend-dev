import { PlayResult } from '@customtypes/components';

interface INormalPlayProps {
  data: any;
  isDisabled?: boolean;
  onChange: (result: PlayResult) => void;
}

const NormalPlay = ({ data, isDisabled, onChange }: INormalPlayProps) => {
  const { localScore, visitScore } = data;

  const handleClick = (event: any) => {
    if (isDisabled) return;

    const { value } = event.target;

    const goalsResult: { [result: string]: PlayResult } = {
      L: {
        id: data.id,
        type: 'NORMAL',
        localScore: 1,
        visitScore: 0,
      },
      E: {
        id: data.id,
        type: 'NORMAL',
        localScore: 1,
        visitScore: 1,
      },
      V: {
        id: data.id,
        type: 'NORMAL',
        localScore: 0,
        visitScore: 1,
      },
    };

    onChange(goalsResult[value]);
  };

  if (localScore === undefined || visitScore === undefined) {
    return (
      <div className="w-full h-10 md:h-[60px] flex items-center justify-center">
        <p className="text-center text-gray-color-1 text-lg md:text-xl font-medium">
          No jugó
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-10 md:h-[60px] grid grid-cols-3">
      <input
        className={`text-gray-color-1 bg-transparent text-center sm:text-xl px-4 border-r border-gray-color-1 last:border-r-0 ${localScore > visitScore ? 'text-white text-lg md:text-2xl font-medium' : ''} ${isDisabled ? 'cursor-default pointer-events-none' : 'cursor-pointer pointer-events-auto'}`}
        placeholder="0"
        autoComplete="off"
        maxLength={1}
        inputMode="numeric"
        pattern="\d*"
        readOnly
        value="L"
        onClick={(event) => handleClick(event)}
      />
      <input
        className={`text-gray-color-1 cursor-pointer bg-transparent text-center sm:text-xl px-4 border-r border-gray-color-1 last:border-r-0 ${localScore === visitScore ? 'text-white text-lg md:text-2xl font-medium' : ''} ${isDisabled ? 'cursor-default pointer-events-none' : 'cursor-pointer pointer-events-auto'}`}
        placeholder="0"
        autoComplete="off"
        maxLength={1}
        inputMode="numeric"
        pattern="\d*"
        readOnly
        value="E"
        onClick={(event) => handleClick(event)}
      />
      <input
        className={`text-gray-color-1 cursor-pointer bg-transparent text-center sm:text-xl px-4 border-r border-gray-color-1 last:border-r-0 ${localScore < visitScore ? 'text-white text-lg md:text-2xl font-medium' : ''} ${isDisabled ? 'cursor-default pointer-events-none' : 'cursor-pointer pointer-events-auto'}`}
        placeholder="0"
        autoComplete="off"
        maxLength={1}
        inputMode="numeric"
        pattern="\d*"
        readOnly
        value="V"
        onClick={(event) => handleClick(event)}
      />
    </div>
  );
};

export default NormalPlay;
