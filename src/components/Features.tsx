import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, Users, MessageSquare, Calendar, Search, Heart, Settings, Bell, Video, Play, MapPin, Star, Guitar, Mic, Headphones, Volume2 } from 'lucide-react';

const Features = () => {
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
            <span style={{
              color: 'var(--accent-color)',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Features
            </span>
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
            <h1 style={{marginBottom: '24px'}}>Everything You Need to Connect & Create</h1>
            <p style={{fontSize: '18px', lineHeight: '1.6', color: 'var(--text-secondary)'}}>
              Discover all the powerful features that make theBandFam the ultimate platform for musical collaboration and networking.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="features-section">
        <div className="section-content">
          <h2 style={{textAlign: 'center', marginBottom: '48px'}}>Core Features</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Search size={32} style={{color: 'var(--accent-color)'}} />
              </div>
              <h3>Smart Musician Discovery</h3>
              <p>Find the perfect collaborators using our advanced search filters. Search by instrument, genre, location, skill level, and availability status to discover musicians who match your exact needs.</p>
              <ul style={{listStyle: 'none', padding: 0, marginTop: '16px'}}>
                <li style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                  <div style={{width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-color)'}}></div>
                  <span style={{fontSize: '14px', color: 'var(--text-secondary)'}}>Filter by 50+ instruments</span>
                </li>
                <li style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                  <div style={{width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-color)'}}></div>
                  <span style={{fontSize: '14px', color: 'var(--text-secondary)'}}>Location-based search</span>
                </li>
                <li style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div style={{width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-color)'}}></div>
                  <span style={{fontSize: '14px', color: 'var(--text-secondary)'}}>Availability status filtering</span>
                </li>
              </ul>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <MessageSquare size={32} style={{color: 'var(--accent-color)'}} />
              </div>
              <h3>Real-time Messaging</h3>
              <p>Connect instantly with potential collaborators through our built-in messaging system. Share ideas, coordinate sessions, and build relationships seamlessly.</p>
              <ul style={{listStyle: 'none', padding: 0, marginTop: '16px'}}>
                <li style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                  <div style={{width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-color)'}}></div>
                  <span style={{fontSize: '14px', color: 'var(--text-secondary)'}}>Instant messaging</span>
                </li>
                <li style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                  <div style={{width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-color)'}}></div>
                  <span style={{fontSize: '14px', color: 'var(--text-secondary)'}}>File sharing capabilities</span>
                </li>
                <li style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div style={{width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-color)'}}></div>
                  <span style={{fontSize: '14px', color: 'var(--text-secondary)'}}>Group conversations</span>
                </li>
              </ul>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={32} style={{color: 'var(--accent-color)'}} />
              </div>
              <h3>Profile & Portfolio</h3>
              <p>Create a comprehensive profile that showcases your musical identity. Upload samples, list your instruments, and tell your story to attract the right collaborators.</p>
              <ul style={{listStyle: 'none', padding: 0, marginTop: '16px'}}>
                <li style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                  <div style={{width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-color)'}}></div>
                  <span style={{fontSize: '14px', color: 'var(--text-secondary)'}}>Customizable profiles</span>
                </li>
                <li style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                  <div style={{width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-color)'}}></div>
                  <span style={{fontSize: '14px', color: 'var(--text-secondary)'}}>Music sample uploads</span>
                </li>
                <li style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div style={{width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-color)'}}></div>
                  <span style={{fontSize: '14px', color: 'var(--text-secondary)'}}>Skill level indicators</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="testimonials-section">
        <div className="section-content">
          <h2 style={{textAlign: 'center', marginBottom: '48px'}}>Advanced Collaboration Tools</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
            marginBottom: '48px'
          }}>
            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '12px',
              padding: '32px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'}}>
                <Calendar size={24} style={{color: 'var(--accent-color)'}} />
                <h3 style={{margin: 0}}>Event Coordination</h3>
              </div>
              <p style={{color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px'}}>
                Schedule rehearsals, gigs, and recording sessions with integrated calendar functionality. 
                Coordinate with multiple band members and never miss an important date.
              </p>
              <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
                <span style={{
                  background: 'var(--sidebar-bg)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  Calendar Integration
                </span>
                <span style={{
                  background: 'var(--sidebar-bg)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  RSVP Management
                </span>
                <span style={{
                  background: 'var(--sidebar-bg)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  Reminders
                </span>
              </div>
            </div>

            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '12px',
              padding: '32px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'}}>
                <Video size={24} style={{color: 'var(--accent-color)'}} />
                <h3 style={{margin: 0}}>Project Management</h3>
              </div>
              <p style={{color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px'}}>
                Organize your musical projects with dedicated workspaces. Share files, track progress, 
                and collaborate on everything from demos to full albums.
              </p>
              <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
                <span style={{
                  background: 'var(--sidebar-bg)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  File Sharing
                </span>
                <span style={{
                  background: 'var(--sidebar-bg)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  Version Control
                </span>
                <span style={{
                  background: 'var(--sidebar-bg)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  Progress Tracking
                </span>
              </div>
            </div>

            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '12px',
              padding: '32px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'}}>
                <Bell size={24} style={{color: 'var(--accent-color)'}} />
                <h3 style={{margin: 0}}>Smart Notifications</h3>
              </div>
              <p style={{color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px'}}>
                Stay updated with intelligent notifications about new collaboration opportunities, 
                messages, and updates from your musical network.
              </p>
              <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
                <span style={{
                  background: 'var(--sidebar-bg)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  Real-time Alerts
                </span>
                <span style={{
                  background: 'var(--sidebar-bg)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  Custom Preferences
                </span>
                <span style={{
                  background: 'var(--sidebar-bg)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  Email Digest
                </span>
              </div>
            </div>

            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '12px',
              padding: '32px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'}}>
                <Settings size={24} style={{color: 'var(--accent-color)'}} />
                <h3 style={{margin: 0}}>Privacy Controls</h3>
              </div>
              <p style={{color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px'}}>
                Take control of your visibility and privacy with granular settings. Choose who can see your profile, 
                contact you, and access your content.
              </p>
              <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
                <span style={{
                  background: 'var(--sidebar-bg)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  Profile Visibility
                </span>
                <span style={{
                  background: 'var(--sidebar-bg)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  Contact Settings
                </span>
                <span style={{
                  background: 'var(--sidebar-bg)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  Blocking Tools
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Musical Instruments Support */}
      <section className="features-section">
        <div className="section-content">
          <h2 style={{textAlign: 'center', marginBottom: '48px'}}>Comprehensive Instrument Support</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}>
            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '8px',
              padding: '24px',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <Guitar size={32} style={{color: 'var(--accent-color)', marginBottom: '12px'}} />
              <h4 style={{margin: '0 0 8px 0'}}>String Instruments</h4>
              <p style={{fontSize: '14px', color: 'var(--text-secondary)', margin: 0}}>
                Guitar, Bass, Violin, Cello, Mandolin, Banjo, Ukulele, and more
              </p>
            </div>
            
            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '8px',
              padding: '24px',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <Mic size={32} style={{color: 'var(--accent-color)', marginBottom: '12px'}} />
              <h4 style={{margin: '0 0 8px 0'}}>Vocals</h4>
              <p style={{fontSize: '14px', color: 'var(--text-secondary)', margin: 0}}>
                Lead Vocals, Backing Vocals, Harmonies, Beatboxing, and Voice Acting
              </p>
            </div>
            
            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '8px',
              padding: '24px',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <Volume2 size={32} style={{color: 'var(--accent-color)', marginBottom: '12px'}} />
              <h4 style={{margin: '0 0 8px 0'}}>Wind Instruments</h4>
              <p style={{fontSize: '14px', color: 'var(--text-secondary)', margin: 0}}>
                Saxophone, Trumpet, Flute, Clarinet, Trombone, French Horn, and more
              </p>
            </div>
            
            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '8px',
              padding: '24px',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <Headphones size={32} style={{color: 'var(--accent-color)', marginBottom: '12px'}} />
              <h4 style={{margin: '0 0 8px 0'}}>Production</h4>
              <p style={{fontSize: '14px', color: 'var(--text-secondary)', margin: 0}}>
                Music Production, Audio Engineering, Mixing, Mastering, Songwriting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="stats-section">
        <div className="section-content">
          <h2 style={{textAlign: 'center', marginBottom: '48px'}}>Platform Highlights</h2>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Supported Instruments</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Musical Genres</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Real-time Messaging</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">∞</div>
              <div className="stat-label">Collaboration Possibilities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="testimonials-section">
        <div className="section-content">
          <h2 style={{textAlign: 'center', marginBottom: '48px'}}>Coming Soon</h2>
          
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-color), #667eea)',
            borderRadius: '12px',
            padding: '48px',
            color: 'white',
            textAlign: 'center',
            marginBottom: '48px'
          }}>
            <h3 style={{marginBottom: '24px', fontSize: '24px'}}>Exciting Features in Development</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              marginTop: '32px'
            }}>
              <div>
                <Play size={24} style={{marginBottom: '12px'}} />
                <h4 style={{margin: '0 0 8px 0'}}>Integrated DAW</h4>
                <p style={{fontSize: '14px', opacity: 0.9, margin: 0}}>
                  Collaborate on music directly in the platform
                </p>
              </div>
              <div>
                <Video size={24} style={{marginBottom: '12px'}} />
                <h4 style={{margin: '0 0 8px 0'}}>Video Calls</h4>
                <p style={{fontSize: '14px', opacity: 0.9, margin: 0}}>
                  Virtual jam sessions and meetings
                </p>
              </div>
              <div>
                <MapPin size={24} style={{marginBottom: '12px'}} />
                <h4 style={{margin: '0 0 8px 0'}}>Local Events</h4>
                <p style={{fontSize: '14px', opacity: 0.9, margin: 0}}>
                  Discover and create local music events
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-content">
          <h2>Ready to Experience All These Features?</h2>
          <p>
            Join theBandFam today and unlock the full potential of musical collaboration
          </p>
          
          <div style={{display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap'}}>
            <Link to="/signup">
              <button className="post-btn large">Start Creating Today</button>
            </Link>
            <Link to="/about">
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

export default Features;