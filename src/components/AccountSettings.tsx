import { useState, useEffect, useRef } from 'react';
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
  Compass,
  Upload,
  X
} from 'lucide-react';
import { 
  getCurrentUser, 
  fetchProfile, 
  updateProfile,
  updatePassword,
  updateUserSettings,
  signOut,
  supabase
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  const [settings, setSettings] = useState<any>({
    email_notifications: true,
    privacy_level: 'public',
    theme_preference: 'light'
  });
  
  // Photo upload states
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  
  // Error and success messages
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Update the display logic throughout the component
  const displayName = profile.display_name || user?.email || "User";
  const primaryInstrument = profile.primary_instrument || "Musician";

  // Create separate state for form inputs (temporary values while editing)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    primaryInstrument: '',
    bio: '',
    location: '',
    availabilityStatus: ''
  });

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
          
          // Initialize form data with profile values
          setFormData({
            firstName: profile.display_name?.split(' ')[0] || '',
            lastName: profile.display_name?.split(' ').slice(1).join(' ') || '',
            primaryInstrument: profile.primary_instrument || 'Bass Guitar',
            bio: profile.bio || '',
            location: profile.location || '',
            availabilityStatus: profile.availability_status || 'available'
          });
          
          // Set image preview if profile has image
          if (profile.profile_image_url) {
            setImagePreview(profile.profile_image_url);
          }
        } else {
          // Set default form values if no profile exists
          setFormData({
            firstName: '',
            lastName: '',
            primaryInstrument: 'Bass Guitar',
            bio: '',
            location: '',
            availabilityStatus: 'available'
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [navigate]);

  // Add image resizing function
  const resizeImage = (file: File, maxWidth: number = 400, maxHeight: number = 400, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            }
          },
          file.type,
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 10MB for initial upload, we'll compress it)
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size must be less than 10MB');
        return;
      }
      
      try {
        setUploadLoading(true);
        setError(null);
        
        // Resize the image to be smaller
        const resizedFile = await resizeImage(file, 400, 400, 0.8);
        
        setSelectedImage(resizedFile);
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(resizedFile);
        
        setError(null);
      } catch (error) {
        setError('Failed to process image');
      } finally {
        setUploadLoading(false);
      }
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage || !user) {
      return;
    }

    setUploadLoading(true);
    setError(null);

    try {
      // Check if bucket exists first
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        throw new Error('Failed to check storage buckets');
      }

      const bucketExists = buckets?.some(bucket => bucket.name === 'profile-images');
      
      if (!bucketExists) {
        throw new Error('Storage bucket "profile-images" not found. Please create it in your Supabase dashboard under Storage > New bucket.');
      }

      const fileExt = selectedImage.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload image to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, selectedImage, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      // Update profile with new image URL
      const { error: updateError } = await updateProfile(user.id, {
        ...profile,
        profile_image_url: publicUrl
      });

      if (updateError) {
        throw updateError;
      }

      // Update local state
      setProfile({ ...profile, profile_image_url: publicUrl });
      setSelectedImage(null);
      setSuccess('Profile photo updated successfully');

    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload image');
      // Reset preview on error
      setImagePreview(profile.profile_image_url || null);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!user) return;

    setUploadLoading(true);
    setError(null);

    try {
      // If there's an existing image, try to delete it from storage
      if (profile.profile_image_url) {
        const urlParts = profile.profile_image_url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        if (fileName) {
          await supabase.storage
            .from('profile-images')
            .remove([fileName]);
        }
      }

      // Update profile to remove image URL
      const { error: updateError } = await updateProfile(user.id, {
        ...profile,
        profile_image_url: null
      });

      if (updateError) {
        throw updateError;
      }

      // Update local state
      setProfile({ ...profile, profile_image_url: null });
      setImagePreview(null);
      setSelectedImage(null);
      setSuccess('Profile photo removed successfully');

    } catch (err: any) {
      setError(err.message || 'Failed to remove photo');
    } finally {
      setUploadLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Update the handleProfileUpdate function to include primary_instrument
  const handleProfileUpdate = async () => {
    setError(null);
    setSuccess(null);
    setSaveLoading(true);
    
    try {
      const updatedProfile = {
        display_name: `${formData.firstName} ${formData.lastName}`.trim(),
        bio: formData.bio,
        location: formData.location,
        primary_instrument: formData.primaryInstrument,
        availability_status: formData.availabilityStatus
      };
      
      const { error } = await updateProfile(user.id, updatedProfile);
      
      if (error) throw error;
      
      // Update the actual profile state with the saved data
      setProfile({...profile, ...updatedProfile});
      
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
              {imagePreview ? (
                <AvatarImage 
                  src={imagePreview} 
                  alt="Profile" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <AvatarFallback style={{backgroundColor: 'var(--accent-color)', color: 'white'}}>
                  {displayName.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="main-content">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <div className="user-profile">
            <Avatar className="profile-img">
              {imagePreview ? (
                <AvatarImage 
                  src={imagePreview} 
                  alt="Profile" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <AvatarFallback style={{backgroundColor: 'var(--accent-color)', color: 'white'}}>
                  {displayName.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <h3>{displayName}</h3>
            <p>{primaryInstrument}</p>
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
                {/* Profile Photo Section */}
                <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px'}}>
                  <div style={{position: 'relative'}}>
                    <Avatar style={{width: '120px', height: '120px'}}>
                      {imagePreview ? (
                        <AvatarImage 
                          src={imagePreview} 
                          alt="Profile" 
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <AvatarFallback style={{backgroundColor: 'var(--accent-color)', color: 'white', fontSize: '32px'}}>
                          {displayName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {uploadLoading && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                        flexDirection: 'column'
                      }}>
                        <div 
                          className="loading-spinner"
                          style={{
                            width: '20px',
                            height: '20px',
                            border: '2px solid white',
                            borderTop: '2px solid transparent',
                            borderRadius: '50%',
                            marginBottom: '4px'
                          }}
                        ></div>
                        {selectedImage ? 'Processing...' : 'Uploading...'}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      style={{ display: 'none' }}
                    />
                    
                    <div style={{display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap'}}>
                      <button 
                        className="action-btn"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadLoading}
                      >
                        <Upload size={14} style={{marginRight: '4px'}} />
                        {imagePreview ? 'Change Photo' : 'Upload Photo'}
                      </button>
                      
                      {selectedImage && (
                        <button 
                          className="post-btn"
                          onClick={handleImageUpload}
                          disabled={uploadLoading}
                          style={{fontSize: '14px', padding: '6px 12px'}}
                        >
                          {uploadLoading ? 'Uploading...' : 'Save Photo'}
                        </button>
                      )}
                      
                      {imagePreview && !uploadLoading && (
                        <button 
                          className="action-btn"
                          onClick={handleRemovePhoto}
                          disabled={uploadLoading}
                          style={{color: '#dc2626'}}
                        >
                          <X size={14} style={{marginRight: '4px'}} />
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div style={{marginTop: '8px', fontSize: '12px', color: 'var(--text-secondary)'}}>
                      {selectedImage && (
                        <p style={{margin: 0}}>
                          Click "Save Photo" to apply changes
                        </p>
                      )}
                      <p style={{margin: '4px 0 0 0'}}>
                        Images will be automatically resized to 400x400px for optimal performance
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{marginBottom: '16px'}}>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="John"
                    style={{
                      width: 'calc(100% - 30px)',
                      padding: '8px 12px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      outline: 'none',
                      backgroundColor: 'var(--sidebar-bg)'
                    }}
                  />
                </div>
                
                <div style={{marginBottom: '16px'}}>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    placeholder="Doe"
                    style={{
                      width: 'calc(100% - 30px)',
                      padding: '8px 12px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      outline: 'none',
                      backgroundColor: 'var(--sidebar-bg)'
                    }}
                  />
                </div>

                <div style={{marginBottom: '16px'}}>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Primary Instrument</label>
                  <select
                    value={formData.primaryInstrument}
                    onChange={(e) => setFormData({...formData, primaryInstrument: e.target.value})}
                    style={{
                      width: 'calc(100% - 4px)',
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
                    <option value="Saxophone">Saxophone</option>
                    <option value="Trumpet">Trumpet</option>
                    <option value="Keyboard">Keyboard</option>
                    <option value="Flute">Flute</option>
                  </select>
                </div>

                <div style={{marginBottom: '16px'}}>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    placeholder="Passionate bass player with 10+ years of experience. Love jazz fusion and funk. Always looking for new collaboration opportunities!"
                    rows={4}
                    style={{
                      width: 'calc(100% - 30px)',
                      padding: '8px 12px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      outline: 'none',
                      backgroundColor: 'var(--sidebar-bg)',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{marginBottom: '16px'}}>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Los Angeles, CA"
                    style={{
                      width: 'calc(100% - 30px)',
                      padding: '8px 12px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      outline: 'none',
                      backgroundColor: 'var(--sidebar-bg)'
                    }}
                  />
                </div>

                <div style={{marginBottom: '24px'}}>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Availability Status</label>
                  <select
                    value={formData.availabilityStatus}
                    onChange={(e) => setFormData({...formData, availabilityStatus: e.target.value})}
                    style={{
                      width: 'calc(100% - 4px)',
                      padding: '8px 12px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      outline: 'none',
                      backgroundColor: 'var(--sidebar-bg)'
                    }}
                  >
                    <option value="available">Available for collaboration</option>
                    <option value="busy">Busy</option>
                    <option value="unavailable">Not available</option>
                  </select>
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
                          width: 'calc(100% - 60px)',
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
                        width: 'calc(100% - 30px)',
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
                        width: 'calc(100% - 30px)',
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

      {/* Add the CSS as a regular style tag */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .loading-spinner {
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  );
};

export default AccountSettings;