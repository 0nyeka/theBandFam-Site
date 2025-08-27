'use client';
import { ReactNode } from "react";
import TabNavigation from "./TabNavigation";

interface Tab {
    id: string;
    label: string;
    icon: ReactNode;
}

interface TabbedContentProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
    renderContent: (activeTab: string) => ReactNode;
    className?: string;
}

export default function TabbedContent({ 
    tabs, 
    activeTab, 
    onTabChange, 
    renderContent, 
    className = "" 
}: TabbedContentProps) {
    return (
        <div className={`ml-55 mt-10 max-w-4xl ${className}`}>
            {/* Tab Navigation */}
            <TabNavigation 
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={onTabChange}
            />

            {/* Tab Content */}
            <div className="bg-[#1a1a2e] min-h-[calc(100vh-8rem)]">
                {renderContent(activeTab)}
            </div>
        </div>
    );
}


