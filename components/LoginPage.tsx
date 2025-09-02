import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
  onSwitchToSignUp: () => void;
  onSwitchToForgotPassword: () => void;
}

// Mock user data for demonstration purposes
const MOCK_USERS = [
    { email: 'user@example.com', password: 'password123' },
];

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchToSignUp, onSwitchToForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    const existingUser = MOCK_USERS.find(user => user.email === email);

    if (!existingUser) {
      setError('No account found with this email address.');
      return;
    }

    if (existingUser.password !== password) {
      setError('Incorrect password. Please try again.');
      return;
    }

    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface rounded-xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 10a2 2 0 00-2 2v.5a.5.5 0 00.5.5h15a.5.5 0 00.5-.5V16a2 2 0 00-2-2H4z" clipRule="evenodd" />
            </svg>
            <h1 className="text-3xl font-bold text-on-surface mt-3">SmartSpend</h1>
            <p className="text-on-surface-secondary mt-1">Welcome back! Sign in to continue.</p>
          </div>

          {error && (
            <div className="bg-danger/20 border border-danger text-danger px-4 py-3 rounded-md mb-6 text-center" role="alert">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-on-surface-secondary">Email Address</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="mt-1 block w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-on-surface shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-zinc-500 transition-colors duration-200" 
                placeholder="you@example.com"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-on-surface-secondary">Password</label>
                <button type="button" onClick={onSwitchToForgotPassword} className="text-sm font-medium text-primary hover:underline focus:outline-none">
                  Forgot Password?
                </button>
              </div>
              <input 
                type="password" 
                name="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="mt-1 block w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-on-surface shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-zinc-500 transition-colors duration-200" 
                placeholder="••••••••"
              />
            </div>
            <div>
              <button 
                type="submit" 
                className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-cyan-600 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background"
              >
                Sign In
              </button>
            </div>
          </form>
           <div className="text-center mt-6">
              <p className="text-sm text-on-surface-secondary">
                Don't have an account?{' '}
                <button onClick={onSwitchToSignUp} className="font-medium text-primary hover:underline focus:outline-none">
                  Sign Up
                </button>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
