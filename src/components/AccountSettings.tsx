import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  MapPin,
  Info,
  Music,
  Settings,
  Home,
  Users,
  Calendar,
  MessageSquare,
  Compass
} from 'lucide-react';
import { 
  getCurrentUser, 
  fetchProfile, 
  updateProfile,
  updatePassword,
  updateUserSettings,
  signOut
} from '../utils/supabase.ts';
import { Button } from './ui/button.tsx';
import { Input } from './ui/input.tsx';
import { Textarea } from './ui/textarea.tsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.tsx';
import { Switch } from './ui/switch.tsx';
import { Label } from './ui/label.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select.tsx';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.tsx';
import { Separator } from './ui/separator.tsx';

const AccountSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  const [settings, setSettings] = useState<any>({
    email_notifications: true,
    privacy_level: 'public',
    theme_preference: 'light'
  });
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  
  // Error and success messages
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { user } = await getCurrentUser();
        
        if (!user) {
          navigate('/signin');
          return;
        }
        
        setUser(user);
        
        // Fetch profile data
        const { profile } = await fetchProfile(user.id);
        if (profile) {
          setProfile(profile);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleProfileUpdate = async () => {
    setError(null);
    setSuccess(null);
    setSaveLoading(true);
    
    try {
      const { error } = await updateProfile(user.id, {
        display_name: profile.display_name,
        bio: profile.bio,
        location: profile.location,
        availability_status: profile.availability_status
      });
      
      if (error) throw error;
      
      setSuccess('Profile updated successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaveLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    setError(null);
    setSuccess(null);
    setSaveLoading(true);
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      setSaveLoading(false);
      return;
    }
    
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      setSaveLoading(false);
      return;
    }
    
    try {
      const { success, error } = await updatePassword(newPassword);
      
      if (error) throw error;
      if (success) {
        setSuccess('Password updated successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSettingsUpdate = async () => {
    setError(null);
    setSuccess(null);
    setSaveLoading(true);
    
    try {
      const { error } = await updateUserSettings(user.id, settings);
      
      if (error) throw error;
      
      setSuccess('Settings updated successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to update settings');
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <nav className="top-nav">
          <div className="nav-left">
            <div className="logo">
              <Music className="h-6 w-6" style={{color: 'var(--accent-color)'}} />
              <span>theBandFam</span>
            </div>
          </div>
        </nav>
        <div className="main-content">
          <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '40px'}}>
            <p>Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-left">
          <div className="logo">
            <Music className="h-6 w-6" style={{color: 'var(--accent-color)'}} />
            <span>MusicConnect</span>
          </div>
        </div>
        
        <div className="nav-right">
          <div className="nav-icons">
            <span className="icon" onClick={() => navigate('/dashboard')}>
              <Home size={18} />
            </span>
            <span className="icon"><Users size={18} /></span>
            <span className="icon"><Calendar size={18} /></span>
            <span className="notification-icon">
              <Bell size={18} />
              <span className="badge">5</span>
            </span>
            <span className="notification-icon">
              <MessageSquare size={18} />
              <span className="badge">3</span>
            </span>
          </div>
          <div className="user-avatar">
            <Avatar className="h-8 w-8">
              <AvatarFallback style={{backgroundColor: 'var(--accent-color)', color: 'white'}}>
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="main-content">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <div className="user-profile">
            <Avatar className="profile-img">
              <AvatarFallback style={{backgroundColor: 'var(--accent-color)', color: 'white'}}>
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <h3>{user?.email || "User"}</h3>
            <p>Musician</p>
          </div>

          <nav className="sidebar-nav">
            <a 
              href="#" 
              className="nav-item"
              onClick={(e) => {
                e.preventDefault();
                navigate('/dashboard');
              }}
            >
              <span><Home size={16} /> Home</span>
            </a>
            
            <a 
              href="#" 
              className="nav-item"
              onClick={(e) => {
                e.preventDefault();
                navigate('/dashboard');
              }}
            >
              <span><Users size={16} /> My Network</span>
            </a>
            
            <a 
              href="#" 
              className="nav-item"
              onClick={(e) => {
                e.preventDefault();
                navigate('/dashboard');
              }}
            >
              <span><Calendar size={16} /> Events</span>
            </a>
            
            <a 
              href="#" 
              className="nav-item"
              onClick={(e) => {
                e.preventDefault();
                navigate('/dashboard');
              }}
            >
              <span><Music size={16} /> My Music</span>
            </a>
            
            <a 
              href="#" 
              className="nav-item"
              onClick={(e) => {
                e.preventDefault();
                navigate('/dashboard');
              }}
            >
              <span><Compass size={16} /> Discover</span>
            </a>
            
            <a href="#" className="nav-item active">
              <span><Settings size={16} /> Settings</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="feed">
          <div className="post">
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '24px'}}>
              <button 
                onClick={() => navigate('/dashboard')}
                className="action-btn"
                style={{marginRight: '16px'}}
              >
                <ArrowLeft size={16} style={{marginRight: '8px'}} />
                Back to Dashboard
              </button>
              <h1 style={{margin: 0, fontSize: '24px', fontWeight: 'bold'}}>Settings</h1>
            </div>
            
            <p style={{color: 'var(--text-secondary)', marginBottom: '24px'}}>
              Manage your account and preferences
            </p>

            {error && (
              <div style={{
                padding: '12px',
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                {error}
              </div>
            )}
            
            {success && (
              <div style={{
                padding: '12px',
                backgroundColor: '#f0f9ff',
                color: '#0284c7',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                {success}
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div style={{
                display: 'flex',
                borderBottom: '1px solid var(--border-color)',
                marginBottom: '24px'
              }}>
                <button
                  className={`action-btn ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                  style={{
                    padding: '12px 16px',
                    backgroundColor: activeTab === 'profile' ? 'var(--hover-bg)' : 'transparent',
                    borderBottom: activeTab === 'profile' ? '2px solid var(--accent-color)' : 'none'
                  }}
                >
                  <User size={16} style={{marginRight: '8px'}} />
                  Profile Settings
                </button>
                
                <button
                  className={`action-btn ${activeTab === 'password' ? 'active' : ''}`}
                  onClick={() => setActiveTab('password')}
                  style={{
                    padding: '12px 16px',
                    backgroundColor: activeTab === 'password' ? 'var(--hover-bg)' : 'transparent',
                    borderBottom: activeTab === 'password' ? '2px solid var(--accent-color)' : 'none'
                  }}
                >
                  <Lock size={16} style={{marginRight: '8px'}} />
                  Change Password
                </button>
                
                <button
                  className={`action-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                  style={{
                    padding: '12px 16px',
                    backgroundColor: activeTab === 'notifications' ? 'var(--hover-bg)' : 'transparent',
                    borderBottom: activeTab === 'notifications' ? '2px solid var(--accent-color)' : 'none'
                  }}
                >
                  <Bell size={16} style={{marginRight: '8px'}} />
                  Music Preferences
                </button>
              </div>

              <TabsContent value="profile">
                <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px'}}>
                  <Avatar style={{width: '80px', height: '80px'}}>
                    <AvatarFallback style={{backgroundColor: 'var(--accent-color)', color: 'white', fontSize: '24px'}}>
                      {profile.display_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <button className="action-btn">Change Photo</button>
                    <button className="action-btn" style={{marginLeft: '8px'}}>Remove Photo</button>
                  </div>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>First Name</label>
                    <input
                      type="text"
                      value={profile.display_name?.split(' ')[0] || ''}
                      onChange={(e) => {
                        const lastName = profile.display_name?.split(' ').slice(1).join(' ') || '';
                        setProfile({...profile, display_name: `${e.target.value} ${lastName}`.trim()});
                      }}
                      placeholder="John"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        outline: 'none',
                        backgroundColor: 'var(--sidebar-bg)'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Last Name</label>
                    <input
                      type="text"
                      value={profile.display_name?.split(' ').slice(1).join(' ') || ''}
                      onChange={(e) => {
                        const firstName = profile.display_name?.split(' ')[0] || '';
                        setProfile({...profile, display_name: `${firstName} ${e.target.value}`.trim()});
                      }}
                      placeholder="Doe"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        outline: 'none',
                        backgroundColor: 'var(--sidebar-bg)'
                      }}
                    />
                  </div>
                </div>

                <div style={{marginBottom: '16px'}}>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Email</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      outline: 'none',
                      backgroundColor: '#f3f4f6',
                      color: 'var(--text-secondary)'
                    }}
                  />
                </div>

                <div style={{marginBottom: '16px'}}>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Primary Instrument</label>
                  <select
                    value={profile.primary_instrument || 'Bass Guitar'}
                    onChange={(e) => setProfile({...profile, primary_instrument: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      outline: 'none',
                      backgroundColor: 'var(--sidebar-bg)'
                    }}
                  >
                    <option value="Bass Guitar">Bass Guitar</option>
                    <option value="Guitar">Guitar</option>
                    <option value="Drums">Drums</option>
                    <option value="Vocals">Vocals</option>
                    <option value="Piano">Piano</option>
                    <option value="Violin">Violin</option>
                  </select>
                </div>

                <div style={{marginBottom: '16px'}}>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Bio</label>
                  <textarea
                    value={profile.bio || ''}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    placeholder="Passionate bass player with 10+ years of experience. Love jazz fusion and funk. Always looking for new collaboration opportunities!"
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      outline: 'none',
                      backgroundColor: 'var(--sidebar-bg)',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{marginBottom: '24px'}}>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Location</label>
                  <input
                    type="text"
                    value={profile.location || ''}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    placeholder="Los Angeles, CA"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      outline: 'none',
                      backgroundColor: 'var(--sidebar-bg)'
                    }}
                  />
                </div>

                <button 
                  onClick={handleProfileUpdate}
                  disabled={saveLoading}
                  className="post-btn"
                  style={{marginRight: '12px'}}
                >
                  {saveLoading ? 'Saving...' : 'Save Profile Changes'}
                </button>
              </TabsContent>

              <TabsContent value="password">
                <div style={{marginBottom: '24px'}}>
                  <h3 style={{marginBottom: '16px', fontSize: '18px'}}>Change Password</h3>
                  
                  <div style={{marginBottom: '16px'}}>
                    <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Current Password</label>
                    <div style={{position: 'relative'}}>
                      <input
                        type={showPasswords ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your current password"
                        style={{
                          width: '100%',
                          padding: '8px 40px 8px 12px',
                          border: '1px solid var(--border-color)',
                          borderRadius: '6px',
                          outline: 'none',
                          backgroundColor: 'var(--sidebar-bg)'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(!showPasswords)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div style={{marginBottom: '16px'}}>
                    <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>New Password</label>
                    <input
                      type={showPasswords ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Create a new password"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        outline: 'none',
                        backgroundColor: 'var(--sidebar-bg)'
                      }}
                    />
                    <p style={{fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px'}}>
                      Password must be at least 8 characters
                    </p>
                  </div>

                  <div style={{marginBottom: '24px'}}>
                    <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Confirm New Password</label>
                    <input
                      type={showPasswords ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        outline: 'none',
                        backgroundColor: 'var(--sidebar-bg)'
                      }}
                    />
                  </div>

                  <button 
                    onClick={handlePasswordUpdate}
                    disabled={saveLoading || !currentPassword || !newPassword || !confirmPassword}
                    className="post-btn"
                  >
                    {saveLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </TabsContent>

              <TabsContent value="notifications">
                <div style={{marginBottom: '24px'}}>
                  <h3 style={{marginBottom: '16px', fontSize: '18px'}}>
                    <Music size={16} style={{marginRight: '8px', verticalAlign: 'middle'}} />
                    Music Preferences
                  </h3>
                  
                  <div style={{marginBottom: '24px'}}>
                    <h4 style={{marginBottom: '12px', fontSize: '16px'}}>Favorite Genres (select up to 5)</h4>
                    
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px'}}>
                      {/*
                        TODO: Replace with dynamic genre options
                      */}
                      {['Jazz', 'Rock', 'Blues', 'Classical', 'Electronic', 'Reggae', 'Folk', 'Hip Hop', 'Country'].map((genre) => (
                        <label key={genre} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                          <input
                            type="checkbox"
                            defaultChecked={['Jazz', 'Rock', 'Blues'].includes(genre)}
                            style={{
                              width: '16px',
                              height: '16px',
                              accentColor: 'var(--accent-color)'
                            }}
                          />
                          <span style={{fontSize: '14px'}}>{genre}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={handleSettingsUpdate}
                    disabled={saveLoading}
                    className="post-btn"
                  >
                    {saveLoading ? 'Saving...' : 'Save Profile Changes'}
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Right Sidebar - Empty for settings */}
        <aside className="right-sidebar">
          <div>
            <h3 style={{marginBottom: '16px', fontSize: '16px'}}>
              <Info size={16} style={{marginRight: '8px'}} />
              Account Actions
            </h3>
            
            <button 
              onClick={handleSignOut}
              className="action-btn"
              style={{
                width: '100%',
                justifyContent: 'center',
                color: '#dc2626',
                border: '1px solid #dc2626',
                marginBottom: '12px'
              }}
            >
              Sign Out
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AccountSettings;