import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => {
  return (
    <div className="w-full group">
      {label && <label className="block text-sm font-medium text-[#666666] mb-2 uppercase tracking-wider text-xs">{label}</label>}
      <div className="relative">
        <select
          className={`w-full bg-white border border-[#E0E0E0] rounded-xl px-5 py-3 text-[#2D2D2D] appearance-none shadow-sm transition-all duration-300 focus:outline-none focus:border-[#C1A17C] focus:ring-1 focus:ring-[#C1A17C] cursor-pointer group-hover:border-[#C1A17C]/50 ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#C1A17C]">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};