import { Button } from './ui/button.tsx';
import { Home, Search, Plus, MessageCircle, User } from 'lucide-react';

type Tab = 'feed' | 'discover' | 'create' | 'messages' | 'profile';

interface BottomNavigationProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomNavigation({ currentTab, onTabChange }: BottomNavigationProps) {
  const navItems = [
    { id: 'feed' as Tab, icon: Home, label: 'Feed' },
    { id: 'discover' as Tab, icon: Search, label: 'Discover' },
    { id: 'create' as Tab, icon: Plus, label: 'Create' },
    { id: 'messages' as Tab, icon: MessageCircle, label: 'Messages' },
    { id: 'profile' as Tab, icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 backdrop-blur-sm bg-opacity-95 z-50">
      <div className="max-w-md mx-auto px-4 py-2 safe-area-inset">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-0 ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : ''}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : ''}`}>
                  {item.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}