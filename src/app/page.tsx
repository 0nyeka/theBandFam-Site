'use client'

import Image from "next/image";
import logo from '../assets/logo/theBandFam-logo.png';
import { usePathname, useRouter } from 'next/navigation';

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();



  const footerLinksClass = "block text-white/70 no-underline mb-2 transition-all duration-300 py-1 hover:[color:#ff6b35] hover:translate-x-1 font-body text-sm cursor-pointer"
  const footerLinksHeader = "text-white font-bold mb-4 text-lg font-heading text-sm"

  return (
    <div className="m-0 p-0">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow flex justify-between items-center py-2 px-4 w-full m-0">
        <div className="flex items-center gap-4">
          <Image 
            src={logo}
            alt="The Band Fam Logo"
            width={70}
            height={70}
          />
          <ul className="flex gap-4 m-0 p-0 list-none font-body">
            <li onClick={() => router.push('/about')} className={pathname === '/about' ? 'text-orange-500' : 'cursor-pointer'}>About</li>
            <li onClick={() => router.push('/pricing')} className={pathname === '/pricing' ? 'text-orange-500' : 'cursor-pointer'}>Pricing</li>
          </ul>
        </div>
        <div>
          <ul className="flex gap-4 items-center m-0 p-0 list-none font-body">
            <li onClick={() => router.push('/contact')} className={pathname === '/contact' ? 'text-orange-500' : 'cursor-pointer'}>Contact</li>
            <li onClick={() => router.push('/signin')} className={pathname === '/signin' ? 'text-orange-500' : 'cursor-pointer'}>Sign In</li>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-md cursor-pointer" onClick={() => router.push('/signup')}>Sign Up</button>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="
          relative flex flex-col items-center
          w-full
          overflow-hidden
          border-b border-[rgba(255,107,53,0.3)]
          bg-[linear-gradient(135deg,rgba(26,26,46,0.85)_0%,rgba(22,33,62,0.8)_30%,rgba(15,52,96,0.75)_70%,rgba(26,26,46,0.85)_100%),url('../assets/music-studio-bg.jpg')]
          bg-cover bg-center bg-fixed
          py-[120px] px-0 pb-[160px]

        "
      >
        <div className="max-w-3xl w-full px-5 text-white text-center space-y-6">
          <h1 className="
            text-[4rem] font-extrabold font-heading
            mb-6 leading-tight
            bg-gradient-to-br from-white via-[#ff6b35] to-[#ffa726] 
            bg-clip-text text-transparent
            drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]
            text-shadow-[0_0_40px_rgba(255,107,53,0.5)]
            animate-slideInUp
          ">
            Connect. Collaborate. Create.
          </h1>
          <p className="text-lg opacity-90 m-0 p-0 font-inter">
            Join the ultimate platform for musicians to find collaborators, share music, and build their network. Where every note finds its harmony.
          </p>
          <div className="flex gap-4 justify-center m-0 p-0">
            <button className="px-6 py-3 bg-orange-500 text-white rounded-md cursor-pointer" onClick={() => router.push("/explore")}>Explore Platform</button>
            <button className="px-6 py-3 border border-white text-white rounded-md cursor-pointer" onClick={() => router.push("/contact")}>Contact Us</button>
          </div>
        </div>
        <div>

        </div>
      </section>

      <section className="px-5 py-[50px] bg-[color:#f7f7f8]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-heading text-[3rem] font-black bg-[linear-gradient(135deg,#1a1a2e_0%,#ff6b35_50%,#ffa726_100%)] bg-clip-text text-transparent text-center mb-12 relative [text-shadow:0_0_30px_rgba(255,107,53,0.3)]">Ready to Connect?</h2>
          <p className="font-body text-xl text-[color:#00031f] mb-10 text-center">Join thousands of musicians already collaborating on The Band Fam</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-gradient-to-br from-[#ff6b35] to-[#667eea] border-0 px-10 py-4 text-lg font-semibold rounded-full shadow-[0_8px_25px_rgba(0,123,255,0.3)] transition-all duration-300 ease-in-out font-body text-white bg-[length:200%_200%] bg-[position:0%_50%] hover:bg-[position:100%_50%] hover:brightness-110 hover:contrast-125 hover:-translate-y-1 hover:scale-105 cursor-pointer" onClick={() => router.push('/signup')}>Create Your Profile</button>
            <button className="cursor-pointer" onClick={() => router.push('/pricing')}>Plans & Pricing</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden text-white border-t-2 border-[rgba(255,107,53,0.3)] px-5 pt-[30px] pb-5 [background:linear-gradient(135deg,#1a1a2e_0%,#16213e_50%,#0f3460_100%)]">
        <div className="grid grid-cols-3 gap-10">
          <div>
            <h3 className={footerLinksHeader}>Platform</h3>
            <ul>
              <li className={footerLinksClass} onClick={() => router.push('/about')}>About</li>
              <li className={footerLinksClass} onClick={() => router.push('/explore')}>Explore</li>
              <li className={footerLinksClass} onClick={() => router.push('/pricing')}>Pricing</li>
            </ul>
          </div>
          <div>
            <h3 className={footerLinksHeader}>Support</h3>
            <ul>
              <li className={footerLinksClass} onClick={() => router.push('/helpcenter')}>Help Center</li>
              <li className={footerLinksClass} onClick={() => router.push('/contact')}>Contact</li>
              <li className={footerLinksClass} onClick={() => router.push('/community')}>Community</li>
            </ul>
          </div>
          <div>
            <h3 className={footerLinksHeader}>Legal</h3>
            <ul>
              <li className={footerLinksClass} onClick={() => router.push('/privacypolicy')}>Privacy Policy</li>
              <li className={footerLinksClass} onClick={() => router.push('/termsofservice')}>Terms of Service</li>
              <li className={footerLinksClass} onClick={() => router.push('/cookiesettings')}>Cookie Settings</li>
            </ul>
          </div>
        </div>
        <div className="text-center pt-5 border-t border-[rgba(255,107,53,0.2)] relative z-[1]">
          <p className="text-sm text-[rgba(255,255,255,0.6)] font-body">© 2025 The Band Fam. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
