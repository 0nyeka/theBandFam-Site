'use client';
import { useState } from "react";
import SideNav from "@/app/components/SideNav";
import TopNav from "@/app/components/TopNav";
import TabbedContent from "@/app/components/TabbedContent";
import { Calendar, Ticket, Globe } from "@phosphor-icons/react";

export default function Events() {
    const [activeTab, setActiveTab] = useState('upcoming');

    const tabs = [
        { id: 'upcoming', label: 'Upcoming', icon: <Calendar size={20} /> },
        { id: 'events', label: 'My Events', icon: <Ticket size={20} /> },
        { id: 'discover', label: 'Discover', icon: <Globe size={20} /> }
    ];

    const renderTabContent = (activeTab: string) => {
        switch (activeTab) {
            case 'upcoming':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-body text-white mb-4">Upcoming Events</h2>
                        <p className="text-[#6e7da3]">Your upcoming events will appear here.</p>
                    </div>
                );
            case 'events':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-body text-white mb-4">My Events</h2>
                        <p className="text-[#6e7da3]">Events you've created will appear here.</p>
                    </div>
                );
            case 'discover':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-body text-white mb-4">Discover Events</h2>
                        <p className="text-[#6e7da3]">Find new events to attend will appear here.</p>
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