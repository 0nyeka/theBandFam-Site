import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, Heart, Users, MapPin, Home, Baby, Cross, Guitar } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

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
            <Link to="/signup">
              <button className="post-btn">Get Started</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" style={{paddingBottom: '40px'}}>
        <div className="hero-content">
          <div className="hero-text" style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto'}}>
            <h1 style={{marginBottom: '24px'}}>About theBandFam</h1>
            <p style={{fontSize: '18px', lineHeight: '1.6', color: 'var(--text-secondary)'}}>
              Born from a passion for music and connection, theBandFam is more than just a platform—it's a community where musicians find their musical family.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="features-section">
        <div className="section-content">
          <h2 style={{textAlign: 'center', marginBottom: '48px'}}>Our Story</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '64px'
          }}>
            <div>
              <h3 style={{marginBottom: '24px', fontSize: '24px', color: 'white'}}>The Vision</h3>
              <p style={{lineHeight: '1.7', marginBottom: '20px', color: 'white'}}>
                theBandFam was born from a simple yet powerful idea: every musician deserves to find their perfect collaborators. 
                Whether you're a bedroom producer looking for a vocalist, a guitarist seeking a rhythm section, or a songwriter 
                wanting to bring your compositions to life, we believe music is meant to be shared.
              </p>
              <p style={{lineHeight: '1.7', color: 'white',}}>
                We understand the challenges musicians face—finding like-minded collaborators, building networks in new cities, 
                and connecting with others who share your musical vision. That's why we created a space where talent meets 
                opportunity, and musical dreams become reality.
              </p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, var(--accent-color), #667eea)',
              borderRadius: '12px',
              padding: '40px',
              color: 'white',
              textAlign: 'center'
            }}>
              <Music size={48} style={{marginBottom: '20px'}} />
              <h4 style={{marginBottom: '16px', fontSize: '20px'}}>Our Mission</h4>
              <p style={{lineHeight: '1.6', opacity: 0.9}}>
                To connect musicians worldwide, foster creative collaboration, and help artists build meaningful 
                relationships that transcend geographical boundaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="testimonials-section">
        <div className="section-content">
          <h2 style={{textAlign: 'center', marginBottom: '48px'}}>Meet the Founders</h2>
          
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            background: 'var(--card-bg)',
            borderRadius: '16px',
            padding: '48px',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              marginBottom: '32px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-color), #667eea)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                CA
              </div>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea, var(--accent-color))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                CA
              </div>
            </div>
            
            <h3 style={{marginBottom: '16px', fontSize: '28px'}}>Coco & Debo Adegboyega</h3>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '32px',
              marginBottom: '24px',
              flexWrap: 'wrap'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)'}}>
                <Heart size={16} style={{color: 'var(--accent-color)'}} />
                <span>Married Couple</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)'}}>
                <MapPin size={16} style={{color: 'var(--accent-color)'}} />
                <span>Maryland, USA</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)'}}>
                <Baby size={16} style={{color: 'var(--accent-color)'}} />
                <span>Two Children</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)'}}>
                <Cross size={16} style={{color: 'var(--accent-color)'}} />
                <span>Christian Faith</span>
              </div>
            </div>
            
            <p style={{
              lineHeight: '1.7',
              fontSize: '16px',
              marginBottom: '20px',
              color: 'var(--text-secondary)'
            }}>
              As a Christian married couple from Maryland with two beautiful children, Coco and Coco Adegboyega understand 
              the importance of community, family, and shared passions. Their love for music runs deep, and they've experienced 
              firsthand the challenges of connecting with fellow musicians while balancing family life.
            </p>
            
            <p style={{
              lineHeight: '1.7',
              fontSize: '16px',
              color: 'var(--text-secondary)'
            }}>
              Their faith guides their commitment to creating a positive, inclusive platform where musicians can build 
              meaningful relationships. They believe that music is a gift that brings people together, transcends boundaries, 
              and creates lasting bonds, just like the one they share.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="features-section">
        <div className="section-content">
          <h2 style={{textAlign: 'center', marginBottom: '48px'}}>Our Values</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={24} style={{color: 'var(--accent-color)'}} />
              </div>
              <h3>Community First</h3>
              <p>We believe in fostering genuine connections and building a supportive community where every musician feels valued and heard.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Heart size={24} style={{color: 'var(--accent-color)'}} />
              </div>
              <h3>Authenticity</h3>
              <p>We encourage musicians to be their authentic selves, celebrating diversity in musical styles, backgrounds, and creative expression.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Guitar size={24} style={{color: 'var(--accent-color)'}} />
              </div>
              <h3>Musical Excellence</h3>
              <p>We're passionate about helping musicians grow, learn from each other, and push the boundaries of their creative potential.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="stats-section">
        <div className="section-content">
          <h2 style={{textAlign: 'center', marginBottom: '48px'}}>Growing Together</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Musicians Connected</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5,000+</div>
              <div className="stat-label">Successful Collaborations</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Countries Represented</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Musical Genres</div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="cta-section">
        <div className="section-content">
          <h2>Join Our Musical Family</h2>
          <p>
            Whether you're just starting your musical journey or you're a seasoned professional, 
            theBandFam welcomes you with open arms. Let's create something beautiful together.
          </p>
          
          <div style={{display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap'}}>
            <Link to="/signup">
              <button className="post-btn large">Start Your Journey</button>
            </Link>
            <Link to="/">
              <button className="action-btn large">Learn More</button>
            </Link>
          </div>
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

export default About;