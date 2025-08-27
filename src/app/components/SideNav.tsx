"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileImage from './ProfileImage';
import { House, Users, CalendarBlank, MusicNotes, Globe, Gear } from '@phosphor-icons/react';

const navLinks = [
    { href: "/dashboard/network", label: "My Network", icon: <Users size={18} /> },
    { href: "/dashboard/events", label: "Events", icon: <CalendarBlank size={18} /> },
    { href: "/dashboard/music", label: "My Music", icon: <MusicNotes size={18} /> },
    { href: "/dashboard/discover", label: "Discover", icon: <Globe size={18} /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Gear size={18} /> },
]

export default function SideNav() {
    const pathname = usePathname();

    return (
        <aside className="fixed top-17 left-0 h-full w-45 bg-[linear-gradient(175deg,rgb(40,60,90)_0%,rgba(30,50,80,0.7)_85%)] text-[#6e7da3] text-sm flex flex-col shadow-lg">
            {/* Logo / Branding */}
            <div className="p-4 border-b border-gray-700 flex justify-center items-center">
                <ProfileImage firstLetter="O" />
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col p-4 space-y-1">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link href={link.href} key={link.href} className={`p-2 rounded-md hover:text-white hover:shadow-md ${
                            isActive ? 'shadow-white shadow-md' : 'shadow-[#6e7da3] shadow-sm'
                        }`}>
                            <div className="flex items-center gap-2">
                                <span className={`transition-all duration-200 ${
                                    isActive ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-100'
                                }`}>
                                    {link.icon}
                                </span>
                                <span className={isActive ? 'text-white' : ''}>
                                    {link.label}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    )
}