'use client';
import Image from "next/image";
import logo from "../../../assets/logo/theBandFam-logo.png";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import TopNavIcon from "./TopNavIcon";
import ProfileImage from "./ProfileImage";
import { SpeakerHighIcon, SpeakerXIcon, SunIcon, MoonIcon } from "@phosphor-icons/react";

export default function TopNav() {
    const router = useRouter();
    const [isMuted, setIsMuted] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const controlButtonStyle = "flex items-center gap-2 bg-[#2c3e57] text-white border border-[#6e7da3] rounded-full p-1 cursor-pointer hover:bg-[#3c4e67] transition-all duration-300";

    const navLinks = [
        { href: "/dashboard/home", label: "Home", icon: "home" },
        { href: "/notifications", label: "Notifications", icon: "bell" },
        { href: "/messages", label: "Messages", icon: "chat" },
    ]

    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center py-1 px-4 w-full bg-[linear-gradient(175deg,rgb(40,60,90)_0%,rgba(30,50,80,0.7)_85%)] shadow font-body">
            <div className="flex items-center gap-4 w-1/3">
                <Image 
                    src={logo}
                    alt="The Band Fam Logo"
                    width={60}
                    height={60}
                    className="sm:w-[60px] sm:h-[60px] cursor-pointer"
                    onClick={() => router.push("/")}
                />
                <input type="text" placeholder="Search musicians, bands, events..." className="w-full bg-[#2c2c4c] rounded-3xl border border-[#6e7da3] focus:border-white focus:outline-none px-5 py-2 text-white text-xs" />
            </div>
            <div className="flex items-center gap-4">
                {navLinks.map((link) => (
                    <TopNavIcon key={link.href} icon={link.icon} label={link.label} href={link.href}/>
                ))}
                <ProfileImage firstLetter="O" />
                <div className="flex items-center gap-4 border-l border-[#6e7da3] pl-4 mr-8">
                    <div className={controlButtonStyle} onClick={() => setIsMuted(!isMuted)}>
                        {isMuted ? <SpeakerHighIcon size={20} /> : <SpeakerXIcon size={20} />}
                    </div>
                    <div className={controlButtonStyle} onClick={() => setIsDarkMode(!isDarkMode)}>
                        {isDarkMode ? <MoonIcon size={20} /> : <SunIcon size={20} />}
                    </div>
                </div>
            </div>
        </nav>
    );
}