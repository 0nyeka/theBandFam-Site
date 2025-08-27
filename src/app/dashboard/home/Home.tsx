import SideNav from "@/app/components/SideNav";
import TopNav from "@/app/components/TopNav";
import PostCreator from "@/app/components/PostCreator";

export default function Home() {
    return (
        <div className="bg-[#1a1a2e] min-h-screen min-w-screen">
            <TopNav />  
            <SideNav />
            <PostCreator />
        </div>
    )
}