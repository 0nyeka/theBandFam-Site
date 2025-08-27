'use client';
import { ReactNode } from "react";

interface Tab {
    id: string;
    label: string;
    icon: ReactNode;
}

interface TabNavigationProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
    className?: string;
}

export default function TabNavigation({ tabs, activeTab, onTabChange, className = "" }: TabNavigationProps) {
    return (
        <div className={`bg-[linear-gradient(175deg,rgb(40,60,90)_0%,rgba(30,50,80,0.7)_85%)] border-b border-[#6e7da3]/20 rounded-md ${className}`}>
            <div className="flex p-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`relative flex items-center justify-center gap-2 px-6 py-3 rounded-md transition-all duration-300 font-body flex-1 mx-1 group
                        ${
                            activeTab === tab.id
                            ? "text-white bg-[linear-gradient(to-top,rgba(255,115,0,0.6)_0%,rgba(40,60,90,1)_20%)]"
                            : "text-[#6e7da3] hover:text-white"
                        }
                        `}
                    >
                        <span className="flex items-center gap-2 relative">
                            {tab.icon}
                            {tab.label}
                        </span>

                        {/* Full-width underline at the very bottom */}
                        <span
                            className={`absolute left-0 bottom-0 h-[2px] transition-all duration-300
                                bg-gradient-to-r from-orange-900 via-orange-500 to-orange-900
                                ${activeTab === tab.id ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"}
                            `}
                        ></span>
                    </button>
                ))}
            </div>
        </div>
    );
}


