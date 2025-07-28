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
  Info
} from 'lucide-react';
import { 
  getCurrentUser, 
  fetchProfile, 
  updateProfile,
  updatePassword,
  updateUserSettings
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
        
        // TODO: Fetch settings when implemented
        // const { settings } = await fetchUserSettings(user.id);
        // if (settings) {
        //   setSettings(settings);
        // }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [navigate]);

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
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading account settings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="mr-2"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
        </div>
        
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
        
        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="p-3 bg-green-50 text-green-700 rounded-md mb-4">
            {success}
          </div>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="h-4 w-4 mr-2" /> Profile
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center">
              <Lock className="h-4 w-4 mr-2" /> Password
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" /> Preferences
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile details and how others see you on MuseConnect
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <Avatar className="h-20 w-20">
                    {profile.profile_image_url ? (
                      <AvatarImage src={profile.profile_image_url} alt="Profile" />
                    ) : (
                      <AvatarFallback className="text-xl bg-indigo-600 text-white">
                        {profile.display_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <Button variant="outline" size="sm">
                      Upload Photo
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={profile.display_name || ''}
                    onChange={(e) => setProfile({...profile, display_name: e.target.value})}
                    placeholder="How others will see you"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user.email}
                    disabled
                    className="w-full bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="location"
                      value={profile.location || ''}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                      placeholder="City, Country"
                      className="w-full pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio || ''}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    placeholder="Tell others about yourself and your musical background"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select 
                    value={profile.availability_status || 'available'} 
                    onValueChange={(value) => setProfile({...profile, availability_status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available for projects</SelectItem>
                      <SelectItem value="busy">Currently busy</SelectItem>
                      <SelectItem value="not_available">Not available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={handleProfileUpdate}
                  disabled={saveLoading}
                  className="w-full sm:w-auto"
                >
                  {saveLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Update Password</CardTitle>
                <CardDescription>
                  Change your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPasswords ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter your current password"
                      className="w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPasswords ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Create a new password"
                      className="w-full pr-10"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Password must be at least 8 characters</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPasswords ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      className="w-full pr-10"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handlePasswordUpdate}
                  disabled={saveLoading || !currentPassword || !newPassword || !confirmPassword}
                  className="w-full sm:w-auto"
                >
                  {saveLoading ? 'Updating...' : 'Update Password'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification & Privacy Settings</CardTitle>
                <CardDescription>
                  Manage how you receive notifications and control your privacy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Email Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="font-normal">
                        Email notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive email notifications about new messages and invites
                      </p>
                    </div>
                    <Switch 
                      id="email-notifications"
                      checked={settings.email_notifications}
                      onCheckedChange={(checked) => setSettings({...settings, email_notifications: checked})}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Privacy Settings</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="privacy">Profile Privacy</Label>
                    <Select 
                      value={settings.privacy_level} 
                      onValueChange={(value) => setSettings({...settings, privacy_level: value})}
                    >
                      <SelectTrigger id="privacy">
                        <SelectValue placeholder="Select privacy level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Anyone can view your profile</SelectItem>
                        <SelectItem value="registered">Registered - Only MuseConnect users can view your profile</SelectItem>
                        <SelectItem value="private">Private - Only connections can view your profile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Appearance</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select 
                      value={settings.theme_preference} 
                      onValueChange={(value) => setSettings({...settings, theme_preference: value})}
                    >
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleSettingsUpdate}
                  disabled={saveLoading}
                  className="w-full sm:w-auto"
                >
                  {saveLoading ? 'Saving...' : 'Save Preferences'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountSettings;