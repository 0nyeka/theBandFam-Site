import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Music, CheckCircle, AlertCircle, Mail, ArrowRight } from 'lucide-react';
import { supabase } from '../utils/supabase';

const ConfirmAccount = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'pending'>('loading');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Check if we have confirmation tokens in URL
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');

        if (token_hash && type === 'email') {
          // Verify the email confirmation token
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash,
            type: 'email'
          });

          if (error) {
            setStatus('error');
            setMessage('Failed to confirm your email. The link may be expired or invalid.');
          } else if (data.user) {
            setStatus('success');
            setMessage('Your email has been confirmed successfully!');
            
            // Redirect to dashboard after 3 seconds
            setTimeout(() => {
              navigate('/dashboard');
            }, 3000);
          }
        } else {
          // No tokens, show pending confirmation
          setStatus('pending');
          setMessage('Please check your email and click the confirmation link.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('An unexpected error occurred.');
        console.error('Confirmation error:', err);
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate]);

  const resendConfirmation = async () => {
    const email = localStorage.getItem('pendingEmail');
    if (email) {
      try {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: email
        });

        if (error) {
          setMessage('Failed to resend confirmation email.');
        } else {
          setMessage('Confirmation email sent! Please check your inbox.');
        }
      } catch (err) {
        setMessage('Failed to resend confirmation email.');
      }
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
          {status === 'loading' && (
            <>
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
                Confirming your account...
              </h2>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '16px'
              }}>
                Please wait while we verify your email.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div style={{
                padding: '16px',
                borderRadius: '50%',
                background: '#dcfce7',
                display: 'inline-flex',
                marginBottom: '16px'
              }}>
                <CheckCircle className="h-8 w-8" style={{color: '#16a34a'}} />
              </div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                margin: '0 0 8px 0'
              }}>
                Welcome to theBandFam!
              </h2>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '16px',
                marginBottom: '24px'
              }}>
                {message}
              </p>
              <div style={{
                padding: '16px',
                background: '#f0f9ff',
                borderRadius: '8px',
                border: '1px solid #0ea5e9',
                marginBottom: '24px'
              }}>
                <p style={{
                  color: '#0369a1',
                  fontSize: '14px',
                  margin: 0
                }}>
                  Redirecting you to your dashboard in a few seconds...
                </p>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="post-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  margin: '0 auto'
                }}
              >
                Go to Dashboard <ArrowRight className="h-5 w-5" />
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div style={{
                padding: '16px',
                borderRadius: '50%',
                background: '#fef2f2',
                display: 'inline-flex',
                marginBottom: '16px'
              }}>
                <AlertCircle className="h-8 w-8" style={{color: '#dc2626'}} />
              </div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                margin: '0 0 8px 0'
              }}>
                Confirmation Failed
              </h2>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '16px',
                marginBottom: '24px'
              }}>
                {message}
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={resendConfirmation}
                  className="action-btn"
                >
                  Resend Email
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="post-btn"
                >
                  Try Again
                </button>
              </div>
            </>
          )}

          {status === 'pending' && (
            <>
              <div style={{
                padding: '16px',
                borderRadius: '50%',
                background: '#fef3c7',
                display: 'inline-flex',
                marginBottom: '16px'
              }}>
                <Mail className="h-8 w-8" style={{color: '#d97706'}} />
              </div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                margin: '0 0 8px 0'
              }}>
                Check Your Email
              </h2>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '16px',
                marginBottom: '24px'
              }}>
                We've sent a confirmation link to your email address. Please click the link to activate your account.
              </p>
              <div style={{
                padding: '16px',
                background: '#fffbeb',
                borderRadius: '8px',
                border: '1px solid #f59e0b',
                marginBottom: '24px'
              }}>
                <p style={{
                  color: '#92400e',
                  fontSize: '14px',
                  margin: 0
                }}>
                  <strong>Didn't receive the email?</strong> Check your spam folder or click below to resend.
                </p>
              </div>
              <button
                onClick={resendConfirmation}
                className="action-btn"
                style={{ margin: '0 auto' }}
              >
                Resend Confirmation Email
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmAccount;