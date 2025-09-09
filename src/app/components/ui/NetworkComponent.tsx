'use client';
import { useState } from "react";
import ProfileImage from "./ProfileImage";
import { Card } from "@/components/ui/card";
import { UserPlus, Check, X, Heart, MusicNotes, MapPin, ChatCircle } from "@phosphor-icons/react";

interface Connection {
    id: string;
    name: string;
    musicianType: string;
    location: string;
    mutualConnections: number;
    profileLetter: string;
    bio?: string;
    genres?: string[];
    isOnline?: boolean;
}

export default function NetworkComponent({ tab }: { tab: string }) {
    const [connections, setConnections] = useState<Connection[]>([
        {
            id: "1",
            name: "Sarah Johnson",
            musicianType: "Guitarist",
            location: "Los Angeles, CA",
            mutualConnections: 5,
            profileLetter: "S",
            bio: "Passionate about indie rock and acoustic music",
            genres: ["Indie Rock", "Acoustic", "Alternative"],
            isOnline: true
        },
        {
            id: "2",
            name: "Mike Chen",
            musicianType: "Drummer",
            location: "New York, NY",
            mutualConnections: 3,
            profileLetter: "M",
            bio: "Professional drummer with 10+ years experience",
            genres: ["Rock", "Jazz", "Funk"],
            isOnline: false
        },
        {
            id: "3",
            name: "Emma Davis",
            musicianType: "Vocalist",
            location: "Austin, TX",
            mutualConnections: 7,
            profileLetter: "E",
            bio: "Soulful singer-songwriter",
            genres: ["Soul", "R&B", "Pop"],
            isOnline: true
        }
    ]);

    const [requests, setRequests] = useState<Connection[]>([
        {
            id: "4",
            name: "Alex Rodriguez",
            musicianType: "Bassist",
            location: "Miami, FL",
            mutualConnections: 2,
            profileLetter: "A",
            bio: "Looking to join a band for live performances",
            genres: ["Rock", "Metal", "Blues"]
        },
        {
            id: "5",
            name: "Lisa Park",
            musicianType: "Keyboardist",
            location: "Seattle, WA",
            mutualConnections: 4,
            profileLetter: "L",
            bio: "Classically trained pianist exploring electronic music",
            genres: ["Electronic", "Classical", "Ambient"]
        }
    ]);

    const [suggestions, setSuggestions] = useState<Connection[]>([
        {
            id: "6",
            name: "David Wilson",
            musicianType: "Producer",
            location: "Nashville, TN",
            mutualConnections: 8,
            profileLetter: "D",
            bio: "Award-winning producer specializing in country and folk",
            genres: ["Country", "Folk", "Americana"]
        },
        {
            id: "7",
            name: "Rachel Green",
            musicianType: "Violinist",
            location: "Boston, MA",
            mutualConnections: 6,
            profileLetter: "R",
            bio: "Classical violinist with a passion for crossover genres",
            genres: ["Classical", "Folk", "World Music"]
        },
        {
            id: "8",
            name: "Tom Anderson",
            musicianType: "Saxophonist",
            location: "New Orleans, LA",
            mutualConnections: 3,
            profileLetter: "T",
            bio: "Jazz saxophonist with a love for improvisation",
            genres: ["Jazz", "Blues", "Funk"]
        }
    ]);

    const handleAcceptRequest = (id: string) => {
        const request = requests.find(req => req.id === id);
        if (request) {
            setConnections(prev => [...prev, request]);
            setRequests(prev => prev.filter(req => req.id !== id));
        }
    };

    const handleRejectRequest = (id: string) => {
        setRequests(prev => prev.filter(req => req.id !== id));
    };

    const handleConnect = (id: string) => {
        const suggestion = suggestions.find(sug => sug.id === id);
        if (suggestion) {
            setRequests(prev => [...prev, suggestion]);
            setSuggestions(prev => prev.filter(sug => sug.id !== id));
        }
    };

    const renderConnectionCard = (connection: Connection, showActions = false, isRequest = false, isCompact = false) => (
        <Card key={connection.id} className={`mt-4 ${isCompact ? 'max-w-sm !py-5' : 'max-w-4xl'}`}>
            <div className="w-full">
                <div className="flex items-start gap-4 w-full">
                    <div className="relative">
                        <ProfileImage firstLetter={connection.profileLetter} />
                        {connection.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1a2e]"></div>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-semibold">{connection.name}</h3>
                            <span className="text-orange-500 text-sm">•</span>
                            <span className="text-[#6e7da3] text-sm">{connection.musicianType}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                            <MapPin size={14} className="text-[#6e7da3]" />
                            <span className="text-[#6e7da3] text-sm">{connection.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#6e7da3] text-xs mb-2">
                            <UserPlus size={14} />
                            <span>{connection.mutualConnections} mutual connections</span>
                        </div>
                        {connection.bio && (
                            <p className="text-[#a3aec8] text-sm mb-2">{connection.bio}</p>
                        )}
                        {!isCompact && connection.genres && (
                            <div className="flex flex-wrap gap-1 mb-3">
                                {connection.genres.map((genre, index) => (
                                    <span key={index} className="px-2 py-1 bg-[#2c3e57] text-orange-400 text-xs rounded-full">
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        )}
                        {isCompact && (
                            <button
                                onClick={() => {/* Handle message */}}
                                className="flex items-center gap-1 bg-[#2c3e57] hover:bg-[#3c4e67] text-white px-3 py-2 rounded-md text-sm transition-colors"
                            >
                                <ChatCircle size={16} />
                                Message
                            </button>
                        )}
                    </div>
                    {showActions && !isCompact && (
                        <div className="flex gap-2">
                            {isRequest ? (
                                <>
                                    <button
                                        onClick={() => handleAcceptRequest(connection.id)}
                                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
                                    >
                                        <Check size={16} />
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleRejectRequest(connection.id)}
                                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
                                    >
                                        <X size={16} />
                                        Decline
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => handleConnect(connection.id)}
                                    className="relative px-3 py-2 rounded-md text-sm bg-[rgba(255,165,0,0.15)] text-orange-500 shadow-[inset_0_2px_6px_rgba(255,165,0,0.5)] hover:text-[#1a1a2e] hover:font-bold overflow-hidden before:absolute before:inset-0 before:bg-orange-600 before:translate-x-[-100%] before:transition-transform before:duration-500 hover:before:translate-x-0"
                                >
                                    <span className="relative z-10 flex items-center gap-1 "><UserPlus size={16} /> Connect</span>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );


    const renderContent = () => {
        switch (tab) {
            case 'connections':
                return (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-heading text-white">My Connections ({connections.length})</h2>
                            <div className="flex items-center gap-2 text-[#6e7da3] text-sm">
                                <MusicNotes size={16} />
                                <span>Active musicians in your network</span>
                            </div>
                        </div>
                        {connections.length === 0 ? (
                            <div className="text-center py-12">
                                <UserPlus size={48} className="text-[#6e7da3] mx-auto mb-4" />
                                <h3 className="text-white text-lg mb-2">No connections yet</h3>
                                <p className="text-[#6e7da3]">Start building your network by connecting with other musicians!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {connections.map(connection => renderConnectionCard(connection, false, false, true))}
                            </div>
                        )}
                    </div>
                );

            case 'requests':
                return (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-heading text-white">Connection Requests ({requests.length})</h2>
                            <div className="flex items-center gap-2 text-[#6e7da3] text-sm">
                                <Heart size={16} />
                                <span>Musicians who want to connect</span>
                            </div>
                        </div>
                        {requests.length === 0 ? (
                            <div className="text-center py-12">
                                <Heart size={48} className="text-[#6e7da3] mx-auto mb-4" />
                                <h3 className="text-white text-lg mb-2">No pending requests</h3>
                                <p className="text-[#6e7da3]">You're all caught up! Check back later for new connection requests.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {requests.map(request => renderConnectionCard(request, true, true))}
                            </div>
                        )}
                    </div>
                );

            case 'suggestions':
                return (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-heading text-white">Suggested Connections ({suggestions.length})</h2>
                            <div className="flex items-center gap-2 text-[#6e7da3] text-sm">
                                <UserPlus size={16} />
                                <span>Based on your interests and mutual connections</span>
                            </div>
                        </div>
                        {suggestions.length === 0 ? (
                            <div className="text-center py-12">
                                <UserPlus size={48} className="text-[#6e7da3] mx-auto mb-4" />
                                <h3 className="text-white text-lg mb-2">No suggestions available</h3>
                                <p className="text-[#6e7da3]">We'll find more musicians for you to connect with soon!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {suggestions.map(suggestion => renderConnectionCard(suggestion, true, false))}
                            </div>
                        )}
                    </div>
                );

            default:
    return (
                    <div className="p-6">
                        <h2 className="text-xl font-heading text-white">Network</h2>
                        <p className="text-[#6e7da3]">Select a tab to view your network.</p>
        </div>
                );
        }
    };

    return renderContent();
}