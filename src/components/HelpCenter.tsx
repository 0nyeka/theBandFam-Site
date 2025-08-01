import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, Search, ChevronDown, ChevronRight, MessageSquare, Mail, Phone, ExternalLink, BookOpen, Users, Settings, Calendar, Bell, Shield } from 'lucide-react';

const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      description: 'Learn the basics of using theBandFam',
      articles: [
        { title: 'Creating Your Profile', views: '2.5k', time: '3 min read' },
        { title: 'Finding Musicians Near You', views: '1.8k', time: '2 min read' },
        { title: 'Setting Up Your Instruments', views: '1.2k', time: '4 min read' },
        { title: 'Understanding Availability Status', views: '950', time: '2 min read' }
      ]
    },
    {
      id: 'collaboration',
      title: 'Collaboration & Projects',
      icon: Users,
      description: 'Working with other musicians',
      articles: [
        { title: 'Starting a New Project', views: '1.9k', time: '5 min read' },
        { title: 'Inviting Members to Projects', views: '1.4k', time: '3 min read' },
        { title: 'Sharing Files and Audio', views: '1.1k', time: '4 min read' },
        { title: 'Managing Project Roles', views: '850', time: '3 min read' }
      ]
    },
    {
      id: 'messaging',
      title: 'Messaging & Communication',
      icon: MessageSquare,
      description: 'Connecting with other musicians',
      articles: [
        { title: 'Sending Your First Message', views: '2.1k', time: '2 min read' },
        { title: 'Group Conversations', views: '1.3k', time: '3 min read' },
        { title: 'Message Notifications', views: '980', time: '2 min read' },
        { title: 'Blocking and Reporting Users', views: '750', time: '3 min read' }
      ]
    },
    {
      id: 'events',
      title: 'Events & Calendar',
      icon: Calendar,
      description: 'Scheduling and managing events',
      articles: [
        { title: 'Creating Events', views: '1.6k', time: '4 min read' },
        { title: 'RSVP Management', views: '1.0k', time: '3 min read' },
        { title: 'Calendar Integration', views: '890', time: '5 min read' },
        { title: 'Event Reminders', views: '720', time: '2 min read' }
      ]
    },
    {
      id: 'account',
      title: 'Account & Settings',
      icon: Settings,
      description: 'Managing your account preferences',
      articles: [
        { title: 'Privacy Settings', views: '1.7k', time: '4 min read' },
        { title: 'Notification Preferences', views: '1.2k', time: '3 min read' },
        { title: 'Changing Your Password', views: '1.0k', time: '2 min read' },
        { title: 'Deleting Your Account', views: '650', time: '3 min read' }
      ]
    },
    {
      id: 'safety',
      title: 'Safety & Security',
      icon: Shield,
      description: 'Staying safe on the platform',
      articles: [
        { title: 'Community Guidelines', views: '1.4k', time: '6 min read' },
        { title: 'Reporting Inappropriate Content', views: '900', time: '3 min read' },
        { title: 'Two-Factor Authentication', views: '800', time: '4 min read' },
        { title: 'Safe Meeting Practices', views: '1.1k', time: '5 min read' }
      ]
    }
  ];

  const popularArticles = [
    { title: 'How to Create an Attractive Musician Profile', category: 'Getting Started', views: '3.2k' },
    { title: 'Best Practices for Collaborating Remotely', category: 'Collaboration', views: '2.8k' },
    { title: 'Finding the Right Musicians for Your Genre', category: 'Getting Started', views: '2.4k' },
    { title: 'Managing Multiple Projects Effectively', category: 'Collaboration', views: '2.1k' },
    { title: 'Setting Up Professional Audio Sharing', category: 'Collaboration', views: '1.9k' }
  ];

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/features" className="nav-link">Features</Link>
            <span style={{
              color: 'var(--accent-color)',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Help
            </span>
          </div>
        </div>
        
        <div className="nav-right">
          <div className="auth-buttons">
            <Link to="/contact">
              <button className="action-btn">Contact Support</button>
            </Link>
            <Link to="/signin">
              <button className="post-btn">Sign In</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" style={{paddingBottom: '40px'}}>
        <div className="hero-content">
          <div className="hero-text" style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
            <h1 style={{marginBottom: '16px'}}>How can we help you?</h1>
            <p style={{fontSize: '18px', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '32px'}}>
              Find answers to common questions or get in touch with our support team
            </p>
            
            {/* Search Bar */}
            <div style={{
              position: 'relative',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <Search 
                size={20} 
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-secondary)'
                }}
              />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: 'calc(100% - 32px)',
                  padding: '16px 16px 16px 48px',
                  border: '2px solid var(--border-color)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="features-section">
        <div className="section-content">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}>
            <Link to="/contact" style={{textDecoration: 'none'}}>
              <div className="feature-card" style={{cursor: 'pointer', transition: 'transform 0.2s'}}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className="feature-icon">
                  <MessageSquare size={24} style={{color: 'var(--accent-color)'}} />
                </div>
                <h3>Contact Support</h3>
                <p>Get personalized help from our support team</p>
              </div>
            </Link>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={24} style={{color: 'var(--accent-color)'}} />
              </div>
              <h3>Community Forum</h3>
              <p>Connect with other musicians and share tips</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <BookOpen size={24} style={{color: 'var(--accent-color)'}} />
              </div>
              <h3>Video Tutorials</h3>
              <p>Watch step-by-step guides and tutorials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="testimonials-section">
        <div className="section-content">
          <h2 style={{textAlign: 'center', marginBottom: '48px'}}>Popular Articles</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '48px'
          }}>
            {popularArticles.map((article, index) => (
              <div key={index} style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-color)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <h4 style={{margin: '0 0 8px 0', color: 'var(--text-primary)'}}>{article.title}</h4>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontSize: '12px', color: 'var(--accent-color)', fontWeight: '500'}}>
                    {article.category}
                  </span>
                  <span style={{fontSize: '12px', color: 'var(--text-secondary)'}}>
                    {article.views} views
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="features-section">
        <div className="section-content">
          <h2 style={{textAlign: 'center', marginBottom: '48px'}}>Browse by Category</h2>
          
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              const isExpanded = expandedSections[category.id];
              
              return (
                <div key={category.id} style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  overflow: 'hidden'
                }}>
                  <div 
                    style={{
                      padding: '20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background-color 0.2s'
                    }}
                    onClick={() => toggleSection(category.id)}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--sidebar-bg)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                      <Icon size={24} style={{color: 'var(--accent-color)'}} />
                      <div>
                        <h3 style={{margin: '0 0 4px 0'}}>{category.title}</h3>
                        <p style={{margin: 0, fontSize: '14px', color: 'var(--text-secondary)'}}>
                          {category.description}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronDown size={20} style={{color: 'var(--text-secondary)'}} />
                    ) : (
                      <ChevronRight size={20} style={{color: 'var(--text-secondary)'}} />
                    )}
                  </div>
                  
                  {isExpanded && (
                    <div style={{
                      borderTop: '1px solid var(--border-color)',
                      padding: '0'
                    }}>
                      {category.articles.map((article, index) => (
                        <div key={index} style={{
                          padding: '16px 20px',
                          borderBottom: index < category.articles.length - 1 ? '1px solid var(--border-color)' : 'none',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--sidebar-bg)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <div>
                            <h4 style={{margin: '0 0 4px 0', fontSize: '16px'}}>{article.title}</h4>
                            <div style={{display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-secondary)'}}>
                              <span>{article.views} views</span>
                              <span>{article.time}</span>
                            </div>
                          </div>
                          <ExternalLink size={16} style={{color: 'var(--text-secondary)'}} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="cta-section">
        <div className="section-content">
          <h2>Still Need Help?</h2>
          <p>
            Can't find what you're looking for? Our support team is here to help you succeed.
          </p>
          
          <div style={{display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap'}}>
            <Link to="/contact">
              <button className="post-btn large">Contact Support</button>
            </Link>
            <button className="action-btn large">Join Community Forum</button>
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

export default HelpCenter;