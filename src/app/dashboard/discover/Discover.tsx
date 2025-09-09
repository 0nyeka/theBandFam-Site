'use client';
import { useState } from "react";
import SideNav from "@/app/components/ui/SideNav";
import TopNav from "@/app/components/ui/TopNav";
import TabbedContent from "@/app/components/ui/TabbedContent";
import { Heart, TrendUp, Users, MusicNotes } from "@phosphor-icons/react";
import PageHeader from "@/app/components/ui/PageHeader";

export default function Discover() {
    const [activeTab, setActiveTab] = useState('foryou');

    const tabs = [
        { id: 'foryou', label: 'For You', icon: <Heart size={20} /> },
        { id: 'trending', label: 'Trending', icon: <TrendUp size={20} /> },
        { id: 'musicians', label: 'Musicians', icon: <Users size={20} /> },
        { id: 'genre', label: 'Genre', icon: <MusicNotes size={20} /> }
    ];

    const renderTabContent = (activeTab: string) => {
        switch (activeTab) {
            case 'foryou':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-body text-white mb-4">For You</h2>
                        <p className="text-[#6e7da3]">Personalized recommendations based on your taste will appear here.</p>
                    </div>
                );
            case 'trending':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-body text-white mb-4">Trending</h2>
                        <p className="text-[#6e7da3]">Popular and trending music will appear here.</p>
                    </div>
                );
            case 'musicians':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-body text-white mb-4">Musicians</h2>
                        <p className="text-[#6e7da3]">Discover new musicians and artists will appear here.</p>
                    </div>
                );
            case 'genre':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-body text-white mb-4">Genre</h2>
                        <p className="text-[#6e7da3]">Browse music by genre will appear here.</p>
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
            <PageHeader pageTitle="Discover" pageDescription="Find new music, musicians, and inspirations" />
            <TabbedContent 
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                renderContent={renderTabContent}
            />
        </div>
    );
}