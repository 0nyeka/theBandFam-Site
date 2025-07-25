import { Button } from './ui/button.tsx';
import { Home, Search, PlusCircle, MessageSquare, User } from 'lucide-react';

type Tab = 'feed' | 'discover' | 'create' | 'messages' | 'profile';

interface BottomNavigationProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomNavigation({ currentTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="max-w-md mx-auto px-6 py-2 flex justify-between">
        <button 
          onClick={() => onTabChange('feed')}
          className="flex flex-col items-center px-3 pt-2 pb-1"
        >
          <Home className={`h-6 w-6 ${currentTab === 'feed' ? 'text-purple-600 fill-purple-100' : 'text-gray-500'}`} />
          <span className={`text-xs mt-1 ${currentTab === 'feed' ? 'text-purple-600' : 'text-gray-500'}`}>
            Feed
          </span>
        </button>

        <button 
          onClick={() => onTabChange('discover')}
          className="flex flex-col items-center px-3 pt-2 pb-1"
        >
          <Search className={`h-6 w-6 ${currentTab === 'discover' ? 'text-purple-600' : 'text-gray-500'}`} />
          <span className={`text-xs mt-1 ${currentTab === 'discover' ? 'text-purple-600' : 'text-gray-500'}`}>
            Discover
          </span>
        </button>

        <button 
          onClick={() => onTabChange('create')}
          className="flex flex-col items-center px-3 pt-2 pb-1"
        >
          <div className={`rounded-full p-1 ${currentTab === 'create' ? 'bg-purple-600' : 'bg-gray-200'}`}>
            <PlusCircle className={`h-6 w-6 ${currentTab === 'create' ? 'text-white' : 'text-gray-500'}`} />
          </div>
          <span className={`text-xs mt-1 ${currentTab === 'create' ? 'text-purple-600' : 'text-gray-500'}`}>
            Create
          </span>
        </button>

        <button 
          onClick={() => onTabChange('messages')}
          className="flex flex-col items-center px-3 pt-2 pb-1"
        >
          <MessageSquare className={`h-6 w-6 ${currentTab === 'messages' ? 'text-purple-600' : 'text-gray-500'}`} />
          <span className={`text-xs mt-1 ${currentTab === 'messages' ? 'text-purple-600' : 'text-gray-500'}`}>
            Messages
          </span>
        </button>

        <button 
          onClick={() => onTabChange('profile')}
          className="flex flex-col items-center px-3 pt-2 pb-1"
        >
          <User className={`h-6 w-6 ${currentTab === 'profile' ? 'text-purple-600' : 'text-gray-500'}`} />
          <span className={`text-xs mt-1 ${currentTab === 'profile' ? 'text-purple-600' : 'text-gray-500'}`}>
            Profile
          </span>
        </button>
      </div>
    </div>
  );
}