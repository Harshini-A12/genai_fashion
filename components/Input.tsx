import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full group">
      {label && <label className="block text-sm font-medium text-[#666666] mb-2 uppercase tracking-wider text-xs">{label}</label>}
      <input
        className={`w-full bg-white border ${error ? 'border-red-300' : 'border-[#E0E0E0]'} rounded-xl px-5 py-3 text-[#2D2D2D] placeholder-[#A0A0A0] shadow-sm transition-all duration-300 focus:outline-none focus:border-[#C1A17C] focus:ring-1 focus:ring-[#C1A17C] group-hover:border-[#C1A17C]/50 ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400 font-medium">{error}</p>}
    </div>
  );
};