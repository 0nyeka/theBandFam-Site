import TopNav from "../components/ui/TopNav";
import Notifications from "./Notifications";

export default function NotificationsPage() {
    return (
        <div className="bg-[#1a1a2e] min-h-screen flex flex-col"  >
            <TopNav />
            <Notifications />
        </div>
    )
}