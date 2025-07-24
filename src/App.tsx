import { useState } from 'react';
import { Toaster } from './components/ui/sonner.tsx';
import { Feed } from './components/Feed.tsx';
import { Discover } from './components/Discover.tsx';
import { Messages } from './components/Messages.tsx';
import { Profile } from './components/Profile.tsx';
import { Create } from './components/Create.tsx';
import { MusicianOnboarding } from './components/MusicianOnboarding.tsx';
import { BottomNavigation } from './components/BottomNavigation.tsx';
import { toast } from 'sonner';
import { supabase } from './utils/supabase.ts';

type Tab = 'feed' | 'discover' | 'create' | 'messages' | 'profile';

interface Musician {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  instruments: string[];
  genres: string[];
  experience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  location: string;
  isAvailable: boolean;
  followers: number;
  following: number;
  projects: number;
}

interface Post {
  id: string;
  musician: Musician;
  content: string;
  type: 'collaboration' | 'showcase' | 'looking-for' | 'jam-session';
  media?: {
    type: 'audio' | 'video' | 'image';
    url: string;
    duration?: string;
  };
  tags: string[];
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

interface Collaboration {
  id: string;
  title: string;
  description: string;
  creator: Musician;
  collaborators: Musician[];
  neededInstruments: string[];
  genre: string;
  deadline?: string;
  status: 'open' | 'in-progress' | 'completed';
  type: 'remote' | 'local' | 'hybrid';
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('feed');
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [currentUser, setCurrentUser] = useState<Musician | null>(null);

  // Mock data
  const [posts] = useState<Post[]>([
    {
      id: '1',
      musician: {
        id: '1',
        name: 'Alex Johnson',
        username: '@alexjdrums',
        bio: 'Professional drummer looking for collaboration',
        avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop&crop=face',
        instruments: ['Drums', 'Percussion'],
        genres: ['Rock', 'Jazz', 'Alternative'],
        experience: 'Professional',
        location: 'Los Angeles, CA',
        isAvailable: true,
        followers: 1250,
        following: 842,
        projects: 23
      },
      content: 'Looking for a bassist and guitarist to complete my rock trio! Working on original material with a modern twist on classic rock. Let\'s make some music! 🎸🥁',
      type: 'looking-for',
      media: {
        type: 'audio',
        url: 'https://example.com/drum-track.mp3',
        duration: '2:34'
      },
      tags: ['rock', 'trio', 'original', 'collaboration'],
      likes: 24,
      comments: 8,
      timestamp: '2 hours ago',
      isLiked: false
    },
    {
      id: '2',
      musician: {
        id: '2',
        name: 'Sarah Chen',
        username: '@sarahviolin',
        bio: 'Classical violinist exploring jazz fusion',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        instruments: ['Violin', 'Viola'],
        genres: ['Classical', 'Jazz', 'Fusion'],
        experience: 'Advanced',
        location: 'New York, NY',
        isAvailable: true,
        followers: 892,
        following: 634,
        projects: 15
      },
      content: 'Just finished recording this jazz fusion piece! Would love feedback from fellow musicians. Also open to collaborating on similar projects.',
      type: 'showcase',
      media: {
        type: 'video',
        url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=225&fit=crop',
        duration: '3:12'
      },
      tags: ['jazz', 'fusion', 'violin', 'recording'],
      likes: 67,
      comments: 15,
      timestamp: '5 hours ago',
      isLiked: true
    }
  ]);

  const [collaborations] = useState<Collaboration[]>([
    {
      id: '1',
      title: 'Indie Folk EP Project',
      description: 'Creating a 4-song EP with indie folk vibes. Looking for acoustic guitar, cello, and harmonies.',
      creator: {
        id: '3',
        name: 'Maya Rodriguez',
        username: '@mayafolk',
        bio: 'Singer-songwriter with a passion for storytelling',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e606?w=100&h=100&fit=crop&crop=face',
        instruments: ['Vocals', 'Guitar'],
        genres: ['Folk', 'Indie', 'Country'],
        experience: 'Intermediate',
        location: 'Austin, TX',
        isAvailable: true,
        followers: 445,
        following: 278,
        projects: 8
      },
      collaborators: [],
      neededInstruments: ['Acoustic Guitar', 'Cello', 'Vocals'],
      genre: 'Indie Folk',
      deadline: 'March 15, 2025',
      status: 'open',
      type: 'remote'
    }
  ]);

  const handleOnboardingComplete = (userData: Partial<Musician>) => {
    const newUser: Musician = {
      id: Date.now().toString(),
      name: userData.name || '',
      username: userData.username || '',
      bio: userData.bio || '',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      instruments: userData.instruments || [],
      genres: userData.genres || [],
      experience: userData.experience || 'Beginner',
      location: userData.location || '',
      isAvailable: true,
      followers: 0,
      following: 0,
      projects: 0
    };
    
    setCurrentUser(newUser);
    setHasOnboarded(true);
    toast.success(`Welcome to MusicConnect, ${newUser.name}!`, {
      description: "Start discovering and collaborating with musicians",
      duration: 3000,
    });
  };

  // Show onboarding if not completed
  if (!hasOnboarded || !currentUser) {
    return <MusicianOnboarding onComplete={handleOnboardingComplete} />;
  }

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'feed':
        return <Feed posts={posts} currentUser={currentUser} />;
      case 'discover':
        return <Discover collaborations={collaborations} currentUser={currentUser} />;
      case 'create':
        return <Create currentUser={currentUser} onBack={() => setCurrentTab('feed')} />;
      case 'messages':
        return <Messages currentUser={currentUser} />;
      case 'profile':
        return <Profile musician={currentUser} isOwnProfile={true} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Toaster position="top-center" richColors />
      
      {/* Main Content */}
      <div className="pb-20">
        {renderCurrentTab()}
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation 
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />
    </div>
  );
}