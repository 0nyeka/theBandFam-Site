

export default function ProfileImage({firstLetter}: {firstLetter: string}) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-md bg-[#2c3e57] flex items-center justify-center shadow-md">
                <span className="text-white text-2xl">{firstLetter}</span>
            </div>
        </div>
    )
}