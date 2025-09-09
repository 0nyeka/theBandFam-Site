"use client";
import { useState } from "react";
import ProfileImage from "./ProfileImage";
import { Card } from "@/components/ui/card";
import { HeartIcon, ChatCircleIcon, ShareIcon, ArrowsClockwise, MusicNotes, CalendarBlankIcon, PaperPlaneRight, X, FacebookLogo, InstagramLogo, TwitterLogo, LinkedinLogo, Link, ClockIcon, MapPinIcon, UsersThreeIcon } from "@phosphor-icons/react";

interface Comment {
    id: string;
    author: string;
    authorInitial: string;
    content: string;
    timeAgo: string;
}

interface PostProps {
    type: string;
    name: string;
    musicianType: string;
    timeAgo: string;
    profileLetter: string;
    caption?: string;
    photo?: string;
    numberOfLikes: number;
    numberOfComments: number;
    likes: string[];
    comments: Comment[];
    eventName?: string;
    eventDate?: string;
    eventTime?: string;
    eventLocation?: string;
    eventAttendees?: string;
}

export default function Post({ type, name, musicianType, timeAgo, profileLetter, caption, photo, numberOfLikes, numberOfComments, likes, comments, eventName, eventDate, eventTime, eventLocation, eventAttendees }: PostProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(numberOfLikes);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [commentCount, setCommentCount] = useState(numberOfComments);
    const [postComments, setPostComments] = useState<Comment[]>(comments);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [attendeesCount, setAttendeesCount] = useState(eventAttendees ? parseInt(eventAttendees) : 0);
    const [isInterested, setIsInterested] = useState(false);
    const buttonStyle = "flex items-center gap-2 hover:text-white hover:bg-[#2c3e57] transition-colors flex-1 justify-center py-2 rounded cursor-pointer";

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    };

    const handleCommentClick = () => {
        setShowComments(!showComments);
    };

    const handleAddComment = () => {
        if (commentText.trim()) {
            const newComment: Comment = {
                id: Math.random().toString(36).substr(36, 9),
                author: "You",
                authorInitial: "Y",
                content: commentText.trim(),
                timeAgo: "Just now"
            };
            setPostComments(prev => [newComment, ...prev]);
            setCommentCount(prev => prev + 1);
            setCommentText("");
        }
    };

    const handleShareClick = () => {
        setShowShareMenu(!showShareMenu);
    };

    const handleShare = (platform: string) => {
        const postUrl = window.location.href;
        const postText = caption || "Check out this post from The Band Fam!";
        
        let shareUrl = "";
        
        switch (platform) {
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postText)}&url=${encodeURIComponent(postUrl)}`;
                break;
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
                break;
            case "copy":
                navigator.clipboard.writeText(`${postText} ${postUrl}`);
                setShowShareMenu(false);
                return;
            default:
                return;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
        setShowShareMenu(false);
    };

    const handleInterestClick = () => {
        if (!isInterested) {
            setAttendeesCount(prev => prev + 1);
            setIsInterested(true);
        } else {
            setAttendeesCount(prev => prev - 1);
            setIsInterested(false);
        }
    };

    return (
        <Card className="mt-4">
            <div className="flex flex-col w-full text-[#a3aec8] relative">
                {/* Post Type Tag */}
                {type === "music" && (
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        <MusicNotes size={12} />
                        <span>Music</span>
                    </div>
                )}
                {type === "event" && (
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        <CalendarBlankIcon size={12} />
                        <span>Event</span>
                    </div>
                )}
                
                {/* Header with Profile Image and Info */}
                <div className="flex items-start gap-3 p-4 pb-2">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                        <ProfileImage firstLetter={profileLetter} />
                    </div>
                    
                    {/* Post Header Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col">
                            {/* Name */}
                            <h3 className="text-white font-semibold text-sm">{name}</h3>
                            
                            {/* Musician Type and Time */}
                            <div className="flex items-center gap-2 text-xs">
                                <span>{musicianType}</span>
                                <span>•</span>
                                <span>{timeAgo}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Caption */}
                {caption && (
                    <div className="px-4 pb-2">
                        <p className="text-white text-sm leading-relaxed">{caption}</p>
                    </div>
                )}

                {/* Photo */}
                {photo && (
                    <div className="px-4 pb-2">
                        <img 
                            src={photo} 
                            alt="Post content" 
                            className="w-full h-auto rounded-md"
                        />
                    </div>
                )}

                {/* Event Details */}
                {type === "event" && (
                    <div className="px-4 pb-2">
                        <div className="rounded-lg p-4 border border-[#6e7da3]">
                            <h4 className="text-white font-semibold text-lg mb-3">{eventName || "Event Details"}</h4>
                            
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2">
                                    <CalendarBlankIcon size={16} />
                                    <span className="text-sm">{eventDate || "Date TBD"}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <ClockIcon size={16} />
                                    <span className="text-sm">{eventTime || "Time TBD"}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <MapPinIcon size={16} />
                                    <span className="text-sm">{eventLocation || "Location TBD"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <UsersThreeIcon size={16} />
                                    <span className="text-sm">{attendeesCount} attendees</span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={handleInterestClick}
                                className={"w-full bg-[#2c3e57] py-2 px-4 rounded-lg transition-colors font-medium shadow-white shadow-sm hover:bg-[#3c4e67]"}
                            >
                                {isInterested ? "Never Mind" : "I'm Interested"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Likes and Comments Count */}
                <div className="px-4 py-2 border-t border-b border-gray-600">
                    <div className="flex items-center gap-3 text-xs">
                        <span className="cursor-pointer">{likeCount} likes</span>
                        <span>•</span>
                        <span 
                            className="cursor-pointer hover:text-white transition-colors" 
                            onClick={handleCommentClick}
                        >
                            {commentCount} comments
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="px-4 py-2">
                    <div className="flex items-center justify-between w-full">
                        <button 
                            className={buttonStyle}
                            onClick={handleLikeClick}
                        >
                            {isLiked ? <HeartIcon weight="fill" size={20} color="#f97316"/> : <HeartIcon size={20} />}
                            <span className="text-sm">Like</span>
                        </button>
                        <button 
                            className={buttonStyle}
                            onClick={handleCommentClick}
                        >
                            <ChatCircleIcon size={20} />
                            <span className="text-sm">Comment</span>
                        </button>
                        <button className={buttonStyle}>
                            <ArrowsClockwise size={20} />
                            <span className="text-sm">Repost</span>
                        </button>
                        <button 
                            className={`${buttonStyle} ${showShareMenu ? 'text-orange-500' : ''}`}
                            onClick={handleShareClick}
                        >
                            <ShareIcon size={20} />
                            <span className="text-sm">Share</span>
                        </button>
                    </div>
                </div>

                {/* Share Dialog Overlay */}
                {showShareMenu && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                        <div className="bg-[#2c2c4c] rounded-lg shadow-xl max-w-sm w-full mx-4 border border-[#6e7da3]">
                            {/* Dialog Header */}
                            <div className="flex items-center justify-between p-4 border-b border-[#6e7da3]">
                                <h3 className="text-white font-medium text-lg">Share Post</h3>
                                <button
                                    onClick={() => setShowShareMenu(false)}
                                    className="text-gray-400 hover:text-white transition-colors p-1"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            {/* Share Options */}
                            <div className="p-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleShare("twitter")}
                                        className="flex items-center gap-3 bg-[#1DA1F2] text-white px-4 py-3 rounded-lg hover:bg-[#1a8cd8] transition-colors"
                                    >
                                        <TwitterLogo size={20} />
                                        <span className="text-sm font-medium">Twitter</span>
                                    </button>
                                    
                                    <button
                                        onClick={() => handleShare("facebook")}
                                        className="flex items-center gap-3 bg-[#4267B2] text-white px-4 py-3 rounded-lg hover:bg-[#365899] transition-colors"
                                    >
                                        <FacebookLogo size={20} />
                                        <span className="text-sm font-medium">Facebook</span>
                                    </button>
                                    
                                    <button
                                        onClick={() => handleShare("linkedin")}
                                        className="flex items-center gap-3 bg-[#0077B5] text-white px-4 py-3 rounded-lg hover:bg-[#006097] transition-colors"
                                    >
                                        <LinkedinLogo size={20} />
                                        <span className="text-sm font-medium">LinkedIn</span>
                                    </button>
                                    
                                    <button
                                        onClick={() => handleShare("copy")}
                                        className="flex items-center gap-3 bg-[#6e7da3] text-white px-4 py-3 rounded-lg hover:bg-[#5a6b8f] transition-colors"
                                    >
                                        <Link size={20} />
                                        <span className="text-sm font-medium">Copy Link</span>
                                    </button>
                                </div>
                                
                                {/* Cancel Button */}
                                <button
                                    onClick={() => setShowShareMenu(false)}
                                    className="w-full mt-4 py-3 px-4 bg-[#3c4e67] text-white rounded-lg hover:bg-[#2c3e57] transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Comments Section */}
                {showComments && (
                    <div className="border-t border-gray-600">
                        {/* Add Comment */}
                        <div className="px-4 py-3 border-b border-gray-600">
                            <div className="flex items-start gap-3">
                                <ProfileImage firstLetter="O" />
                                <div className="flex-1 flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Write a comment..."
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        className="flex-1 bg-[#2c2c4c] border border-[#6e7da3] rounded-full px-3 py-2 text-white text-sm focus:border-white focus:outline-none"
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                                    />
                                    <button
                                        onClick={handleAddComment}
                                        disabled={!commentText.trim()}
                                        className="bg-orange-500 text-white px-3 py-2 rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <PaperPlaneRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Comments List */}
                        <div className="max-h-64 overflow-y-auto">
                            {postComments.map((comment) => (
                                <div key={comment.id} className="px-4 py-3 border-b border-gray-600 last:border-b-0">
                                    <div className="flex items-start gap-3">
                                        <ProfileImage firstLetter={comment.authorInitial} />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-white font-medium text-sm">{comment.author}</span>
                                                <span className="text-gray-400 text-xs">{comment.timeAgo}</span>
                                            </div>
                                            <p className="text-white text-sm">{comment.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}