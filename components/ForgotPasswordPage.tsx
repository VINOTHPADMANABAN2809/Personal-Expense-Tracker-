import React, { useState } from 'react';

interface ForgotPasswordPageProps {
  onSwitchToLogin: () => void;
}

// Mock user data for demonstration purposes
const MOCK_USERS = [
    { email: 'user@example.com', password: 'password123' },
];

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    
    if (!email) {
      setMessage('Please enter your email address.');
      setIsError(true);
      return;
    }

    const existingUser = MOCK_USERS.find(user => user.email === email);
    
    if (!existingUser) {
        setMessage('No account is associated with this email address.');
        setIsError(true);
    } else {
        setMessage('If an account with this email exists, a password reset link has been sent.');
        setIsError(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface rounded-xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h1 className="text-3xl font-bold text-on-surface mt-3">Reset Password</h1>
            <p className="text-on-surface-secondary mt-1 text-center">Enter your email to receive a password reset link.</p>
          </div>

          {message && (
            <div className={`px-4 py-3 rounded-md mb-6 text-center ${isError ? 'bg-danger/20 text-danger border border-danger' : 'bg-secondary/20 text-secondary border border-secondary'}`} role="alert">
              <p>{message}</p>
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
              <button 
                type="submit" 
                className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background"
              >
                Send Reset Link
              </button>
            </div>
          </form>
           <div className="text-center mt-6">
              <p className="text-sm text-on-surface-secondary">
                Remember your password?{' '}
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

export default ForgotPasswordPage;