import { useState } from 'react';
import { Card, CardContent } from './ui/card.tsx';
import { Button } from './ui/button.tsx';
import { Input } from './ui/input.tsx';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.tsx';
import { Badge } from './ui/badge.tsx';
import { 
  Send, 
  MessageCircle, 
  User, 
  Users, 
  Paperclip 
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

interface Conversation {
  id: string;
  participant: Musician;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

interface MessagesProps {
  currentUser: Musician;
}

export function Messages({ currentUser }: MessagesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  // Mock conversations
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      participant: {
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
      lastMessage: 'I love your jazz fusion project! Would love to contribute some violin tracks.',
      timestamp: '2 min ago',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      participant: {
        id: '3',
        name: 'Marcus Williams',
        username: '@marcusbass',
        bio: 'Funk bass player with 15+ years experience',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        instruments: ['Bass', 'Guitar'],
        genres: ['Funk', 'R&B', 'Jazz', 'Soul'],
        experience: 'Professional',
        location: 'Chicago, IL',
        isAvailable: true,
        followers: 2340,
        following: 1876,
        projects: 45
      },
      lastMessage: 'Thanks for the invite! When do we start recording?',
      timestamp: '1 hour ago',
      unreadCount: 0,
      isOnline: false
    }
  ]);

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participant.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedConversation) {
    const conversation = conversations.find(c => c.id === selectedConversation)!;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b p-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => setSelectedConversation(null)} className="p-2">
                ←
              </Button>
              <Avatar>
                <AvatarImage src={conversation.participant.avatar} />
                <AvatarFallback>
                  {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{conversation.participant.name}</h2>
                <p className="text-sm text-gray-600">
                  {conversation.isOnline ? 'Online' : 'Last seen 2 hours ago'}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Users className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="text-center text-sm text-gray-500 mb-6">
              Started conversation about "Jazz Fusion EP Project"
            </div>
            
            {/* Sample messages */}
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-3 max-w-xs shadow-sm">
                <p>Hi! I saw your post about the jazz fusion project. I'd love to be involved!</p>
                <p className="text-xs text-gray-500 mt-1">2:30 PM</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
                <p>That's awesome! I love your violin work. Let's discuss the details.</p>
                <p className="text-xs text-blue-100 mt-1">2:32 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t p-4">
          <div className="max-w-2xl mx-auto flex gap-2">
            <Input placeholder="Type a message..." className="flex-1" />
            <Button>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Connect with fellow musicians</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="space-y-2">
          {filteredConversations.length === 0 ? (
            <Card className="p-8 text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="font-semibold text-gray-900 mb-2">No conversations yet</h3>
              <p className="text-gray-600">Start connecting with musicians to begin messaging</p>
            </Card>
          ) : (
            filteredConversations.map((conversation) => (
              <Card 
                key={conversation.id} 
                className="cursor-pointer hover:shadow-md transition-all"
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.participant.avatar} />
                        <AvatarFallback>
                          {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold truncate">{conversation.participant.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                          {conversation.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs min-w-[20px] h-5">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {conversation.participant.instruments.slice(0, 2).join(', ')}
                        </span>
                      </div>
                    </div>
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