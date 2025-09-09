'use client';
import { useState } from "react";
import SideNav from "@/app/components/ui/SideNav";
import TopNav from "@/app/components/ui/TopNav";
import TabbedContent from "@/app/components/ui/TabbedContent";
import { Calendar, Ticket, Globe, PlusIcon } from "@phosphor-icons/react";
import PageHeader from "@/app/components/ui/PageHeader";
import Event from "@/app/components/ui/Event";

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
                    <Event tab="upcoming" />
                );
            case 'events':
                return (
                    <Event tab="events" />
                );
            case 'discover':
                return (
                    <Event tab="discover" />
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-[#1a1a2e] min-h-screen">
            <TopNav />  
            <SideNav />
            <PageHeader pageTitle="My Events" pageDescription="Discover and organize music events in your area" icon={<PlusIcon size={18} />} buttonText="Create Event" />
            <TabbedContent 
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                renderContent={renderTabContent}
            />
        </div>
    );
}