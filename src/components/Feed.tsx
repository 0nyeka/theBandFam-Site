import { useState } from 'react';
import { Button } from './ui/button.tsx';
import { Card, CardContent, CardHeader } from './ui/card.tsx';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.tsx';
import { Badge } from './ui/badge.tsx';
import { Input } from './ui/input.tsx';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Play, 
  Search, 
  Filter,
  Music,
  Users,
  Calendar,
  MapPin,
  Clock,
  Headphones,
  Video
} from 'lucide-react';

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
  posts: Post[];
  currentUser: Musician;
}

const getPostTypeIcon = (type: string) => {
  switch (type) {
    case 'collaboration':
      return <Users className="w-4 h-4" />;
    case 'showcase':
      return <Play className="w-4 h-4" />;
    case 'looking-for':
      return <Search className="w-4 h-4" />;
    case 'jam-session':
      return <Calendar className="w-4 h-4" />;
    default:
      return <Music className="w-4 h-4" />;
  }
};

const getPostTypeColor = (type: string) => {
  switch (type) {
    case 'collaboration':
      return 'bg-blue-100 text-blue-700';
    case 'showcase':
      return 'bg-purple-100 text-purple-700';
    case 'looking-for':
      return 'bg-green-100 text-green-700';
    case 'jam-session':
      return 'bg-orange-100 text-orange-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const formatPostType = (type: string) => {
  switch (type) {
    case 'collaboration':
      return 'Collaboration';
    case 'showcase':
      return 'Showcase';
    case 'looking-for':
      return 'Looking for Musicians';
    case 'jam-session':
      return 'Jam Session';
    default:
      return 'Post';
  }
};

export function Feed({ posts, currentUser }: FeedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.musician.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || post.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Feed</h1>
              <p className="text-gray-600">Discover what's happening in the music community</p>
            </div>
            <Avatar>
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>

          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts, musicians, or tags..."
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Badge
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedFilter('all')}
              >
                All Posts
              </Badge>
              <Badge
                variant={selectedFilter === 'collaboration' ? 'default' : 'outline'}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedFilter('collaboration')}
              >
                <Users className="w-3 h-3 mr-1" />
                Collaborations
              </Badge>
              <Badge
                variant={selectedFilter === 'showcase' ? 'default' : 'outline'}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedFilter('showcase')}
              >
                <Play className="w-3 h-3 mr-1" />
                Showcases
              </Badge>
              <Badge
                variant={selectedFilter === 'looking-for' ? 'default' : 'outline'}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedFilter('looking-for')}
              >
                <Search className="w-3 h-3 mr-1" />
                Looking For
              </Badge>
              <Badge
                variant={selectedFilter === 'jam-session' ? 'default' : 'outline'}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedFilter('jam-session')}
              >
                <Calendar className="w-3 h-3 mr-1" />
                Jam Sessions
              </Badge>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <Card className="p-8 text-center">
              <Music className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="font-semibold text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={post.musician.avatar} />
                        <AvatarFallback>
                          {post.musician.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{post.musician.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {post.musician.experience}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{post.musician.username}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{post.musician.location}</span>
                          </div>
                          <span className="text-xs text-gray-400">•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={`${getPostTypeColor(post.type)} border-0`}>
                      {getPostTypeIcon(post.type)}
                      <span className="ml-1">{formatPostType(post.type)}</span>
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-900 mb-3">{post.content}</p>

                  {/* Media */}
                  {post.media && (
                    <div className="mb-4">
                      {post.media.type === 'audio' && (
                        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                              <Headphones className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium">Audio Track</p>
                              <p className="text-sm text-gray-600">{post.media.duration}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4 mr-1" />
                            Play
                          </Button>
                        </div>
                      )}
                      {post.media.type === 'video' && (
                        <div className="relative rounded-lg overflow-hidden">
                          <img 
                            src={post.media.url} 
                            alt="Video thumbnail"
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                              <Play className="w-6 h-6 text-gray-800 ml-1" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            {post.media.duration}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Instruments/Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.musician.instruments.slice(0, 3).map((instrument) => (
                      <Badge key={instrument} variant="secondary" className="text-xs">
                        {instrument}
                      </Badge>
                    ))}
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={`${
                          likedPosts.has(post.id) || post.isLiked
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <Heart 
                          className={`w-4 h-4 mr-1 ${
                            likedPosts.has(post.id) || post.isLiked ? 'fill-current' : ''
                          }`} 
                        />
                        {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-600">
                        <Share className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                    
                    {post.type === 'collaboration' || post.type === 'looking-for' ? (
                      <Button size="sm" variant="outline">
                        Join Project
                      </Button>
                    ) : post.type === 'jam-session' ? (
                      <Button size="sm" variant="outline">
                        I'm Interested
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        Connect
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}