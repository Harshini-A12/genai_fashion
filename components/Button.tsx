import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
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
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#121212]";
  
  const variants = {
    primary: "bg-[#e0e0e0] text-[#121212] hover:bg-white hover:shadow-lg hover:shadow-white/5 focus:ring-[#e0e0e0]",
    secondary: "bg-[#2a2a2a] text-[#e0e0e0] hover:bg-[#333333] focus:ring-[#333333]",
    outline: "border border-[#2c2c2c] text-[#a0a0a0] hover:text-[#e0e0e0] hover:border-[#e0e0e0] bg-transparent focus:ring-[#2c2c2c]"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${isLoading || disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};