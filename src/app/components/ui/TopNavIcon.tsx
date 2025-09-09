import { House, BellSimple, Chats } from "@phosphor-icons/react";
import { useRouter, usePathname } from "next/navigation";

export default function TopNavIcon({ icon, label, href }: { icon: string; label: string; href: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div 
      className={`flex flex-col items-center gap-1 w-20 cursor-pointer group font-body transition-all duration-300 ${
        isActive ? 'text-white' : 'text-[#6e7da3] hover:text-white'
      }`} 
      onClick={() => router.push(href)}
    >
      {icon === "bell" && <BellSimple size={24} />}
      {icon === "chat" && <Chats size={24} />}
      {icon === "home" && <House size={24} />}
      <span className="text-xs relative">
        {label}
        <span className={`absolute left-0 bottom-[-2px] h-[2px] bg-orange-500 transition-all duration-300 ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}></span>
      </span>
    </div>
  );
}
