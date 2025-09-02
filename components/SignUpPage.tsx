import React, { useState } from 'react';

interface SignUpPageProps {
  onSignUp: () => void;
  onSwitchToLogin: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Mock existing user for demonstration
    if (email === 'exists@example.com') {
      setError('An account with this email already exists.');
      return;
    }
    onSignUp();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface rounded-xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 10a2 2 0 00-2 2v.5a.5.5 0 00.5.5h15a.5.5 0 00.5-.5V16a2 2 0 00-2-2H4z" clipRule="evenodd" />
            </svg>
            <h1 className="text-3xl font-bold text-on-surface mt-3">Create Account</h1>
            <p className="text-on-surface-secondary mt-1">Join SmartSpend and take control of your finances.</p>
          </div>

          {error && (
            <div className="bg-danger/20 border border-danger text-danger px-4 py-3 rounded-md mb-6 text-center" role="alert">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-on-surface-secondary">Full Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                className="mt-1 block w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-on-surface shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-zinc-500 transition-colors duration-200" 
                placeholder="John Doe"
              />
            </div>
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
              <label htmlFor="password" className="block text-sm font-medium text-on-surface-secondary">Password</label>
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
              <label htmlFor="confirm-password" className="block text-sm font-medium text-on-surface-secondary">Confirm Password</label>
              <input 
                type="password" 
                name="confirm-password" 
                id="confirm-password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                Sign Up
              </button>
            </div>
          </form>
           <div className="text-center mt-6">
              <p className="text-sm text-on-surface-secondary">
                Already have an account?{' '}
                <button onClick={onSwitchToLogin} className="font-medium text-primary hover:underline focus:outline-none">
                  Sign In
                </button>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;