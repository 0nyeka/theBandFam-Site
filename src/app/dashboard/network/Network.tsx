'use client';
import { useState } from "react";
import SideNav from "@/app/components/ui/SideNav";
import TopNav from "@/app/components/ui/TopNav";
import TabbedContent from "@/app/components/ui/TabbedContent";
import { Users, UserPlus, Lightbulb, UserPlusIcon } from "@phosphor-icons/react";
import PageHeader from "@/app/components/ui/PageHeader";
import NewConnection from "@/app/components/ui/NetworkComponent";

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
                    <NewConnection tab="connections" />
                );
            case 'requests':
                return (
                    <NewConnection tab="requests" />
                );
            case 'suggestions':
                return (
                    <NewConnection tab="suggestions" />
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-[#1a1a2e] min-h-screen">
            <TopNav />  
            <SideNav />
            <PageHeader pageTitle="My Network" pageDescription="Connect with musicians and build your music community." icon={<UserPlusIcon size={18} />} buttonText="Invite Musician" />
            <TabbedContent 
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                renderContent={renderTabContent}
            />
        </div>
    );
}