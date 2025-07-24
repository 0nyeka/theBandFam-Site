import { useState } from 'react';
import { Button } from './ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.tsx';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.tsx';
import { Badge } from './ui/badge.tsx';
import { Input } from './ui/input.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.tsx';
import { 
  Search, 
  Filter,
  MapPin,
  Clock,
  Users,
  Calendar,
  Music,
  Star,
  UserPlus,
  MessageCircle,
  Play
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

interface DiscoverProps {
  collaborations: Collaboration[];
  currentUser: Musician;
}

export function Discover({ collaborations, currentUser }: DiscoverProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('collaborations');

  // Mock musicians data
  const [musicians] = useState<Musician[]>([
    {
      id: '4',
      name: 'Marcus Williams',
      username: '@marcusbass',
      bio: 'Funk bass player with 15+ years experience. Love jamming and creating groovy basslines.',
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
    {
      id: '5',
      name: 'Emma Thompson',
      username: '@emmapiano',
      bio: 'Classical pianist transitioning to jazz. Always looking for new musical adventures!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e606?w=100&h=100&fit=crop&crop=face',
      instruments: ['Piano', 'Keyboard'],
      genres: ['Classical', 'Jazz', 'Blues'],
      experience: 'Advanced',
      location: 'Boston, MA',
      isAvailable: true,
      followers: 892,
      following: 567,
      projects: 12
    },
    {
      id: '6',
      name: 'David Kim',
      username: '@davidguitar',
      bio: 'Rock guitarist and songwriter. Open to collaborations in any genre that rocks!',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      instruments: ['Guitar', 'Vocals'],
      genres: ['Rock', 'Alternative', 'Indie'],
      experience: 'Intermediate',
      location: 'Seattle, WA',
      isAvailable: true,
      followers: 1456,
      following: 923,
      projects: 28
    }
  ]);

  const filteredCollaborations = collaborations.filter(collab =>
    collab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collab.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collab.neededInstruments.some(inst => inst.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredMusicians = musicians.filter(musician =>
    musician.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    musician.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
    musician.instruments.some(inst => inst.toLowerCase().includes(searchQuery.toLowerCase())) ||
    musician.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-700';
      case 'Advanced':
        return 'bg-purple-100 text-purple-700';
      case 'Professional':
        return 'bg-gold-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Discover</h1>
          <p className="text-gray-600">Find collaborations and connect with musicians</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, musicians, instruments..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="collaborations" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Collaborations
            </TabsTrigger>
            <TabsTrigger value="musicians" className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              Musicians
            </TabsTrigger>
          </TabsList>

          {/* Collaborations Tab */}
          <TabsContent value="collaborations" className="space-y-4">
            {filteredCollaborations.length === 0 ? (
              <Card className="p-8 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="font-semibold text-gray-900 mb-2">No collaborations found</h3>
                <p className="text-gray-600">Try adjusting your search terms</p>
              </Card>
            ) : (
              filteredCollaborations.map((collab) => (
                <Card key={collab.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{collab.title}</CardTitle>
                          <Badge variant="outline" className={collab.status === 'open' ? 'border-green-500 text-green-700' : 'border-gray-500'}>
                            {collab.status === 'open' ? 'Open' : 'In Progress'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Music className="w-4 h-4" />
                            {collab.genre}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {collab.type}
                          </div>
                          {collab.deadline && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {collab.deadline}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={collab.creator.avatar} />
                        <AvatarFallback>
                          {collab.creator.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{collab.creator.name}</p>
                        <p className="text-xs text-gray-600">{collab.creator.username}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-700 mb-4">{collab.description}</p>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Looking for:</p>
                      <div className="flex flex-wrap gap-1">
                        {collab.neededInstruments.map((instrument) => (
                          <Badge key={instrument} variant="secondary">
                            {instrument}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {collab.collaborators.length} collaborators
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        <Button size="sm">
                          Join Project
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Musicians Tab */}
          <TabsContent value="musicians" className="space-y-4">
            {filteredMusicians.length === 0 ? (
              <Card className="p-8 text-center">
                <Music className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="font-semibold text-gray-900 mb-2">No musicians found</h3>
                <p className="text-gray-600">Try adjusting your search terms</p>
              </Card>
            ) : (
              filteredMusicians.map((musician) => (
                <Card key={musician.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={musician.avatar} />
                        <AvatarFallback>
                          {musician.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{musician.name}</h3>
                            <p className="text-gray-600">{musician.username}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getExperienceColor(musician.experience)}>
                              {musician.experience}
                            </Badge>
                            {musician.isAvailable && (
                              <Badge variant="outline" className="border-green-500 text-green-700">
                                Available
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{musician.bio}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {musician.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {musician.followers} followers
                          </div>
                          <div className="flex items-center gap-1">
                            <Play className="w-4 h-4" />
                            {musician.projects} projects
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1 mb-2">
                            {musician.instruments.map((instrument) => (
                              <Badge key={instrument} variant="secondary">
                                {instrument}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {musician.genres.slice(0, 4).map((genre) => (
                              <Badge key={genre} variant="outline">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button size="sm">
                            <UserPlus className="w-4 h-4 mr-1" />
                            Connect
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}