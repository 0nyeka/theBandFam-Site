import { useState } from 'react';
import { Button } from './ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.tsx';
import { Input } from './ui/input.tsx';
import { Textarea } from './ui/textarea.tsx';
import { Badge } from './ui/badge.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select.tsx';
import { 
  ArrowLeft, 
  Users, 
  Play, 
  Search, 
  Calendar,
  Plus,
  X,
  Upload,
  Music,
  MapPin,
  Clock
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

interface CreateProps {
  currentUser: Musician;
  onBack: () => void;
}

const POST_TYPES = [
  {
    id: 'collaboration',
    title: 'Start Collaboration',
    description: 'Create a new project and invite musicians to join',
    icon: Users,
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'showcase',
    title: 'Showcase Work',
    description: 'Share your music with the community',
    icon: Play,
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'looking-for',
    title: 'Find Musicians',
    description: 'Looking for specific musicians to join your project',
    icon: Search,
    color: 'from-green-500 to-teal-600'
  },
  {
    id: 'jam-session',
    title: 'Organize Jam',
    description: 'Set up a jam session in your area',
    icon: Calendar,
    color: 'from-orange-500 to-red-600'
  }
];

const INSTRUMENTS = [
  'Guitar', 'Bass', 'Drums', 'Piano', 'Keyboard', 'Violin', 'Cello', 'Saxophone',
  'Trumpet', 'Flute', 'Vocals', 'Ukulele', 'Mandolin', 'Banjo', 'Harmonica'
];

const GENRES = [
  'Rock', 'Pop', 'Jazz', 'Blues', 'Country', 'Folk', 'Classical', 'Alternative',
  'Indie', 'Electronic', 'Hip Hop', 'R&B', 'Soul', 'Funk', 'Reggae', 'Punk'
];

export function Create({ currentUser, onBack }: CreateProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    genre: '',
    instruments: [] as string[],
    tags: [] as string[],
    location: '',
    date: '',
    time: '',
    projectType: 'remote',
    deadline: ''
  });
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleInstrumentToggle = (instrument: string) => {
    setFormData(prev => ({
      ...prev,
      instruments: prev.instruments.includes(instrument)
        ? prev.instruments.filter(i => i !== instrument)
        : [...prev.instruments, instrument]
    }));
  };

  const handleSubmit = () => {
    // Here you would normally submit the post
    console.log('Submitting post:', { type: selectedType, ...formData });
    onBack();
  };

  const isFormValid = () => {
    if (!selectedType) return false;
    
    switch (selectedType) {
      case 'collaboration':
        return formData.title && formData.content && formData.genre && formData.instruments.length > 0;
      case 'showcase':
        return formData.content;
      case 'looking-for':
        return formData.content && formData.instruments.length > 0;
      case 'jam-session':
        return formData.content && formData.location && formData.date;
      default:
        return false;
    }
  };

  if (!selectedType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-2xl mx-auto p-4">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={onBack} className="p-2 mr-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create Post</h1>
              <p className="text-gray-600">Share your music with the community</p>
            </div>
          </div>

          {/* Post Type Selection */}
          <div className="space-y-4">
            {POST_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <Card 
                  key={type.id}
                  className="cursor-pointer transition-all hover:shadow-lg border-2 hover:border-blue-200"
                  onClick={() => setSelectedType(type.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{type.title}</h3>
                        <p className="text-gray-600">{type.description}</p>
                      </div>
                      <div className="text-gray-400">
                        <ArrowLeft className="w-5 h-5 rotate-180" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const selectedPostType = POST_TYPES.find(type => type.id === selectedType)!;
  const Icon = selectedPostType.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => setSelectedType(null)} className="p-2 mr-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${selectedPostType.color} flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{selectedPostType.title}</h1>
              <p className="text-sm text-gray-600">{selectedPostType.description}</p>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Title (for collaborations) */}
            {selectedType === 'collaboration' && (
              <div>
                <label className="block text-sm font-medium mb-2">Project Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Give your project a catchy title..."
                />
              </div>
            )}

            {/* Content */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {selectedType === 'showcase' ? 'Description' : 'Details'}
              </label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder={
                  selectedType === 'collaboration' ? 'Describe your project, what you\'re looking to create, and what kind of musicians you need...' :
                  selectedType === 'showcase' ? 'Tell the community about your music, the story behind it, or what inspired you...' :
                  selectedType === 'looking-for' ? 'Describe what kind of musicians you\'re looking for and what the project involves...' :
                  'Describe your jam session, what style of music, and what to expect...'
                }
                rows={4}
              />
            </div>

            {/* Genre */}
            {(selectedType === 'collaboration' || selectedType === 'showcase') && (
              <div>
                <label className="block text-sm font-medium mb-2">Genre</label>
                <Select value={formData.genre} onValueChange={(value) => setFormData(prev => ({ ...prev, genre: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENRES.map((genre) => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Instruments */}
            {(selectedType === 'collaboration' || selectedType === 'looking-for') && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {selectedType === 'collaboration' ? 'Instruments Needed' : 'Looking For'}
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                  {INSTRUMENTS.map((instrument) => (
                    <Badge
                      key={instrument}
                      variant={formData.instruments.includes(instrument) ? "default" : "outline"}
                      className="cursor-pointer justify-center py-2"
                      onClick={() => handleInstrumentToggle(instrument)}
                    >
                      {instrument}
                    </Badge>
                  ))}
                </div>
                {formData.instruments.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-2">Selected:</p>
                    <div className="flex flex-wrap gap-1">
                      {formData.instruments.map((instrument) => (
                        <Badge key={instrument} variant="secondary">
                          {instrument}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Location and Date for Jam Sessions */}
            {selectedType === 'jam-session' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Enter location or venue"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Time</label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Project Type for Collaborations */}
            {selectedType === 'collaboration' && (
              <div>
                <label className="block text-sm font-medium mb-2">Collaboration Type</label>
                <Select value={formData.projectType} onValueChange={(value) => setFormData(prev => ({ ...prev, projectType: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote - Online collaboration</SelectItem>
                    <SelectItem value="local">Local - In-person only</SelectItem>
                    <SelectItem value="hybrid">Hybrid - Both online and in-person</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Deadline for Collaborations */}
            {selectedType === 'collaboration' && (
              <div>
                <label className="block text-sm font-medium mb-2">Project Deadline (Optional)</label>
                <Input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                />
              </div>
            )}

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button type="button" variant="outline" onClick={handleAddTag}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      #{tag}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Media Upload (placeholder) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {selectedType === 'showcase' ? 'Upload Media' : 'Add Media (Optional)'}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Drag & drop your audio/video files here, or click to browse
                </p>
                <Button variant="outline" className="mt-2">
                  Choose Files
                </Button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setSelectedType(null)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={!isFormValid()} className="flex-1">
                {selectedType === 'collaboration' ? 'Create Project' :
                 selectedType === 'showcase' ? 'Share Music' :
                 selectedType === 'looking-for' ? 'Post Request' :
                 'Create Jam Session'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}