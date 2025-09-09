'use client';
import { useState } from "react";
import SideNav from "@/app/components/ui/SideNav";
import TopNav from "@/app/components/ui/TopNav";
import TabbedContent from "@/app/components/ui/TabbedContent";
import { MusicNotes, Playlist, Users, PlusIcon } from "@phosphor-icons/react";
import PageHeader from "@/app/components/ui/PageHeader";
import MusicComponent from "@/app/components/ui/MusicComponent";

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
                    <MusicComponent tab="tracks" />
                );
            case 'playlists':
                return (
                    <MusicComponent tab="playlists" />
                );
            case 'collaborations':
                return (
                    <MusicComponent tab="collaborations" />
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-[#1a1a2e] min-h-screen">
            <TopNav />  
            <SideNav />
            <PageHeader pageTitle="My Music" pageDescription="Manage your tracks, playlists, and collaborations" icon={<PlusIcon size={18} />} buttonText="New Music" />
            <TabbedContent 
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                renderContent={renderTabContent}
            />
        </div>
    );
}