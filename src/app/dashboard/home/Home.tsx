import SideNav from "@/app/components/ui/SideNav";
import TopNav from "@/app/components/ui/TopNav";
import PostCreator from "@/app/components/ui/PostCreator";
import Feed from "@/app/components/ui/Feed";

export default function Home() {
    return (
        <div className="bg-[#1a1a2e] min-h-screen min-w-screen pb-5">
            <TopNav />  
            <SideNav />
            <PostCreator />
            <Feed />
        </div>
    )
}