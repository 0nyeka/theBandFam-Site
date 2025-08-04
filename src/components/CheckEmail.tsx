import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Music, Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { supabase } from '../utils/supabase';

const CheckEmail = () => {
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get email from navigation state or localStorage
    const emailFromState = location.state?.email;
    const emailFromStorage = localStorage.getItem('pendingEmail');
    
    if (emailFromState) {
      setEmail(emailFromState);
      localStorage.setItem('pendingEmail', emailFromState);
    } else if (emailFromStorage) {
      setEmail(emailFromStorage);
    } else {
      // No email found, redirect to signup
      navigate('/signup');
    }
  }, [location.state, navigate]);

  const resendConfirmation = async () => {
    if (!email) return;
    
    setIsResending(true);
    setResendMessage('');

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });

      if (error) {
        setResendMessage('Failed to resend email. Please try again.');
      } else {
        setResendMessage('Confirmation email sent successfully!');
      }
    } catch (err) {
      setResendMessage('Failed to resend email. Please try again.');
    } finally {
      setIsResending(false);
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
          <button
            onClick={() => navigate('/signup')}
            className="action-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign Up
          </button>
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
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            padding: '20px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
            display: 'inline-flex',
            marginBottom: '24px'
          }}>
            <Mail className="h-10 w-10" style={{color: '#d97706'}} />
          </div>
          
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            margin: '0 0 16px 0'
          }}>
            Check Your Email
          </h1>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '18px',
            marginBottom: '24px',
            lineHeight: '1.6'
          }}>
            We've sent a confirmation link to:
          </p>
          
          <div style={{
            background: 'var(--sidebar-bg)',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '32px',
            border: '1px solid var(--border-color)'
          }}>
            <p style={{
              color: 'var(--text-primary)',
              fontSize: '16px',
              fontWeight: '600',
              margin: 0
            }}>
              {email}
            </p>
          </div>
          
          <div style={{
            background: '#f0f9ff',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #0ea5e9',
            marginBottom: '32px',
            textAlign: 'left'
          }}>
            <h3 style={{
              color: '#0369a1',
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 12px 0'
            }}>
              Next Steps:
            </h3>
            <ol style={{
              color: '#0369a1',
              fontSize: '14px',
              margin: 0,
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '8px' }}>Check your email inbox (and spam folder)</li>
              <li style={{ marginBottom: '8px' }}>Click the confirmation link in the email</li>
              <li>Complete your profile setup</li>
            </ol>
          </div>

          {resendMessage && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: resendMessage.includes('Failed') ? '#fef2f2' : '#f0fdf4',
              color: resendMessage.includes('Failed') ? '#dc2626' : '#16a34a',
              borderRadius: '8px',
              marginBottom: '24px',
              fontSize: '14px',
              border: `1px solid ${resendMessage.includes('Failed') ? '#fecaca' : '#bbf7d0'}`
            }}>
              {resendMessage}
            </div>
          )}

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center'
          }}>
            <button
              onClick={resendConfirmation}
              disabled={isResending}
              className="action-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: isResending ? 0.7 : 1,
                cursor: isResending ? 'not-allowed' : 'pointer'
              }}
            >
              <RefreshCw className={`h-4 w-4 ${isResending ? 'animate-spin' : ''}`} />
              {isResending ? 'Sending...' : 'Resend Email'}
            </button>
            
            <p style={{
              color: 'var(--text-light)',
              fontSize: '14px',
              margin: 0
            }}>
              Didn't receive the email? Check your spam folder or try resending.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;