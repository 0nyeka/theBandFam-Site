import { Heart, MessageCircle, Share, UserPlus, Music, Calendar } from "lucide-react";
import ProfileImage from "./ProfileImage";
import { Card } from "@/components/ui/card";

interface NotificationProps {
  id: number;
  type: 'like' | 'comment' | 'share' | 'follow' | 'music' | 'event';
  user: string;
  userInitial: string;
  action: string;
  time: string;
  read: boolean;
  postContent?: string;
  onMarkAsRead: (id: number) => void;
}

export default function Notification({
  id,
  type,
  user,
  userInitial,
  action,
  time,
  read,
  postContent,
  onMarkAsRead
}: NotificationProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'share':
        return <Share className="w-5 h-5 text-green-500" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-purple-500" />;
      case 'music':
        return <Music className="w-5 h-5 text-orange-500" />;
      case 'event':
        return <Calendar className="w-5 h-5 text-yellow-500" />;
      default:
        return <Heart className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <Card
      onClick={() => onMarkAsRead(id)}
      className={`flex items-start gap-1 cursor-pointer transition-all border border-[#6e7da3] shadow-none ${
        read 
          ? 'hover:bg-[#3c4e67]' 
          : 'border-l-4 border-l-orange-500 hover:bg-[#3c4e67]'
      }`}
    >
        <div className="flex gap-4 items-start w-full">
            {!read && (
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
            )}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <ProfileImage firstLetter={userInitial} />
                    <div className="flex-1">
                        <span className="font-medium text-white">{user}</span>
                        <span className="text-gray-300 ml-1">{action}</span>
                    </div>
                </div>
                
                {postContent && (
                <div className="mt-2 p-3 bg-[#2c3e57] rounded-md border-1 border-[#3c4e67]">
                    <p className="text-sm text-gray-300 line-clamp-2">
                    {postContent}
                    </p>
                </div>
                )}
            </div>
            <div className="flex-shrink-0">
                <span className="text-xs text-gray-400">{time}</span>
            </div>
        </div>
    </Card>
  );
}