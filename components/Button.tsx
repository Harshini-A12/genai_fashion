import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center tracking-wide focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#FAF9F6] disabled:opacity-70 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#2D2D2D] text-white hover:bg-[#4A4A4A] shadow-md hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-[#E6D5B8] text-[#3D2E1E] hover:bg-[#D4C3A3] shadow-sm hover:shadow-md",
    outline: "border border-[#C1A17C] text-[#8C6B4A] hover:bg-[#FDFBF7] hover:border-[#A68868]",
    ghost: "bg-transparent text-[#666666] hover:text-[#2D2D2D] hover:bg-[#F0EFE9]"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />}
      {children}
    </button>
  );
};