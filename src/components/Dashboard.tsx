import { useState, useEffect } from 'react';
import { LogOut, Users, Video, Search as SearchIcon, Calendar, Clock, MapPin, Heart, MessageSquare, Share2, Music, User, Settings, Bell, Home, Compass, Play } from 'lucide-react';
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
    <div className="dashboard-container">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-left">
          <div 
            className="logo clickable-logo"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <Music className="h-6 w-6" style={{color: 'var(--accent-color)'}} />
            <span>theBandFam</span>
          </div>
          <div className="search-bar">
            <input 
              type="search" 
              placeholder="Search musicians, bands, events..."
            />
          </div>
        </div>
        
        <div className="nav-right">
          <div className="nav-icons">
            <span className="icon"><Home size={18} /></span>
            <span className="icon"><Users size={18} /></span>
            <span className="icon"><Calendar size={18} /></span>
            <span className="notification-icon">
              <Bell size={18} />
              <span className="badge">5</span>
            </span>
            <span className="notification-icon">
              <MessageSquare size={18} />
              <span className="badge">3</span>
            </span>
          </div>
          <div className="user-avatar">
            <Avatar className="h-8 w-8">
              <AvatarFallback style={{backgroundColor: 'var(--accent-color)', color: 'white'}}>
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="main-content">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <div className="user-profile">
            <Avatar className="profile-img">
              <AvatarFallback style={{backgroundColor: 'var(--accent-color)', color: 'white'}}>
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <h3>{user?.email || "User"}</h3>
            <p>Bass Player</p>
          </div>

          <nav className="sidebar-nav">
            <a 
              href="#" 
              className={`nav-item ${activeTab === "feed" ? "active" : ""}`}
              onClick={() => setActiveTab("feed")}
            >
              <span><Home size={16} /> Home</span>
            </a>
            
            <a 
              href="#" 
              className={`nav-item ${activeTab === "discover" ? "active" : ""}`}
              onClick={() => setActiveTab("discover")}
            >
              <span><Users size={16} /> My Network</span>
              <span className="count">12</span>
            </a>
            
            <a 
              href="#" 
              className={`nav-item ${activeTab === "events" ? "active" : ""}`}
              onClick={() => setActiveTab("events")}
            >
              <span><Calendar size={16} /> Events</span>
              <span className="count">3</span>
            </a>
            
            <a 
              href="#" 
              className={`nav-item ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              <span><Music size={16} /> My Music</span>
            </a>
            
            <a 
              href="#" 
              className={`nav-item ${activeTab === "messages" ? "active" : ""}`}
              onClick={() => setActiveTab("messages")}
            >
              <span><Compass size={16} /> Discover</span>
            </a>
            
            <a 
              href="#" 
              className="nav-item"
              onClick={(e) => {
                e.preventDefault();
                navigate('/settings');
              }}
            >
              <span><Settings size={16} /> Settings</span>
            </a>
          </nav>
        </aside>

        {/* Main Feed */}
        <main className="feed">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="feed" className="space-y-0">
              {/* Post Composer */}
              <div className="post-composer">
                <div className="composer-header">
                  <Avatar className="composer-avatar">
                    <AvatarFallback style={{backgroundColor: 'var(--accent-color)', color: 'white'}}>
                      {user?.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <input 
                    type="text" 
                    placeholder="What's on your mind?"
                    className="composer-input"
                  />
                </div>
                <div className="composer-actions">
                  <div>
                    <button className="action-btn">📷 Photo</button>
                    <button className="action-btn">🎵 Music</button>
                    <button className="action-btn">📅 Event</button>
                  </div>
                  <button className="post-btn">Post</button>
                </div>
              </div>

              {/* Empty State */}
              <div className="post">
                <EmptyState 
                  title="No posts yet"
                  description="Share your music, connect with other musicians, or discover new content."
                  icon={Music}
                />
              </div>
            </TabsContent>

            <TabsContent value="discover">
              <div className="post">
                <div style={{marginBottom: '16px'}}>
                  <input 
                    type="search" 
                    placeholder="Search for musicians, instruments, or genres..."
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      outline: 'none'
                    }}
                  />
                </div>
                <EmptyState 
                  title="Discover musicians"
                  description="Search for musicians by name, instrument, genre, or location."
                  icon={SearchIcon}
                />
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <div className="post">
                <EmptyState 
                  title="No messages yet"
                  description="Your conversations with other musicians will appear here."
                  icon={MessageSquare}
                />
              </div>
            </TabsContent>

            <TabsContent value="projects">
              <div className="post">
                <EmptyState 
                  title="No projects yet"
                  description="Create or join musical projects to collaborate with other musicians."
                  icon={Video}
                />
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="post">
                <EmptyState 
                  title="No events yet"
                  description="Schedule rehearsals, gigs, or sessions with your collaborators."
                  icon={Calendar}
                />
              </div>
            </TabsContent>
          </Tabs>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="upcoming-events">
            <h3><Calendar size={16} /> Upcoming Events</h3>
            
            <div className="event-card">
              <div style={{
                width: '100%',
                height: '120px',
                background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '8px',
                marginBottom: '8px'
              }}></div>
              <div className="event-info">
                <h4>Open Mic Night</h4>
                <p><Clock size={12} /> Aug 5, 2025 at 8:00 PM</p>
                <p><MapPin size={12} /> Blue Note Cafe</p>
                <p><Users size={12} /> 23 attending</p>
              </div>
              <button className="interested-btn">Interested</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const DashboardSkeleton = () => {
  return (
    <div className="dashboard-container">
      <nav className="top-nav">
        <div className="nav-left">
          <div style={{width: '150px', height: '24px', backgroundColor: '#e0e0e0', borderRadius: '4px'}}></div>
          <div style={{width: '300px', height: '40px', backgroundColor: '#e0e0e0', borderRadius: '20px'}}></div>
        </div>
        <div className="nav-right">
          <div style={{width: '32px', height: '32px', backgroundColor: '#e0e0e0', borderRadius: '50%'}}></div>
        </div>
      </nav>
      
      <div className="main-content">
        <div style={{width: '250px', height: '400px', backgroundColor: '#e0e0e0', borderRadius: '12px'}}></div>
        <div style={{flex: 1, height: '300px', backgroundColor: '#e0e0e0', borderRadius: '12px'}}></div>
        <div style={{width: '300px', height: '300px', backgroundColor: '#e0e0e0', borderRadius: '12px'}}></div>
      </div>
    </div>
  );
};

export default Dashboard;