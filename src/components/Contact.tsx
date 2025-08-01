import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, Mail, Phone, MessageSquare, Clock, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    priority: 'normal'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const supportCategories = [
    'Account Issues',
    'Technical Problems',
    'Billing Questions',
    'Feature Requests',
    'Bug Reports',
    'General Inquiry',
    'Partnership/Business',
    'Safety/Abuse Report'
  ];

  if (submitted) {
    return (
      <div className="homepage-container">
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
              <Link to="/help">
                <button className="action-btn">Help Center</button>
              </Link>
              <Link to="/signin">
                <button className="post-btn">Sign In</button>
              </Link>
            </div>
          </div>
        </nav>

        <div style={{
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '500px',
            background: 'var(--card-bg)',
            padding: '48px',
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <CheckCircle size={64} style={{color: 'var(--accent-color)', marginBottom: '24px'}} />
            <h2 style={{marginBottom: '16px'}}>Message Sent Successfully!</h2>
            <p style={{color: 'var(--text-secondary)', marginBottom: '32px'}}>
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <button 
                className="post-btn"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    category: '',
                    message: '',
                    priority: 'normal'
                  });
                }}
              >
                Send Another Message
              </button>
              <Link to="/help">
                <button className="action-btn">Visit Help Center</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <Link to="/help" className="nav-link">Help</Link>
            <span style={{
              color: 'var(--accent-color)',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Contact
            </span>
          </div>
        </div>
        
        <div className="nav-right">
          <div className="auth-buttons">
            <Link to="/help">
              <button className="action-btn">Help Center</button>
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
            <h1 style={{marginBottom: '16px'}}>Get in Touch</h1>
            <p style={{fontSize: '18px', lineHeight: '1.6', color: 'var(--text-secondary)'}}>
              Have a question, suggestion, or need help? We're here to support you on your musical journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="features-section">
        <div className="section-content">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            marginBottom: '64px'
          }}>
            <div className="feature-card">
              <div className="feature-icon">
                <MessageSquare size={32} style={{color: 'var(--accent-color)'}} />
              </div>
              <h3>Live Chat</h3>
              <p>Get instant help from our support team during business hours</p>
              <button className="action-btn" style={{marginTop: '16px'}}>
                Start Chat
              </button>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Mail size={32} style={{color: 'var(--accent-color)'}} />
              </div>
              <h3>Email Support</h3>
              <p>Send us a detailed message and we'll respond within 24 hours</p>
              <div style={{marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)'}}>
                support@thebandfam.com
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Phone size={32} style={{color: 'var(--accent-color)'}} />
              </div>
              <h3>Phone Support</h3>
              <p>Call us for urgent technical issues or account problems</p>
              <div style={{marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)'}}>
                +1 (555) 123-BAND
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="testimonials-section">
        <div className="section-content">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '48px',
            alignItems: 'start'
          }}>
            {/* Contact Form */}
            <div style={{
              background: 'var(--card-bg)',
              padding: '40px',
              borderRadius: '12px',
              border: '1px solid var(--border-color)'
            }}>
              <h2 style={{marginBottom: '24px'}}>Send us a Message</h2>
              
              <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '500',
                      color: 'var(--text-primary)'
                    }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: 'calc(100% - 30px)',
                        padding: '12px 16px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        outline: 'none',
                        backgroundColor: 'var(--sidebar-bg)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '500',
                      color: 'var(--text-primary)'
                    }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: 'calc(100% - 30px)',
                        padding: '12px 16px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        outline: 'none',
                        backgroundColor: 'var(--sidebar-bg)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: 'var(--text-primary)'
                  }}>
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: 'calc(100% - 4px)',
                      padding: '12px 16px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      outline: 'none',
                      backgroundColor: 'var(--sidebar-bg)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="">Select a category</option>
                    {supportCategories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: 'var(--text-primary)'
                  }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief description of your issue or question"
                    style={{
                      width: 'calc(100% - 30px)',
                      padding: '12px 16px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      outline: 'none',
                      backgroundColor: 'var(--sidebar-bg)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: 'var(--text-primary)'
                  }}>
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    style={{
                      width: 'calc(100% - 4px)',
                      padding: '12px 16px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      outline: 'none',
                      backgroundColor: 'var(--sidebar-bg)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="low">Low - General question</option>
                    <option value="normal">Normal - Standard support</option>
                    <option value="high">High - Account/technical issue</option>
                    <option value="urgent">Urgent - Critical problem</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: 'var(--text-primary)'
                  }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Please provide as much detail as possible to help us assist you better..."
                    style={{
                      width: 'calc(100% - 30px)',
                      padding: '12px 16px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      outline: 'none',
                      backgroundColor: 'var(--sidebar-bg)',
                      color: 'var(--text-primary)',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="post-btn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
              {/* Support Hours */}
              <div style={{
                background: 'var(--card-bg)',
                padding: '24px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                  <Clock size={20} style={{color: 'var(--accent-color)'}} />
                  <h3 style={{margin: 0}}>Support Hours</h3>
                </div>
                <div style={{fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>
                  <div>Monday - Friday: 9 AM - 8 PM EST</div>
                  <div>Saturday: 10 AM - 6 PM EST</div>
                  <div>Sunday: 12 PM - 6 PM EST</div>
                </div>
              </div>

              {/* Contact Info */}
              <div style={{
                background: 'var(--card-bg)',
                padding: '24px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                  <MapPin size={20} style={{color: 'var(--accent-color)'}} />
                  <h3 style={{margin: 0}}>Contact Info</h3>
                </div>
                <div style={{fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.8'}}>
                  <div style={{marginBottom: '8px'}}>
                    <strong>Email:</strong> support@thebandfam.com
                  </div>
                  <div style={{marginBottom: '8px'}}>
                    <strong>Phone:</strong> +1 (555) 123-BAND
                  </div>
                  <div>
                    <strong>Address:</strong><br />
                    theBandFam HQ<br />
                    123 Music Avenue<br />
                    Baltimore, MD 21201
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div style={{
                background: 'var(--card-bg)',
                padding: '24px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
              }}>
                <h3 style={{margin: '0 0 16px 0'}}>Quick Links</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  <Link to="/help" style={{
                    color: 'var(--accent-color)',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Help Center
                  </Link>
                  <Link to="/features" style={{
                    color: 'var(--accent-color)',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Feature Requests
                  </Link>
                  <Link to="/about" style={{
                    color: 'var(--accent-color)',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    About Us
                  </Link>
                </div>
              </div>
            </div>
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

export default Contact;