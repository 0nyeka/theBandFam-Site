import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card.tsx';
import { Badge } from './ui/badge.tsx';
import { Star, Award, Trophy, Flame, Target } from 'lucide-react';

interface StreakData {
  dailyScans: number;
  streak: number;
  totalScans: number;
  badges: string[];
}

interface StreakTrackerProps {
  scansToday: number;
  onBadgeEarned?: (badge: string) => void;
}

export function StreakTracker({ scansToday, onBadgeEarned }: StreakTrackerProps) {
  const [streakData, setStreakData] = useState<StreakData>({
    dailyScans: scansToday,
    streak: 3,
    totalScans: 127,
    badges: ['First Scan', 'Detective']
  });

  const badges = [
    { id: 'first-scan', name: 'First Scan', icon: Star, requirement: 1, description: 'Scanned your first video!' },
    { id: 'detective', name: 'Detective', icon: Target, requirement: 5, description: 'Scanned 5 videos!' },
    { id: 'super-sleuth', name: 'Super Sleuth', icon: Award, requirement: 25, description: 'Scanned 25 videos!' },
    { id: 'streak-master', name: 'Streak Master', icon: Flame, requirement: 7, description: '7 days in a row!' },
    { id: 'champion', name: 'Champion', icon: Trophy, requirement: 100, description: 'Scanned 100 videos!' }
  ];

  const checkForNewBadges = () => {
    badges.forEach(badge => {
      if (!streakData.badges.includes(badge.name)) {
        let earned = false;
        
        if (badge.id === 'first-scan' && streakData.totalScans >= 1) earned = true;
        if (badge.id === 'detective' && streakData.totalScans >= 5) earned = true;
        if (badge.id === 'super-sleuth' && streakData.totalScans >= 25) earned = true;
        if (badge.id === 'streak-master' && streakData.streak >= 7) earned = true;
        if (badge.id === 'champion' && streakData.totalScans >= 100) earned = true;
        
        if (earned) {
          setStreakData(prev => ({
            ...prev,
            badges: [...prev.badges, badge.name]
          }));
          onBadgeEarned?.(badge.name);
        }
      }
    });
  };

  useEffect(() => {
    setStreakData(prev => ({
      ...prev,
      dailyScans: scansToday,
      totalScans: prev.totalScans + (scansToday - prev.dailyScans)
    }));
  }, [scansToday]);

  useEffect(() => {
    checkForNewBadges();
  }, [streakData.totalScans, streakData.streak]);

  const getStreakMessage = () => {
    if (streakData.dailyScans === 0) {
      return "Ready to start scanning? 🚀";
    } else if (streakData.dailyScans === 1) {
      return "Great start! You've scanned 1 video today! ⭐";
    } else if (streakData.dailyScans < 5) {
      return `Awesome! You've scanned ${streakData.dailyScans} videos today! 🎉`;
    } else {
      return `Wow! ${streakData.dailyScans} scans today - you're on fire! 🔥`;
    }
  };

  const getStreakColor = () => {
    if (streakData.streak >= 7) return 'text-purple-600';
    if (streakData.streak >= 3) return 'text-green-600';
    return 'text-blue-600';
  };

  return (
    <Card className="border-2 border-yellow-200 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="font-bold text-gray-800">Your Progress</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className={`font-bold ${getStreakColor()}`}>{streakData.streak}</span>
            <span className="text-sm text-gray-600">day streak!</span>
          </div>
        </div>
        
        <p className="text-sm font-medium text-gray-700 mb-3">
          {getStreakMessage()}
        </p>
        
        {/* Progress Bar */}
        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Today's Goal: 3 scans</span>
            <span className="font-medium text-gray-800">{Math.min(streakData.dailyScans, 3)}/3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((streakData.dailyScans / 3) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
        
        {/* Badges */}
        {streakData.badges.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-medium text-gray-600">Your Badges:</span>
            <div className="flex flex-wrap gap-1">
              {streakData.badges.map((badgeName) => {
                const badge = badges.find(b => b.name === badgeName);
                const Icon = badge?.icon || Star;
                return (
                  <Badge 
                    key={badgeName}
                    variant="secondary" 
                    className="bg-blue-100 text-blue-800 border-blue-200 text-xs"
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {badgeName}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}