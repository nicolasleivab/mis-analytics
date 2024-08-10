import React from 'react';
import * as styles from './Input.module.css';

export type TInputType = 'text' | 'number' | 'password' | 'email';

export interface TInputProps extends React.ComponentPropsWithRef<'input'> {
  label?: string;
  inputType?: TInputType;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  disabled?: boolean;
}

const Input: React.FC<TInputProps> = ({
  label,
  inputType = 'text',
  placeholder = '',
  value,
  onChange,
  width = '100%',
  disabled = false,
  ...rest
}) => {
  return (
    <div className={styles.InputWrapper} style={{ width }}>
      {label && <label className={styles.Label}>{label}</label>}
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={disabled ? styles.InputDisabled : styles.Input}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};

export default Input;
