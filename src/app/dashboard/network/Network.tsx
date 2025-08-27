'use client';
import { useState } from "react";
import SideNav from "@/app/components/SideNav";
import TopNav from "@/app/components/TopNav";
import TabbedContent from "@/app/components/TabbedContent";
import { Users, UserPlus, Lightbulb } from "@phosphor-icons/react";

export default function Network() {
    const [activeTab, setActiveTab] = useState('connections');

    const tabs = [
        { id: 'connections', label: 'My Connections', icon: <Users size={20} /> },
        { id: 'requests', label: 'Requests', icon: <UserPlus size={20} /> },
        { id: 'suggestions', label: 'Suggestions', icon: <Lightbulb size={20} /> }
    ];

    const renderTabContent = (activeTab: string) => {
        switch (activeTab) {
            case 'connections':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-body text-white mb-4">My Connections</h2>
                        <p className="text-[#6e7da3]">Your network connections will appear here.</p>
                    </div>
                );
            case 'requests':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-body text-white mb-4">Connection Requests</h2>
                        <p className="text-[#6e7da3]">Pending connection requests will appear here.</p>
                    </div>
                );
            case 'suggestions':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-body text-white mb-4">Suggested Connections</h2>
                        <p className="text-[#6e7da3]">Recommended musicians will appear here.</p>
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