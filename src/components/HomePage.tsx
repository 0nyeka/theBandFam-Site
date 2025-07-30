import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button.tsx';
import { Card } from './ui/card.tsx';
import { Music, Users, MessageSquare, Calendar, Search, Play, Heart, Star } from 'lucide-react';
import { signOut } from '../utils/supabase.ts';

interface HomePageProps {
  user?: any; // User object from Supabase Auth
}

const HomePage = ({ user }: HomePageProps) => {
  const navigate = useNavigate();
  
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
            <span>MusicConnect</span>
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
            <h1>Connect. Collaborate. Create.</h1>
            <p>Join the ultimate platform for musicians to find collaborators, share music, and build their network</p>
            
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
                  <span>MusicConnect</span>
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

      {/* Features Section */}
      <section className="features-section">
        <div className="section-content">
          <h2>Why Musicians Choose MusicConnect</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Search size={24} style={{color: 'var(--accent-color)'}} />
              </div>
              <h3>Find Your Musical Match</h3>
              <p>Discover musicians by instrument, genre, location, and availability to form your ideal collaboration.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <MessageSquare size={24} style={{color: 'var(--accent-color)'}} />
              </div>
              <h3>Seamless Communication</h3>
              <p>Chat directly with potential collaborators, share ideas, and coordinate projects all in one place.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={24} style={{color: 'var(--accent-color)'}} />
              </div>
              <h3>Grow Your Network</h3>
              <p>Build a portfolio, showcase your work, and connect with a community of like-minded musicians.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Active Musicians</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5,000+</div>
              <div className="stat-label">Collaborations</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Genres</div>
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
                <p>"MusicConnect helped me find the perfect vocalist for my EP. The platform made collaboration easy and efficient."</p>
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
                <p>"I moved to a new city and found my bandmates through MusicConnect within weeks. Now we're touring together!"</p>
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
          <p>Join thousands of musicians already collaborating on MusicConnect</p>
          
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
                <span>MusicConnect</span>
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
            <p>© 2025 MusicConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;