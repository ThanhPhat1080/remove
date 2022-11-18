// Lib
import { InputHTMLAttributes, memo } from 'react';

export type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: InputHTMLAttributes<HTMLElement>['type'];
  placeholder?: string;
  errorMessage?: string;
  defaultValue?: string;
  size?: 'input-lg';
  minLength?: number;
};

export const Input = ({
  id = '',
  name,
  label = '',
  type = 'text',
  placeholder,
  errorMessage,
  defaultValue,
  size,
  minLength,
}: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className='input-label'>
        {label}
      </label>
      <div className='input-wrapper'>
        <input
          id={id}
          defaultValue={defaultValue}
          type={type}
          className={`input ${size}`}
          name={name}
          placeholder={placeholder}
          minLength={minLength}
        />
        {errorMessage && <small className='err-msg'>{errorMessage}</small>}
      </div>
    </div>
  );
};

export default memo(Input);
