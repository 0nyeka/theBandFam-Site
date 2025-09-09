import { UploadSimpleIcon } from "@phosphor-icons/react";

export default function PageHeader({ pageTitle, pageDescription, icon, buttonText }: { pageTitle: string, pageDescription: string, icon: React.ReactNode, buttonText: string }) {
    return (
        <div className="ml-55 mt-10 max-w-4xl">
            <h1 className="text-2xl font-heading text-white mb-4">{pageTitle}</h1>
            <div className="flex gap-40 items-center">
                <h3 className={`text-[#6e7da3] ${pageTitle === "Discover" ? "w-full" : "w-1/3"}`}>{pageDescription}</h3>
                <div className="flex items-center gap-4 flex-1 justify-end ">
                     {pageTitle !== "My Music" && <input 
                         type="text" 
                         placeholder={pageTitle === "My Events" ? "Search events..." : pageTitle === "My Network" ? "Search connections..." : "Search music, artists..."}
                         className="w-64 bg-[#2c2c4c] rounded-3xl border border-[#6e7da3] focus:border-white focus:outline-none px-5 py-2 text-white text-xs" 
                     />}
                    {pageTitle !== "Discover" && <button className="flex items-center gap-1 bg-[#2c3e57] py-2 px-4 text-white rounded-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)] hover:bg-[#3c4e67] text-sm whitespace-nowrap">
                        {icon} {buttonText}
                    </button>}
                    {pageTitle === "My Music" && <button className="flex items-center gap-1 bg-[#2c3e57] py-2 px-4 text-white rounded-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)] hover:bg-[#3c4e67] text-sm whitespace-nowrap">
                        <UploadSimpleIcon size={18} /> Upload Track
                    </button>}
                </div>
            </div>
        </div>
    );
}
