import { Button } from './ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.tsx';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.tsx';
import { Badge } from './ui/badge.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.tsx';
import { 
  MapPin, 
  Users, 
  Play, 
  Settings, 
  Star,
  Music,
  Calendar,
  Award,
  Headphones,
  Video,
  MessageCircle,
  UserPlus
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

interface ProfileProps {
  musician: Musician;
  isOwnProfile: boolean;
}

export function Profile({ musician, isOwnProfile }: ProfileProps) {
  // Mock projects data
  const projects = [
    {
      id: '1',
      title: 'Jazz Fusion EP',
      description: 'A 4-track EP blending jazz with modern electronic elements',
      collaborators: 3,
      status: 'In Progress',
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'Acoustic Sessions',
      description: 'Live acoustic performances recorded in various locations',
      collaborators: 1,
      status: 'Completed',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop'
    }
  ];

  const getExperienceIcon = (experience: string) => {
    switch (experience) {
      case 'Beginner':
        return <Star className="w-4 h-4 fill-current" />;
      case 'Intermediate':
        return (
          <>
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </>
        );
      case 'Advanced':
        return (
          <>
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </>
        );
      case 'Professional':
        return <Award className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-2xl mx-auto p-4">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={musician.avatar} />
                <AvatarFallback className="text-xl">
                  {musician.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h1 className="text-2xl font-bold">{musician.name}</h1>
                    <p className="text-gray-600">{musician.username}</p>
                  </div>
                  {isOwnProfile ? (
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  ) : (
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
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-100 text-blue-700">
                    <div className="flex items-center gap-1">
                      {getExperienceIcon(musician.experience)}
                      <span>{musician.experience}</span>
                    </div>
                  </Badge>
                  {musician.isAvailable && (
                    <Badge variant="outline" className="border-green-500 text-green-700">
                      Available for Projects
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
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
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{musician.bio}</p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="font-semibold text-lg">{musician.followers}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg">{musician.following}</div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg">{musician.projects}</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              Musical Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Instruments</h4>
                <div className="flex flex-wrap gap-1">
                  {musician.instruments.map((instrument) => (
                    <Badge key={instrument} variant="secondary">
                      {instrument}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Genres</h4>
                <div className="flex flex-wrap gap-1">
                  {musician.genres.map((genre) => (
                    <Badge key={genre} variant="outline">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="projects" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Headphones className="w-4 h-4" />
              Media
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img 
                      src={project.thumbnail} 
                      alt={project.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{project.title}</h3>
                        <Badge variant={project.status === 'Completed' ? 'secondary' : 'outline'}>
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {project.collaborators} collaborators
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Last updated 2 days ago
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {projects.length === 0 && (
              <Card className="p-8 text-center">
                <Play className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="font-semibold text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-600">
                  {isOwnProfile ? 'Start your first collaboration!' : 'No projects to show'}
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <Card className="p-8 text-center">
              <Headphones className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="font-semibold text-gray-900 mb-2">No media uploaded</h3>
              <p className="text-gray-600">
                {isOwnProfile ? 'Share your music with the community' : 'No media to show'}
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}