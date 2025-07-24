import { useState } from 'react';
import { Card, CardContent } from './ui/card.tsx';
import { Button } from './ui/button.tsx';
import { Badge } from './ui/badge.tsx';
import { Switch } from './ui/switch.tsx';
import { 
  Shield, 
  AlertTriangle, 
  Lightbulb, 
  Zap,
  Eye,
  TrendingUp,
  Heart
} from 'lucide-react';

interface Detection {
  id: string;
  app: string;
  appIcon: string;
  gradient: string;
  confidence: number;
  timestamp: string;
  description: string;
  status: 'ai-detected' | 'human-verified';
}

interface HomeProps {
  username: string;
  protectionEnabled: boolean;
  onProtectionToggle: (enabled: boolean) => void;
  currentApp: string;
  latestDetection: Detection | null;
  totalChecked: number;
  totalFakes: number;
}

export function Home({ 
  username, 
  protectionEnabled, 
  onProtectionToggle, 
  currentApp, 
  latestDetection,
  totalChecked,
  totalFakes
}: HomeProps) {
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    "Not everything you see online is real — stay curious and question what you watch!",
    "Look for unnatural blinking or weird facial movements in videos",
    "If something seems too good to be true, it probably is",
    "Always verify shocking news with trusted sources",
    "Trust your instincts — if something feels off, it might be fake"
  ];

  const getProtectionStatus = () => {
    if (protectionEnabled) {
      return {
        icon: Shield,
        text: "Protection Active",
        subtext: `Monitoring ${currentApp}`,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200"
      };
    } else {
      return {
        icon: Shield,
        text: "Protection Off",
        subtext: "Tap to enable monitoring",
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200"
      };
    }
  };

  const status = getProtectionStatus();
  const StatusIcon = status.icon;

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % tips.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-20">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="px-6 pt-12 pb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-blue-800">HaloScan</h1>
              <p className="text-blue-600 font-medium">Hi, {username}!</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="px-6 space-y-6">
          {/* Protection Status */}
          <Card className={`border-2 ${status.borderColor} shadow-sm ${status.bgColor}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${status.bgColor} rounded-full flex items-center justify-center`}>
                    <StatusIcon className={`h-5 w-5 ${status.color}`} />
                  </div>
                  <div>
                    <p className={`font-bold ${status.color}`}>{status.text}</p>
                    <p className="text-sm text-gray-600">{status.subtext}</p>
                  </div>
                </div>
                <Switch
                  checked={protectionEnabled}
                  onCheckedChange={onProtectionToggle}
                  className="data-[state=checked]:bg-blue-500 scale-110"
                />
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-2 border-blue-200 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{totalChecked}</div>
                <p className="text-sm text-blue-800 font-medium">Videos Checked</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-red-200 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">{totalFakes}</div>
                <p className="text-sm text-red-800 font-medium">Fakes Found</p>
              </CardContent>
            </Card>
          </div>

          {/* Latest Detection */}
          {protectionEnabled && latestDetection && (
            <Card className="border-2 border-orange-200 shadow-sm bg-gradient-to-r from-orange-50 to-red-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${latestDetection.gradient} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">{latestDetection.appIcon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-800">{latestDetection.app}</p>
                      <Badge variant="destructive" className="bg-red-500 text-white">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Fake
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{latestDetection.timestamp}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 font-medium mb-3">
                  {latestDetection.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Confidence</span>
                    <span className="text-sm font-bold text-gray-800">{latestDetection.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${latestDetection.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <p className="font-bold text-purple-800 mb-1">Quick Scan</p>
                <p className="text-xs text-purple-600">Upload & check a video</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-indigo-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <p className="font-bold text-indigo-800 mb-1">View History</p>
                <p className="text-xs text-indigo-600">See past detections</p>
              </CardContent>
            </Card>
          </div>

          {/* Daily Tip */}
          <Card className="border-2 border-green-200 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-green-800">Daily Tip</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={nextTip}
                  className="text-green-600 hover:text-green-700 hover:bg-green-100"
                >
                  Next
                </Button>
              </div>
              
              <p className="text-sm text-green-700 leading-relaxed">
                {tips[tipIndex]}
              </p>
            </CardContent>
          </Card>

          {/* Privacy Assurance */}
          <Card className="border-2 border-blue-200 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-blue-800">Privacy Safe</span>
              </div>
              
              <div className="space-y-2 text-sm text-blue-700">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span>We don't save your videos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>No tracking or ads</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}