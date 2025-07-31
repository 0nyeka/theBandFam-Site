import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Music, Eye, EyeOff, UserPlus } from 'lucide-react';
import { signUp, createProfile } from '../utils/supabase.ts';
import { Button } from './ui/button.tsx';
import { Input } from './ui/input.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select.tsx';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [musicianType, setMusicianType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      // User metadata for auth
      const userData = {
        display_name: displayName,
        musician_type: musicianType
      };

      // Sign up the user
      const { data, error } = await signUp(email, password, userData);
      
      if (error) {
        setError(error.message);
      } else if (data.user) {
        // Create profile in profiles table
        const profileData = {
          display_name: displayName,
          bio: "",
          location: "",
          availability_status: 'available',
          profile_image_url: ""
        };
        
        await createProfile(data.user.id, profileData);
        
        // Successful sign up
        navigate('/welcome');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homepage-container">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-left">
          <div 
            className="logo clickable-logo"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <Music className="h-6 w-6" style={{color: 'var(--accent-color)'}} />
            <span>theBandFam</span>
          </div>
        </div>
        
        <div className="nav-right">
          <div className="auth-buttons">
            <Link to="/signin">
              <button className="action-btn">Sign In</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ 
        minHeight: 'calc(100vh - 80px)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '500px',
          background: 'var(--card-bg)',
          borderRadius: '12px',
          padding: '40px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              padding: '16px',
              borderRadius: '50%',
              background: 'var(--sidebar-bg)',
              display: 'inline-flex',
              marginBottom: '16px'
            }}>
              <Music className="h-8 w-8" style={{color: 'var(--accent-color)'}} />
            </div>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              margin: '0 0 8px 0'
            }}>
              Create your account
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '16px',
              margin: 0
            }}>
              Join theBandFam to find collaborators and grow your music network
            </p>
          </div>

          {error && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              borderRadius: '8px',
              marginBottom: '24px',
              fontSize: '14px',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: 'calc(100% - 30px)',
                  padding: '12px 16px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                Display Name
              </label>
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="How others will see you"
                required
                style={{
                  width: 'calc(100% - 30px)',
                  padding: '12px 16px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                I am a...
              </label>
              <Select value={musicianType} onValueChange={setMusicianType}>
                <SelectTrigger style={{
                  width: 'calc(100% + 5px)',
                  padding: '7px 16px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)'
                }}>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vocalist">Vocalist</SelectItem>
                  <SelectItem value="guitarist">Guitarist</SelectItem>
                  <SelectItem value="bassist">Bassist</SelectItem>
                  <SelectItem value="drummer">Drummer</SelectItem>
                  <SelectItem value="pianist">Pianist/Keyboardist</SelectItem>
                  <SelectItem value="producer">Producer</SelectItem>
                  <SelectItem value="songwriter">Songwriter</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  required
                  minLength={8}
                  style={{
                    width: 'calc(100% - 60px)',
                    padding: '12px 45px 12px 16px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    backgroundColor: 'var(--card-bg)',
                    color: 'var(--text-primary)'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    padding: '4px'
                  }}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p style={{
                fontSize: '12px',
                color: 'var(--text-secondary)',
                margin: '4px 0 0 0'
              }}>
                Must be at least 8 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="post-btn"
              style={{
                width: '100%',
                padding: '14px 24px',
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '8px',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" /> Sign Up
                </>
              )}
            </button>
          </form>

          <div style={{
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '14px'
          }}>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Already have an account?{' '}
              <Link 
                to="/signin" 
                style={{
                  color: 'var(--accent-color)',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;