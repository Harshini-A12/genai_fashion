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
      <div className="w-full max-w-md bg-[#1e1e1e] p-8 rounded-2xl border border-[#2c2c2c] shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-[#a0a0a0] text-center mb-8">
          {mode === 'login' ? 'Enter your credentials to access your dashboard' : 'Join StyleAI to start your fashion journey'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
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

          <Button type="submit" isLoading={isLoading} className="w-full py-3 mt-4">
            {mode === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#a0a0a0] text-sm">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
            <button onClick={onSwitchMode} className="text-[#e0e0e0] font-medium hover:underline">
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};