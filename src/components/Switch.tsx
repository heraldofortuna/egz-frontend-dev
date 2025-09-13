import React, { useState } from 'react';
import capitalize from '@actions/capitalize';

interface SwitchProps {
  value: string;
  options: string[];
  onChange: (selected: string) => void;
}

const Switch: React.FC<SwitchProps> = ({ value, options, onChange }) => {
  const [selected, setSelected] = useState<string>(value);

  const handleClick = (option: string) => {
    setSelected(option);
    onChange(option);
  };

  return (
    <div className="flex bg-primary-color rounded-full">
      {options.map((option: string) => (
        <button
          key={option}
          className={`flex-1 py-1 px-3 text-white text-center text-xs md:text-sm rounded-full transition-all ${
            selected === option
              ? 'bg-blue-color-3 shadow-md'
              : 'bg-transparent hover:bg-secondary-color'
          } ${option === options[0] ? 'rounded-r-none' : ''} ${option === options[1] ? 'rounded-l-none' : ''}`}
          onClick={() => handleClick(option)}
        >
          {capitalize(option)}
        </button>
      ))}
    </div>
  );
};

export default Switch;
