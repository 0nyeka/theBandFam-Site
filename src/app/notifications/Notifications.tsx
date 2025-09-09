"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import Notification from "../components/ui/Notification";

type Notification = {
  id: number;
  type: 'like' | 'comment' | 'share' | 'follow' | 'music' | 'event';
  user: string;
  userInitial: string;
  action: string;
  time: string;
  read: boolean;
  postContent?: string;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'like',
      user: 'Sarah Wilson',
      userInitial: 'S',
      action: 'liked your post',
      time: '2 minutes ago',
      read: false,
      postContent: 'Just finished recording my new track! What do you think? 🎸'
    },
    {
      id: 2,
      type: 'comment',
      user: 'Mike Chen',
      userInitial: 'M',
      action: 'commented on your post',
      time: '15 minutes ago',
      read: false,
      postContent: 'New drum kit arrived! Time to make some noise 🥁'
    },
    {
      id: 3,
      type: 'follow',
      user: 'Emma Davis',
      userInitial: 'E',
      action: 'started following you',
      time: '1 hour ago',
      read: true
    },
    {
      id: 4,
      type: 'share',
      user: 'Alex Chen',
      userInitial: 'A',
      action: 'shared your post',
      time: '2 hours ago',
      read: true,
      postContent: 'Looking for a guitarist to collaborate on this new project. Anyone interested? 🤘'
    },
    {
      id: 5,
      type: 'music',
      user: 'John Doe',
      userInitial: 'J',
      action: 'uploaded new music',
      time: '3 hours ago',
      read: true
    },
    {
      id: 6,
      type: 'event',
      user: 'Alice Johnson',
      userInitial: 'A',
      action: 'created an event you might be interested in',
      time: '5 hours ago',
      read: true
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');


  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex flex-1 text-white text-sm">
      {/* Main Content */}
      <main className="flex flex-col flex-1">
        {/* Header */}
        <div className="p-6 border-b border-[#2f2f4f]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">Notifications</h1>
              {/*unreadCount > 0 && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )*/}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-[#2c3e57] rounded-lg p-1">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    filter === 'all' 
                      ? 'bg-[#3c4e67] text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    filter === 'unread' 
                      ? 'bg-[#3c4e67] text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Unread
                </button>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Bell className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg">No notifications</p>
              <p className="text-sm">You're all caught up!</p>
            </div>
          ) : (
            <div className="p-6 space-y-1 max-w-2xl mx-auto">
              {filteredNotifications.map((notification) => (
                <Notification
                  key={notification.id}
                  {...notification}
                  onMarkAsRead={markAsRead}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}