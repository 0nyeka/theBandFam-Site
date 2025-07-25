import { useState } from 'react';
import { Button } from './ui/button.tsx';
import { Input } from './ui/input.tsx';
import { Textarea } from './ui/textarea.tsx';
import { Badge } from './ui/badge.tsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select.tsx';
import { Music, Guitar, Mic, Piano, Drum, MapPin, Star, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { signUp } from '../utils/supabase.ts';
import { toast } from 'sonner';

interface OnboardingData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  instruments: string[];
  genres: string[];
  experience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  location: string;
}

interface MusicianOnboardingProps {
  onComplete: (data: OnboardingData) => void;
  onSwitchToSignIn?: () => void; // Add this prop
}

const INSTRUMENTS = [
  'Guitar', 'Bass', 'Drums', 'Piano', 'Keyboard', 'Violin', 'Cello', 'Saxophone',
  'Trumpet', 'Flute', 'Vocals', 'Ukulele', 'Mandolin', 'Banjo', 'Harmonica',
  'Clarinet', 'Trombone', 'Accordion', 'Harp', 'Percussion', 'Synthesizer', 'DJ'
];

const GENRES = [
  'Rock', 'Pop', 'Jazz', 'Blues', 'Country', 'Folk', 'Classical', 'Alternative',
  'Indie', 'Electronic', 'Hip Hop', 'R&B', 'Soul', 'Funk', 'Reggae', 'Punk',
  'Metal', 'Progressive', 'Fusion', 'World', 'Experimental', 'Ambient'
];

export function MusicianOnboarding({ onComplete, onSwitchToSignIn }: MusicianOnboardingProps) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    username: '',
    bio: '',
    avatar: '',
    instruments: [],
    genres: [],
    experience: 'Beginner',
    location: ''
  });

  const handleInstrumentToggle = (instrument: string) => {
    setData(prev => ({
      ...prev,
      instruments: prev.instruments.includes(instrument)
        ? prev.instruments.filter(i => i !== instrument)
        : [...prev.instruments, instrument]
    }));
  };

  const handleGenreToggle = (genre: string) => {
    setData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleNext = async () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Final step - create account
      await handleCreateAccount();
    }
  };

  const handleCreateAccount = async () => {
    setIsLoading(true);
    
    try {
      const userData = {
        name: data.name,
        username: data.username,
        bio: data.bio,
        instruments: data.instruments,
        genres: data.genres,
        experience: data.experience,
        location: data.location
      };

      const { data: authData, error } = await signUp(data.email, data.password, userData);
      
      if (error) {
        toast.error('Account creation failed', {
          description: error.message
        });
        return;
      }

      if (authData.user) {
        toast.success('Account created successfully!', {
          description: 'Please check your email to verify your account.'
        });
        onComplete(data);
      }
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return data.email.trim() && 
               data.password.length >= 6 && 
               data.password === data.confirmPassword;
      case 2:
        return data.name.trim() && data.username.trim();
      case 3:
        return data.instruments.length > 0;
      case 4:
        return data.genres.length > 0;
      case 5:
        return data.location.trim();
      default:
        return false;
    }
  };

  const totalSteps = 5;
  
  return (
    <div className="gradient-background">
      {/* Icon */}
      <div className="icon-container">
        <Music size={32} color="#8b5cf6" />
      </div>
      
      {/* Title */}
      <h1 className="page-title">Welcome to MusicConnect</h1>
      <p className="page-subtitle">Connect, collaborate, and create with musicians worldwide</p>
      
      {/* Stepper */}
      <div className="stepper">
        {[1, 2, 3, 4, 5].map((s, i) => (
          <div key={s} style={{display: 'flex', alignItems: 'center'}}>
            <div className={`step ${s === step ? 'step-active' : s < step ? 'step-completed' : 'step-inactive'}`}>
              {s}
            </div>
            {i < 4 && <div className="step-line"></div>}
          </div>
        ))}
      </div>
      
      {/* Card */}
      <div className="card">
        {step === 1 && (
          <>
            <h2 className="form-title">Create your account</h2>
            <form>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email"
                  className="form-input" 
                  placeholder="Enter your email" 
                  value={data.email} 
                  onChange={(e) => setData({...data, email: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? "text" : "password"}
                    className="form-input" 
                    placeholder="Create a secure password" 
                    value={data.password} 
                    onChange={(e) => setData({...data, password: e.target.value})} 
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
                <small style={{ color: '#666', fontSize: '12px' }}>
                  Password must be at least 6 characters long
                </small>
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-input" 
                    placeholder="Confirm your password" 
                    value={data.confirmPassword} 
                    onChange={(e) => setData({...data, confirmPassword: e.target.value})} 
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {data.password && data.confirmPassword && data.password !== data.confirmPassword && (
                  <small style={{ color: '#ef4444', fontSize: '12px' }}>
                    Passwords do not match
                  </small>
                )}
              </div>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="form-title">Tell us about yourself</h2>
            <form>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  className="form-input" 
                  placeholder="Enter your full name" 
                  value={data.name} 
                  onChange={(e) => setData({...data, name: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input 
                  className="form-input" 
                  placeholder="@yourusername" 
                  value={data.username} 
                  onChange={(e) => setData({...data, username: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Bio (Optional)</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Tell other musicians about yourself..." 
                  value={data.bio} 
                  onChange={(e) => setData({...data, bio: e.target.value})} 
                />
              </div>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="form-title">What instruments do you play?</h2>
            <div className="instrument-grid">
              {INSTRUMENTS.map(instrument => (
                <div 
                  key={instrument}
                  className={`instrument-item ${data.instruments.includes(instrument) ? 'selected' : ''}`}
                  onClick={() => handleInstrumentToggle(instrument)}
                >
                  {instrument}
                </div>
              ))}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="form-title">What genres do you prefer?</h2>
            <div className="genre-grid">
              {GENRES.map(genre => (
                <div 
                  key={genre}
                  className={`genre-item ${data.genres.includes(genre) ? 'selected' : ''}`}
                  onClick={() => handleGenreToggle(genre)}
                >
                  {genre}
                </div>
              ))}
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="form-title">Almost done!</h2>
            <div className="form-group">
              <label className="form-label">Your experience level</label>
              <select
                className="form-select"
                value={data.experience}
                onChange={(e) => setData({...data, experience: e.target.value as any})}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Your location</label>
              <input 
                className="form-input" 
                placeholder="City, Country" 
                value={data.location} 
                onChange={(e) => setData({...data, location: e.target.value})} 
              />
            </div>
          </>
        )}

        <div className="button-container">
          <button 
            type="button" 
            className="button button-back"
            disabled={step === 1}
            onClick={handleBack}
          >
            ← Back
          </button>
          <button 
            type="button" 
            className="button button-next"
            onClick={handleNext}
            disabled={!isStepValid() || isLoading}
          >
            {isLoading ? 'Creating Account...' : step === 5 ? 'Create Account' : 'Next →'}
          </button>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={onSwitchToSignIn} 
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}