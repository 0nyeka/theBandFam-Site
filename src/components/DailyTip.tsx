import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card.tsx';
import { Lightbulb, RefreshCw, Heart, Shield } from 'lucide-react';

interface Tip {
  id: string;
  title: string;
  message: string;
  category: 'safety' | 'fun' | 'tech' | 'general';
}

export function DailyTip() {
  const [currentTip, setCurrentTip] = useState<Tip | null>(null);
  const [tipIndex, setTipIndex] = useState(0);

  const tips: Tip[] = [
    {
      id: '1',
      title: "Today's Safety Tip",
      message: "Not everything you see online is real — you're smarter now that you know about AI videos!",
      category: 'safety'
    },
    {
      id: '2',
      title: "Fun Fact",
      message: "Did you know? AI can learn to copy voices so well, it only needs 3 seconds of someone talking!",
      category: 'fun'
    },
    {
      id: '3',
      title: "Tech Tip",
      message: "Real videos usually have natural lighting and shadows. Fake ones might look too perfect!",
      category: 'tech'
    },
    {
      id: '4',
      title: "Stay Smart",
      message: "If a video seems too crazy to be true, it might be fake! Always ask a grown-up if you're unsure.",
      category: 'safety'
    },
    {
      id: '5',
      title: "Cool Knowledge",
      message: "The word 'deepfake' comes from 'deep learning' - that's how computers learn to make fake videos!",
      category: 'fun'
    },
    {
      id: '6',
      title: "Detection Tip",
      message: "Look for weird blinking! Fake faces sometimes blink in strange ways or not at all.",
      category: 'tech'
    },
    {
      id: '7',
      title: "Be a Detective",
      message: "You're like a digital detective now! You help keep the internet safer for everyone.",
      category: 'general'
    },
    {
      id: '8',
      title: "Fun Fact",
      message: "Movie studios use similar technology to make characters look younger or older in films!",
      category: 'fun'
    },
    {
      id: '9',
      title: "Safety First",
      message: "Never share videos that might be fake. When in doubt, don't pass it about!",
      category: 'safety'
    },
    {
      id: '10',
      title: "Super Skill",
      message: "Knowing about AI videos is a superpower! You can help protect your friends and family.",
      category: 'general'
    }
  ];

  useEffect(() => {
    // Get today's tip based on the day of year
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const todaysTipIndex = dayOfYear % tips.length;
    setTipIndex(todaysTipIndex);
    setCurrentTip(tips[todaysTipIndex]);
  }, []);

  const getNextTip = () => {
    const nextIndex = (tipIndex + 1) % tips.length;
    setTipIndex(nextIndex);
    setCurrentTip(tips[nextIndex]);
  };

  const getCategoryIcon = () => {
    if (!currentTip) return Lightbulb;
    
    switch (currentTip.category) {
      case 'safety':
        return Shield;
      case 'fun':
        return Heart;
      case 'tech':
        return Lightbulb;
      default:
        return Lightbulb;
    }
  };

  const getCategoryColor = () => {
    if (!currentTip) return 'from-blue-400 to-blue-600';
    
    switch (currentTip.category) {
      case 'safety':
        return 'from-green-400 to-green-600';
      case 'fun':
        return 'from-pink-400 to-purple-600';
      case 'tech':
        return 'from-blue-400 to-blue-600';
      default:
        return 'from-yellow-400 to-orange-600';
    }
  };

  if (!currentTip) return null;

  const Icon = getCategoryIcon();

  return (
    <Card className="border-2 border-indigo-200 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getCategoryColor()} flex items-center justify-center`}>
              <Icon className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-indigo-800">{currentTip.title}</span>
          </div>
          <button
            onClick={getNextTip}
            className="p-1 hover:bg-indigo-100 rounded-full transition-colors"
            aria-label="Next tip"
          >
            <RefreshCw className="h-4 w-4 text-indigo-600" />
          </button>
        </div>
        
        <p className="text-sm font-medium text-indigo-700 leading-relaxed">
          {currentTip.message}
        </p>
        
        <div className="mt-3 text-xs text-indigo-500">
          💡 Tip {tipIndex + 1} of {tips.length}
        </div>
      </CardContent>
    </Card>
  );
}