'use client';
import { useState } from "react";
import SideNav from "@/app/components/SideNav";
import TopNav from "@/app/components/TopNav";
import TabbedContent from "@/app/components/TabbedContent";
import { MusicNotes, Playlist, Users } from "@phosphor-icons/react";

export default function Music() {
    const [activeTab, setActiveTab] = useState('tracks');

    const tabs = [
        { id: 'tracks', label: 'My Tracks', icon: <MusicNotes size={20} /> },
        { id: 'playlists', label: 'Playlists', icon: <Playlist size={20} /> },
        { id: 'collaborations', label: 'Collaborations', icon: <Users size={20} /> }
    ];

    const renderTabContent = (activeTab: string) => {
        switch (activeTab) {
            case 'tracks':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-body text-white mb-4">My Tracks</h2>
                        <p className="text-[#6e7da3]">Your uploaded tracks will appear here.</p>
                    </div>
                );
            case 'playlists':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-body text-white mb-4">Playlists</h2>
                        <p className="text-[#6e7da3]">Your created and saved playlists will appear here.</p>
                    </div>
                );
            case 'collaborations':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-body text-white mb-4">Collaborations</h2>
                        <p className="text-[#6e7da3]">Your collaborative projects will appear here.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-[#1a1a2e] min-h-screen">
            <TopNav />  
            <SideNav />
            
            <TabbedContent 
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                renderContent={renderTabContent}
            />
        </div>
    );
}