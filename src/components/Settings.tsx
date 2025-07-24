import { useState } from 'react';
import { Switch } from './ui/switch.tsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.tsx';
import { Button } from './ui/button.tsx';
import { Badge } from './ui/badge.tsx';
import { Slider } from './ui/slider.tsx';
import { 
  ArrowLeft, 
  Shield, 
  Bell, 
  Smartphone, 
  Volume2, 
  Vibrate,
  Info,
  User,
  Lock
} from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
  notifications: boolean;
  onNotificationsChange: (enabled: boolean) => void;
  username: string;
  soundEnabled?: boolean;
  onSoundChange?: (enabled: boolean) => void;
}

export function Settings({ 
  onBack, 
  notifications, 
  onNotificationsChange, 
  username,
  soundEnabled = true,
  onSoundChange
}: SettingsProps) {
  const [vibration, setVibration] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState([75]);
  const [parentMode, setParentMode] = useState(false);
  const [parentPin, setParentPin] = useState('');
  
  const [appSettings, setAppSettings] = useState({
    tiktok: true,
    youtube: true,
    instagram: true,
    snapchat: false,
    twitter: false,
  });

  const handleAppToggle = (app: string) => {
    setAppSettings(prev => ({
      ...prev,
      [app]: !prev[app as keyof typeof prev]
    }));
  };

  const handleParentMode = () => {
    if (!parentMode) {
      const pin = prompt('Parents: Enter a 4-digit PIN to access advanced settings:');
      if (pin && pin.length === 4) {
        setParentPin(pin);
        setParentMode(true);
      }
    } else {
      setParentMode(false);
    }
  };

  const apps = [
    { id: 'tiktok', name: 'TikTok', icon: 'T', gradient: 'from-pink-500 to-purple-600' },
    { id: 'youtube', name: 'YouTube', icon: 'Y', gradient: 'from-red-500 to-red-600' },
    { id: 'instagram', name: 'Instagram', icon: 'I', gradient: 'from-purple-500 to-pink-500' },
    { id: 'snapchat', name: 'Snapchat', icon: 'S', gradient: 'from-yellow-400 to-yellow-500' },
    { id: 'twitter', name: 'X (Twitter)', icon: 'X', gradient: 'from-gray-800 to-black' },
  ];

  return (
    <div className="max-w-sm mx-auto min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-3 h-10 w-10 hover:bg-blue-100"
          >
            <ArrowLeft className="h-5 w-5 text-blue-600" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-800">Settings</h1>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <User className="h-4 w-4 text-blue-500" />
          <p className="text-blue-600 font-medium">Hi, {username}!</p>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Parent Mode Toggle */}
        <Card className="border-2 border-orange-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-bold text-orange-800">Parent Mode</p>
                  <p className="text-sm text-orange-600">Access advanced settings</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleParentMode}
                className="border-2 border-orange-200 hover:bg-orange-50"
              >
                {parentMode ? 'Exit' : 'Enter'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Monitoring */}
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold flex items-center text-blue-800">
              <Smartphone className="h-5 w-5 mr-2 text-blue-600" />
              Which Apps Should I Watch?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {apps.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${app.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-sm">{app.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{app.name}</p>
                    <p className="text-sm text-gray-600">
                      {appSettings[app.id as keyof typeof appSettings] ? '✅ Watching' : '❌ Not watching'}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={appSettings[app.id as keyof typeof appSettings]}
                  onCheckedChange={() => handleAppToggle(app.id)}
                  className="data-[state=checked]:bg-blue-500 scale-110"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Detection Settings - Only show in parent mode */}
        {parentMode && (
          <Card className="border-2 border-green-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center text-green-800">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                Detection Sensitivity (Advanced)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <label className="font-bold text-gray-800">
                    Confidence Threshold
                  </label>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 font-bold">
                    {confidenceThreshold[0]}% Sure
                  </Badge>
                </div>
                <Slider
                  value={confidenceThreshold}
                  onValueChange={setConfidenceThreshold}
                  max={100}
                  min={50}
                  step={5}
                  className="w-full"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Only alert when confidence is at least {confidenceThreshold[0]}%
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notifications */}
        <Card className="border-2 border-purple-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold flex items-center text-purple-800">
              <Bell className="h-5 w-5 mr-2 text-purple-600" />
              How Should I Tell You?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div>
                <p className="font-bold text-gray-800">Pop-Up Messages</p>
                <p className="text-sm text-gray-600">Show messages when I find fake videos</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={onNotificationsChange}
                className="data-[state=checked]:bg-purple-500 scale-110"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div className="flex items-center space-x-3">
                <Volume2 className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-bold text-gray-800">Sound Effects</p>
                  <p className="text-sm text-gray-600">Play fun sounds with alerts</p>
                </div>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={onSoundChange}
                disabled={!notifications}
                className="data-[state=checked]:bg-blue-500 scale-110"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div className="flex items-center space-x-3">
                <Vibrate className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-bold text-gray-800">Vibration</p>
                  <p className="text-sm text-gray-600">Make phone buzz</p>
                </div>
              </div>
              <Switch
                checked={vibration}
                onCheckedChange={setVibration}
                disabled={!notifications}
                className="data-[state=checked]:bg-blue-500 scale-110"
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Information */}
        <Card className="border-2 border-green-200 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-bold text-green-800">Your Data is Safe!</span>
              </div>
              
              <div className="text-sm text-green-700 space-y-2">
                <p>🔒 <strong>No tracking:</strong> We don't follow you around</p>
                <p>📹 <strong>No storage:</strong> Your videos aren't saved</p>
                <p>🚫 <strong>No ads:</strong> Just safety, nothing else</p>
                <p>👨‍👩‍👧‍👦 <strong>Kid-friendly:</strong> Made with families in mind</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="border-2 border-gray-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Info className="h-6 w-6 text-gray-600" />
              <div>
                <p className="font-bold text-gray-800">About HaloScan</p>
                <p className="text-sm text-gray-600">Version 1.0.0 - Kid-Friendly Edition</p>
                <p className="text-xs text-gray-500 mt-1">Made with ❤️ for digital safety</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Safe Area */}
      <div className="h-8"></div>
    </div>
  );
}