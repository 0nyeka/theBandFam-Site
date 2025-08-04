import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Music, Users, MessageSquare, Calendar, Search, Play, Heart, Star, Sparkles, Guitar, Mic, Volume2, Headphones, Radio } from 'lucide-react';
import { signOut } from '../utils/supabase';
import '../styles/components/HomePage.css';

//Users should still be able to access the homepage without being signed in, so we will not require a user prop here.
interface HomePageProps {
  user?: any; // User object from Supabase Auth
}

const HomePage = ({ user }: HomePageProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  return (
    <div className="homepage-container">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-left">
          <div className="logo">
            <Music className="h-6 w-6" style={{color: 'var(--accent-color)'}} />
            <span>theBandFam</span>
          </div>
          
          {/* Add navigation links */}
          <div className="nav-links" style={{
            display: 'flex',
            gap: '24px',
            marginLeft: '32px',
            alignItems: 'center'
          }}>
            <Link 
              to="/" 
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--accent-color)')}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--text-primary)')}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--accent-color)')}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--text-primary)')}
            >
              About
            </Link>
          </div>
        </div>
        
        <div className="nav-right">
          {!user ? (
            <div className="auth-buttons">
              <Link to="/signin">
                <button className="action-btn">Sign In</button>
              </Link>
              <Link to="/signup">
                <button className="post-btn">Get Started</button>
              </Link>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/dashboard">
                <button className="post-btn">Dashboard</button>
              </Link>
              <button className="action-btn" onClick={handleSignOut}>Sign Out</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Connect. Collaborate. Create.
              <Guitar size={36} style={{
                color: 'var(--accent-color)', 
                marginLeft: '16px',
                animation: 'pulse 2s infinite',
                filter: 'drop-shadow(0 0 10px rgba(255, 107, 53, 0.5))'
              }} />
            </h1>
            <p>Join the ultimate platform for musicians to find collaborators, share music, and build their network. Where every note finds its harmony.</p>
            
            
            {!user ? (
              <div className="hero-actions">
                <Link to="/signup">
                  <button className="post-btn large">Start Your Journey</button>
                </Link>
                <Link to="/signin">
                  <button className="action-btn large">Sign In</button>
                </Link>
              </div>
            ) : (
              <div className="hero-actions">
                <Link to="/dashboard">
                  <button className="post-btn large">Go to Dashboard</button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="hero-visual">
            <div className="mock-dashboard">
              <div className="mock-nav">
                <div className="mock-logo">
                  <Music size={16} style={{color: 'var(--accent-color)'}} />
                  <span>theBandFam</span>
                </div>
                <div className="mock-search"></div>
                <div className="mock-icons">
                  <div className="mock-icon"></div>
                  <div className="mock-icon"></div>
                  <div className="mock-icon"></div>
                </div>
              </div>
              <div className="mock-content">
                <div className="mock-sidebar">
                  <div className="mock-profile"></div>
                  <div className="mock-nav-items">
                    <div className="mock-nav-item active"></div>
                    <div className="mock-nav-item"></div>
                    <div className="mock-nav-item"></div>
                  </div>
                </div>
                <div className="mock-feed">
                  <div className="mock-post">
                    <div className="mock-post-header"></div>
                    <div className="mock-post-content"></div>
                    <div className="mock-music-player">
                      <div className="mock-album"></div>
                      <div className="mock-track-info"></div>
                      <Play size={12} style={{color: 'var(--accent-color)'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Today Section */}
      <section className="join-today-section">
        <div className="section-content">
          <div className="join-today-grid">
            <div className="join-today-card">
              <h3>JOIN TODAY!</h3>
              <p>Connecting local musicians. Join the thousands of seeking musicians and bands. Premium Musician Classifieds. Sign up today!</p>
              <Link to="/signup">
                <button className="post-btn large">SIGN UP</button>
              </Link>
            </div>
            
            <div className="join-today-card">
              <h3>THEBANDFAM IS...</h3>
              <p>theBandFam.com is the largest musicians wanted and musician classifieds online! With thousands of musicians in your area, you have thousands of opportunities to connect.</p>
              <button className="action-btn large">+ MORE</button>
            </div>
            
            <div className="join-today-card testimonial-preview">
              <h3>TESTIMONIALS</h3>
              <blockquote>
                <p>"This is a great website. I found a lead singer for our band within three weeks."</p>
                <cite>- Charlotte, North Carolina</cite>
              </blockquote>
              <button className="action-btn large">+ MORE</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-content">
          <h2>Why Musicians Choose theBandFam</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Search size={28} style={{color: 'white'}} />
              </div>
              <h3>Find Your Musical Match</h3>
              <p>Discover musicians by instrument, genre, location, and availability to form your ideal collaboration.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <MessageSquare size={28} style={{color: 'white'}} />
              </div>
              <h3>Seamless Communication</h3>
              <p>Chat directly with potential collaborators, share ideas, and coordinate projects all in one place.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={28} style={{color: 'white'}} />
              </div>
              <h3>Grow Your Network</h3>
              <p>Build a portfolio, showcase your work, and connect with a community of like-minded musicians.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Mic size={28} style={{color: 'white'}} />
              </div>
              <h3>Share Your Sound</h3>
              <p>Upload demos, showcase your talent, and let your music speak for itself in our audio-first platform.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Volume2 size={28} style={{color: 'white'}} />
              </div>
              <h3>Live Collaboration</h3>
              <p>Join virtual jam sessions, collaborate in real-time, and create music together from anywhere in the world.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Radio size={28} style={{color: 'white'}} />
              </div>
              <h3>Discover New Sounds</h3>
              <p>Explore different genres, find inspiration, and connect with artists who share your musical vision.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-content">
          <h2>The Numbers Speak</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">25,000+</div>
              <div className="stat-label">Active Musicians</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15,000+</div>
              <div className="stat-label">Collaborations</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">80+</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">200+</div>
              <div className="stat-label">Genres</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Songs Created</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1,000+</div>
              <div className="stat-label">Bands Formed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-content">
          <h2>What Musicians Say</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"theBandFam helped me find the perfect vocalist for my EP. The platform made collaboration easy and efficient."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">AJ</div>
                <div className="author-info">
                  <div className="author-name">Alex J.</div>
                  <div className="author-role">Producer</div>
                </div>
                <div className="testimonial-rating">
                  <Star size={12} style={{color: '#fbbf24', fill: '#fbbf24'}} />
                  <Star size={12} style={{color: '#fbbf24', fill: '#fbbf24'}} />
                  <Star size={12} style={{color: '#fbbf24', fill: '#fbbf24'}} />
                  <Star size={12} style={{color: '#fbbf24', fill: '#fbbf24'}} />
                  <Star size={12} style={{color: '#fbbf24', fill: '#fbbf24'}} />
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"I moved to a new city and found my bandmates through theBandFam within weeks. Now we're touring together!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">SM</div>
                <div className="author-info">
                  <div className="author-name">Sarah M.</div>
                  <div className="author-role">Guitarist</div>
                </div>
                <div className="testimonial-rating">
                  <Star size={12} style={{color: '#fbbf24', fill: '#fbbf24'}} />
                  <Star size={12} style={{color: '#fbbf24', fill: '#fbbf24'}} />
                  <Star size={12} style={{color: '#fbbf24', fill: '#fbbf24'}} />
                  <Star size={12} style={{color: '#fbbf24', fill: '#fbbf24'}} />
                  <Star size={12} style={{color: '#fbbf24', fill: '#fbbf24'}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-content">
          <h2>Ready to Connect?</h2>
          <p>Join thousands of musicians already collaborating on theBandFam</p>
          
          {!user ? (
            <Link to="/signup">
              <button className="post-btn large">Create Your Profile</button>
            </Link>
          ) : (
            <Link to="/dashboard">
              <button className="post-btn large">Go to Dashboard</button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="section-content">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                <Music className="h-6 w-6" style={{color: 'var(--accent-color)'}} />
                <span>theBandFam</span>
              </div>
              <p>Connecting musicians worldwide</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4>Platform</h4>
                <Link to="/about">About</Link>
                <Link to="/features">Features</Link>
                <Link to="/pricing">Pricing</Link>
              </div>
              
              <div className="footer-column">
                <h4>Support</h4>
                <Link to="/help">Help Center</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/community">Community</Link>
              </div>
              
              <div className="footer-column">
                <h4>Legal</h4>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/cookies">Cookie Policy</Link>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2025 theBandFam. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;