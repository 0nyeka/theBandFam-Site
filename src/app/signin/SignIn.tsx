'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import logo from '../../assets/logo/theBandFam-logo.png';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, UserPlus, ChevronRight } from 'lucide-react';

export default function SignIn() {

    const router = useRouter();
    const [signUpHovered, setSignUpHovered] = useState(false);

    const inputClass =
    'w-full bg-[#2c2c4c] rounded-3xl border border-[#6e7da3] px-5 py-2 text-white text-xs focus:border-white focus:outline-none';

    return(
        <div className="min-h-screen bg-[#1a1a2e] bg-cover bg-center flex flex-col font-body">
    
            {/* Navbar */}
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
                </div>
                <div className="flex gap-4 items-center mr-8 font-body text-white text-sm">
                    <p>Don't have an account?</p>
                    <button 
                        className="cursor-pointer hover:text-[#ff6b35] font-bold flex items-center gap-1" 
                        onClick={() => router.push("/signup")}
                        onMouseEnter={() => setSignUpHovered(true)}
                        onMouseLeave={() => setSignUpHovered(false)}
                    >
                        Sign Up
                        {signUpHovered && <ChevronRight className="text-orange-500 w-4 h-4" />}
                    </button>
                </div>
            </nav>


            {/* Content area fills rest of screen */}
            <div className="flex-1 flex justify-center items-center mt-16 mb-16">
                <div className="flex flex-col justify-center gap-4 sm:gap-6 items-center w-[90%] max-w-[500px] 
                                bg-[linear-gradient(175deg,rgb(40,60,90)_0%,rgba(30,50,80,0.7)_85%)] text-white rounded-[12px] p-6 sm:p-8 shadow-[0_-2px_4px_rgba(255,255,255,0.3)]">

                    <h1 className="text-2xl sm:text-3xl font-bold font-heading">Welcome to The Band Fam</h1>
                    
                    <form className="flex flex-col gap-3 sm:gap-4 w-full text-sm sm:text-base">
                        <div className="block font-body text-muted-foreground space-y-2 sm:space-y-3">
                        <div>
                            <label htmlFor="email">Email</label>
                            <Input type="email" name="email" className={inputClass} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <Input type="password" name="password" className={inputClass} />
                        </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                className="group relative overflow-hidden px-4 py-2 sm:py-3 rounded-md border border-orange-500 text-white text-sm sm:text-base shadow-[0_0_6px_2px_rgba(249,115,22,0.6)] bg-[#2c3e57]"
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push("/dashboard/home");
                                }}
                                >
                                <span className="relative z-10">Sign In</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-[#1e2b3d] to-[#2c3e57] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                            </button>



                            <p className="text-xs">
                                Don't have an account?{" "}
                                <a href="/signup" className="underline hover:text-[#ff6b35] font-bold">Sign Up</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>    
    )
}