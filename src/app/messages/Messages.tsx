import TopNav from "../components/ui/TopNav";
import MessagesPage from "./MessagesPage";

export default function Messages() {
    return (
        <div className="bg-[#1a1a2e] h-screen flex flex-col"  >
            <TopNav />
            <MessagesPage />
        </div>
    )
}