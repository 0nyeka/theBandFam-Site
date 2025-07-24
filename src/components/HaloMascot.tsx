import { useState, useEffect } from 'react';
import { Shield, Eye, Heart, Star, Sparkles } from 'lucide-react';

interface HaloMascotProps {
  mood: 'happy' | 'alert' | 'scanning' | 'proud' | 'sleeping';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function HaloMascot({ mood, message, size = 'md' }: HaloMascotProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    
    if (message) {
      setShowMessage(true);
      const messageTimer = setTimeout(() => setShowMessage(false), 4000);
      return () => {
        clearTimeout(timer);
        clearTimeout(messageTimer);
      };
    }
    
    return () => clearTimeout(timer);
  }, [mood, message]);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const getMascotStyle = () => {
    const baseClasses = `${sizeClasses[size]} rounded-full flex items-center justify-center relative transition-all duration-500`;
    
    switch (mood) {
      case 'happy':
        return `${baseClasses} bg-gradient-to-br from-blue-400 to-blue-600 ${isAnimating ? 'animate-bounce' : ''}`;
      case 'alert':
        return `${baseClasses} bg-gradient-to-br from-orange-400 to-red-500 ${isAnimating ? 'animate-pulse' : ''}`;
      case 'scanning':
        return `${baseClasses} bg-gradient-to-br from-purple-400 to-purple-600 ${isAnimating ? 'animate-spin' : ''}`;
      case 'proud':
        return `${baseClasses} bg-gradient-to-br from-green-400 to-green-600 ${isAnimating ? 'animate-bounce' : ''}`;
      case 'sleeping':
        return `${baseClasses} bg-gradient-to-br from-gray-300 to-gray-500`;
      default:
        return `${baseClasses} bg-gradient-to-br from-blue-400 to-blue-600`;
    }
  };

  const getEyeExpression = () => {
    switch (mood) {
      case 'happy':
      case 'proud':
        return (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 flex space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        );
      case 'alert':
        return (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 flex space-x-1">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        );
      case 'scanning':
        return (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
            <Sparkles className="h-4 w-4 text-white animate-pulse" />
          </div>
        );
      case 'sleeping':
        return (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 flex space-x-1">
            <div className="w-2 h-1 bg-white rounded-full"></div>
            <div className="w-2 h-1 bg-white rounded-full"></div>
          </div>
        );
      default:
        return null;
    }
  };

  const getMouth = () => {
    if (mood === 'happy' || mood === 'proud') {
      return (
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
          <div className="w-4 h-2 border-b-2 border-white rounded-full"></div>
        </div>
      );
    }
    return null;
  };

  const getDecorations = () => {
    if (mood === 'proud') {
      return (
        <div className="absolute -top-2 -right-2">
          <Star className="h-4 w-4 text-yellow-400 animate-pulse" />
        </div>
      );
    }
    if (mood === 'happy') {
      return (
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-4 border-t-4 border-yellow-400 rounded-full animate-pulse"></div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative">
      <div className={getMascotStyle()}>
        <Shield className={`${iconSizes[size]} text-white`} />
        {getEyeExpression()}
        {getMouth()}
        {getDecorations()}
      </div>
      
      {showMessage && message && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white border-2 border-blue-200 rounded-lg p-2 shadow-lg animate-fade-in z-10">
          <p className="text-xs font-medium text-blue-800 whitespace-nowrap">{message}</p>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-r-2 border-b-2 border-blue-200 rotate-45"></div>
        </div>
      )}
    </div>
  );
}