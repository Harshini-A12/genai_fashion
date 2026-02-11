import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { User } from '../types';

interface AuthProps {
  mode: 'login' | 'signup';
  onAuthSuccess: (user: User) => void;
  onSwitchMode: () => void;
}

export const Auth: React.FC<AuthProps> = ({ mode, onAuthSuccess, onSwitchMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        id: crypto.randomUUID(),
        name: name || email.split('@')[0],
        email
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 backdrop-blur-xl relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F5E6E0] rounded-full blur-2xl opacity-50 pointer-events-none" />
        
        <div className="relative z-10">
            <h2 className="text-4xl font-serif font-bold text-[#2D2D2D] mb-3 text-center">
            {mode === 'login' ? 'Welcome Back' : 'Join StyleSense'}
            </h2>
            <p className="text-[#888888] text-center mb-10 font-light">
            {mode === 'login' ? 'Sign in to access your personal stylist' : 'Begin your journey to a better wardrobe'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
                <Input
                label="Full Name"
                type="text"
                placeholder="e.g. Audrey Hepburn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            )}
            <Input
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <Button type="submit" isLoading={isLoading} className="w-full py-4 mt-6 shadow-lg shadow-[#2D2D2D]/10">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
            </form>

            <div className="mt-8 text-center">
            <p className="text-[#888888] text-sm">
                {mode === 'login' ? "New here?" : "Already a member?"}{' '}
                <button onClick={onSwitchMode} className="text-[#C1A17C] font-semibold hover:underline">
                {mode === 'login' ? 'Create an account' : 'Log in'}
                </button>
            </p>
            </div>
        </div>
      </div>
    </div>
  );
};