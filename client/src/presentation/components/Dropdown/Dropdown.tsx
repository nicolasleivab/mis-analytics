import React, { useState } from 'react';
import * as styles from './Dropdown.module.css';
import { ChevronDownIcon, ChevronUpIcon } from '../../assets/icons';
import useOnClickOutside from '../../hooks/useOnClickOutside';

export interface TDropdownOption {
  id: string | number;
  label: string;
}

export interface TDropdownProps {
  label?: string;
  options: TDropdownOption[];
  id: string | number;
  onChange: (id: any) => void;
  width?: string;
  disabled?: boolean;
  placeholder?: string;
}

const Dropdown: React.FC<TDropdownProps> = ({
  label,
  options,
  id,
  onChange,
  width = '100%',
  disabled = false,
  placeholder = 'Select...',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (id: string | number) => {
    onChange(id);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option?.id === id);

  const ref = useOnClickOutside(() => setIsOpen(false));

  return (
    <div ref={ref} className={styles.DropdownWrapper} style={{ width }}>
      {label && <label className={styles.Label}>{label}</label>}
      <div
        className={`${styles.Dropdown} ${
          disabled ? styles.DropdownDisabled : ''
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        {isOpen ? (
          <ChevronUpIcon className={styles.CaretIcon} />
        ) : (
          <ChevronDownIcon className={styles.CaretIcon} />
        )}
      </div>
      {isOpen && !disabled && (
        <ul className={styles.OptionsList}>
          {options.map((option) => (
            <li
              key={option?.id}
              className={styles.OptionItem}
              onClick={() => handleOptionClick(option?.id)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
