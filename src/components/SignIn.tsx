import { useState } from 'react';
import { Music, Eye, EyeOff, LogIn } from 'lucide-react';
import { signIn } from '../utils/supabase.ts';
import { toast } from 'sonner';

interface SignInProps {
  onSignIn: (userData: any) => void;
  onSwitchToSignUp: () => void;
}

export function SignIn({ onSignIn, onSwitchToSignUp }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        toast.error('Sign in failed', {
          description: error.message
        });
        return;
      }

      if (data?.user) {
        toast.success('Signed in successfully!');
        onSignIn(data.user);
      }
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gradient-background">
      {/* Icon */}
      <div className="icon-container">
        <Music size={32} color="#8b5cf6" />
      </div>
      
      {/* Title */}
      <h1 className="page-title">Welcome to MusicConnect</h1>
      <p className="page-subtitle">Sign in to connect with musicians worldwide</p>
      
      {/* Card */}
      <div className="card">
        <h2 className="form-title">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email"
              className="form-input" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"}
                className="form-input" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
              <button
                type="button"
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="button button-primary w-full flex justify-center items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={onSwitchToSignUp} 
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              Sign Up
            </button>
          </p>
          <p className="mt-2">
            <button className="text-purple-600 hover:text-purple-800 text-sm">
              Forgot Password?
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}