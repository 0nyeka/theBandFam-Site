import { useState, useEffect } from 'react';
import { LogOut, Search, Users, Video, Search as SearchIcon, Calendar, Clock, MapPin, Heart, MessageSquare, Share2 } from 'lucide-react';
import { supabase } from '../utils/supabase.ts';
import { Button } from './ui/button.tsx';
import { Badge } from './ui/badge.tsx';
import { Skeleton } from './ui/skeleton.tsx';
import { Avatar } from './ui/avatar.tsx';
import { EmptyState } from './EmptyState.tsx';

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

interface FeedProps {
  currentUser: Musician;
  onSignOut?: () => void;
}

export function Feed({ currentUser, onSignOut }: FeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Fetch posts from Supabase when component mounts
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // We're keeping posts empty for now, as requested
    }, 1000);
    
    return () => clearTimeout(timer);
    
    // Commented out real fetch logic for now
    // fetchPosts();
    // ...existing Supabase subscription logic
  }, []);
  
  // Keep existing functions but don't call them for now
  // ...existing fetchPosts, fetchPostDetails, checkUserLikes, handleLike functions

  // Filter posts by type (will be empty for now)
  const filteredPosts = posts.filter(post => {
    return selectedFilter === 'all' || post.type === selectedFilter;
  });
  
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16">
      {/* Header */}
      <header className="bg-white flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-purple-600">MusicConnect</h1>
        <button 
          onClick={onSignOut}
          className="flex items-center gap-1 py-1 px-3 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50"
        >
          <LogOut size={15} /> Sign Out
        </button>
      </header>
      
      <div className="max-w-[600px] mx-auto px-4 mt-6">
        {/* Feed Title and User Avatar */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Feed</h2>
            <p className="text-gray-600 text-sm">Discover what's happening in the music community</p>
          </div>
          <Avatar className="h-12 w-12 border-2 border-white shadow">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="object-cover"
            />
          </Avatar>
        </div>
        
        {/* Search */}
        <div className="relative mt-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search posts, musicians, or tags..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Filter Tabs */}
        <div className="flex mt-6 overflow-x-auto gap-2 pb-1 scrollbar-hide">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedFilter === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Posts
          </button>
          
          <button
            onClick={() => setSelectedFilter('collaboration')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition ${
              selectedFilter === 'collaboration' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Collaborations
          </button>
          
          <button
            onClick={() => setSelectedFilter('showcase')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition ${
              selectedFilter === 'showcase' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Video className="w-3.5 h-3.5" /> Showcases
          </button>
          
          <button
            onClick={() => setSelectedFilter('looking-for')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition ${
              selectedFilter === 'looking-for' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <SearchIcon className="w-3.5 h-3.5" /> Looking For
          </button>
          
          <button
            onClick={() => setSelectedFilter('jam-session')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition ${
              selectedFilter === 'jam-session' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> Jam Sessions
          </button>
        </div>
        
        {/* Empty state or loading state */}
        {isLoading ? (
          <div className="space-y-4 mt-6">
            {[1, 2].map(i => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 bg-white">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="mt-16 text-center bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No posts yet</h3>
            <p className="mt-1 text-gray-500">
              {selectedFilter === 'all' 
                ? 'Be the first to post and connect with other musicians!' 
                : `No ${selectedFilter} posts available. Create one to get started!`}
            </p>
            <div className="mt-6">
              <button 
                className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Create a Post
              </button>
            </div>
          </div>
        ) : (
          // This part won't render because we're keeping posts empty
          <div className="mt-6 space-y-4">
            {/* Example post from image */}
            <article className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              {/* Post header */}
              <div className="p-4">
                <div className="flex items-start">
                  {/* SC initials */}
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-gray-800 font-semibold">
                    SC
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-gray-900 font-medium">Sarah Chen</h3>
                        <p className="text-gray-500 text-sm">@sarahdrums</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                        Professional
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <div className="flex items-center">
                        <MapPin size={12} className="mr-1" />
                        Los Angeles, CA
                      </div>
                      <span className="mx-1.5">•</span>
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        556d ago
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Post content */}
              <div className="px-4 pb-4">
                <p className="text-gray-800 mb-3">
                  Looking for a bassist and keyboardist to complete our jazz fusion trio! We have 
                  some gigs lined up for next month. Must be able to rehearse twice a week in 
                  downtown LA.
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <Badge className="bg-gray-100 text-gray-800 rounded-md font-normal">Drums</Badge>
                  <Badge className="bg-gray-100 text-gray-800 rounded-md font-normal">Percussion</Badge>
                  <Badge className="bg-blue-100 text-blue-800 rounded-md font-normal">#jazz</Badge>
                  <Badge className="bg-blue-100 text-blue-800 rounded-md font-normal">#fusion</Badge>
                  <Badge className="bg-blue-100 text-blue-800 rounded-md font-normal">#trio</Badge>
                  <Badge className="bg-blue-100 text-blue-800 rounded-md font-normal">#gigs</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-6">
                    <button className="flex items-center text-gray-500 text-sm">
                      <Heart className="h-4 w-4 mr-1.5" />
                      <span>23</span>
                    </button>
                    <button className="flex items-center text-gray-500 text-sm">
                      <MessageSquare className="h-4 w-4 mr-1.5" />
                      <span>8</span>
                    </button>
                    <button className="flex items-center text-gray-500 text-sm">
                      <Share2 className="h-4 w-4 mr-1.5" />
                      <span>Share</span>
                    </button>
                  </div>
                  <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Join Project
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}
      </div>
    </div>
  );
}