import { useState, useEffect } from 'react';
import { LogOut, Users, Video, Search as SearchIcon, Calendar, Clock, MapPin, Heart, MessageSquare, Share2, Music, User, Settings, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, signOut, getCurrentUser } from '../utils/supabase.ts';
import { Button } from './ui/button.tsx';
import { Badge } from './ui/badge.tsx';
import { Skeleton } from './ui/skeleton.tsx';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar.tsx';
import { EmptyState } from './EmptyState.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.tsx';
import { Card } from './ui/card.tsx';
import { Separator } from './ui/separator.tsx';
import { Input } from './ui/input.tsx';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getCurrentUser();
      setUser(user || null);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-4 flex items-center space-x-2">
          <Music className="h-8 w-8 text-indigo-600" />
          <h1 className="text-xl font-bold">MuseConnect</h1>
        </div>
        <Separator />
        <nav className="flex-1 p-4 space-y-2">
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "feed" ? "bg-indigo-50 text-indigo-700" : ""}`}
            onClick={() => setActiveTab("feed")}
          >
            <Users className="mr-2 h-5 w-5" />
            Feed
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "discover" ? "bg-indigo-50 text-indigo-700" : ""}`}
            onClick={() => setActiveTab("discover")}
          >
            <SearchIcon className="mr-2 h-5 w-5" />
            Discover Musicians
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "messages" ? "bg-indigo-50 text-indigo-700" : ""}`}
            onClick={() => setActiveTab("messages")}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Messages
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "projects" ? "bg-indigo-50 text-indigo-700" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            <Video className="mr-2 h-5 w-5" />
            Projects
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "events" ? "bg-indigo-50 text-indigo-700" : ""}`}
            onClick={() => setActiveTab("events")}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Events
          </Button>
        </nav>
        <div className="p-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="md:hidden flex items-center space-x-2">
            <Music className="h-6 w-6 text-indigo-600" />
            <h1 className="text-lg font-bold">MuseConnect</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <Link to="/settings">
              <Avatar className="cursor-pointer">
                <AvatarFallback className="bg-indigo-600 text-white">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="feed" className="space-y-4">
              <Card className="p-6">
                <EmptyState 
                  title="Your feed is empty"
                  description="Connect with other musicians to see their updates and activities here."
                  icon={Users}
                />
              </Card>
            </TabsContent>

            <TabsContent value="discover" className="space-y-4">
              <Card className="p-6">
                <div className="mb-4">
                  <Input 
                    type="search" 
                    placeholder="Search for musicians, instruments, or genres..." 
                    className="w-full" 
                  />
                </div>
                <EmptyState 
                  title="Discover musicians"
                  description="Search for musicians by name, instrument, genre, or location."
                  icon={SearchIcon}
                />
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="space-y-4">
              <Card className="p-6">
                <EmptyState 
                  title="No messages yet"
                  description="Your conversations with other musicians will appear here."
                  icon={MessageSquare}
                />
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <Card className="p-6">
                <EmptyState 
                  title="No projects yet"
                  description="Create or join musical projects to collaborate with other musicians."
                  icon={Video}
                />
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <Card className="p-6">
                <EmptyState 
                  title="No events yet"
                  description="Schedule rehearsals, gigs, or sessions with your collaborators."
                  icon={Calendar}
                />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Loading skeleton for dashboard
const DashboardSkeleton = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar skeleton */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200 p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-32 rounded" />
        </div>
        <Separator />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-full rounded" />
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="md:hidden flex items-center space-x-2">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-6 w-24 rounded" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </header>
        
        <div className="flex-1 p-6">
          <Skeleton className="h-64 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;