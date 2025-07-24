import { useState } from 'react';
import { Button } from './ui/button.tsx';
import { Input } from './ui/input.tsx';
import { Textarea } from './ui/textarea.tsx';
import { Badge } from './ui/badge.tsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select.tsx';
import { Music, Guitar, Mic, Piano, Drum, MapPin, Star, ArrowRight, ArrowLeft } from 'lucide-react';

interface OnboardingData {
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

export function MusicianOnboarding({ onComplete }: MusicianOnboardingProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
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

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(data);
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
        return data.name.trim() && data.username.trim();
      case 2:
        return data.instruments.length > 0;
      case 3:
        return data.genres.length > 0;
      case 4:
        return data.location.trim();
      default:
        return false;
    }
  };

  const totalSteps = 4;
  
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
        {[1, 2, 3, 4].map((s, i) => (
          <div key={s} style={{display: 'flex', alignItems: 'center'}}>
            <div className={`step ${s === step ? 'step-active' : s < step ? 'step-completed' : 'step-inactive'}`}>
              {s}
            </div>
            {i < 3 && <div className="step-line"></div>}
          </div>
        ))}
      </div>
      
      {/* Card */}
      <div className="card">
        {step === 1 && (
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

        {step === 2 && (
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

        {step === 3 && (
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

        {step === 4 && (
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
            disabled={!isStepValid()}
          >
            {step === 4 ? 'Complete' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}