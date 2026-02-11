import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">{label}</label>}
      <input
        className={`w-full bg-[#2a2a2a] border ${error ? 'border-red-500' : 'border-[#2c2c2c]'} rounded-lg px-4 py-2.5 text-[#e0e0e0] placeholder-[#666666] focus:outline-none focus:border-[#e0e0e0] focus:ring-1 focus:ring-[#e0e0e0] transition-colors ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};