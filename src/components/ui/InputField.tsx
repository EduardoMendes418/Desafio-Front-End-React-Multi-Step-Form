import React from 'react';
import { FieldError } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'password';
  error?: FieldError;
  register: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  error,
  register,
  onChange,
  required = false,
}) => {
  const inputClasses = `
    mt-1 block w-full rounded-md border-gray-300 shadow-sm 
    focus:border-blue-500 focus:ring-blue-500 border p-2
    transition-colors duration-200
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
  `;

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        type={type}
        {...register}
        onChange={onChange}
        className={inputClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${register.name}-error` : undefined}
      />
      
      {error && (
        <p 
          id={`${register.name}-error`}
          className="text-sm text-red-600 mt-1"
          role="alert"
        >
          {error.message}
        </p>
      )}
    </div>
  );
};