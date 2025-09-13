import { forwardRef, useRef, useState, useEffect, use } from 'react';
import Image from 'next/image';
import {
  DropdownElementData,
  DropdownData,
  DropdownVariant,
} from '@customtypes/components';

interface IDropdownProps {
  data: DropdownData;
  label: string;
  variant?: DropdownVariant;
  currentValue?: number;
  isOpen: any;
  onChange?: (value: string, isValid: boolean) => void;
}

const Dropdown = forwardRef<HTMLInputElement, IDropdownProps>(
  (
    {
      data,
      label,
      variant = 'normal',
      currentValue = 0,
      isOpen,
      onChange = () => {},
    },
    ref,
  ) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [value, setValue] = useState<DropdownElementData>(data[0]);
    const [filteredData, setFilteredData] = useState<DropdownData>(data);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const dropdownVariant = (variant: DropdownVariant) => {
      let variantBorder: string = '';

      if (variant === 'normal') {
        variantBorder = 'border-gray-color-2 hover:border-blue-color-1';
      }

      if (variant === 'light') {
        variantBorder = 'border-gray-color-2 hover:border-white';
      }

      if (value.id !== 0) {
        variantBorder = 'border-white';
      }

      return variantBorder;
    };

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const selectDropdownItem = (itemId: number) => {
      const selectedItem = data.find((item: any) => item.id === itemId);

      setIsDropdownOpen(false);

      if (selectedItem) {
        setValue(selectedItem);
        onChange(selectedItem.name, selectedItem !== data[0]);
      }
    };

    useEffect(() => {
      const filteredDataList = data.filter(
        (item: any) => item.id !== value.id && item.id !== 0,
      );

      setFilteredData(filteredDataList);
    }, [data, value]);

    useEffect(() => {
      isOpen(isDropdownOpen);
    }, [isDropdownOpen, isOpen]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);

    useEffect(() => {
      setValue(data[currentValue]);
    }, [data, currentValue]);

    return (
      <div className="flex flex-col gap-2">
        {label && label.length > 0 ? (
          <label className="text-sm font-light">{label}</label>
        ) : (
          <></>
        )}
        <div
          ref={dropdownRef}
          className={`dropdown relative bg-transparent w-full cursor-pointer`}
          onClick={toggleDropdown}
        >
          <span
            className={`dropdownInput ${value.id === 0 || isDropdownOpen ? 'text-gray-color-4' : 'text-white'} block w-full bg-transparent pb-[8px] border-b transition-regular cursor-pointer hover:text-white ${dropdownVariant(variant)}`}
            onChange={() => {}}
          >
            {value.name}
          </span>
          <span className="dropdownIcon block absolute top-[2px] right-[2px] opacity-25">
            {isDropdownOpen ? (
              <Image
                src="/arrow-up.svg"
                width={20}
                height={20}
                alt="Selector de items"
              />
            ) : (
              <Image
                src="/arrow-down.svg"
                width={20}
                height={20}
                alt="Selector de items"
              />
            )}
          </span>
          {isDropdownOpen && (
            <div
              className={`absolute w-full top-[28px] z-10 ${isDropdownOpen ? 'opacity-100' : 'opacity-0'} transition-regular`}
            >
              <ul className="flex flex-col">
                {filteredData.map((item: any) => (
                  <li
                    key={item.id}
                    className={`${dropdownVariant(variant)} border-b transition-regular p-[8px] pl-0 cursor-pointer`}
                    onClick={() => selectDropdownItem(item.id)}
                  >
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
