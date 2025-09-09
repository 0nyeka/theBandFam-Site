import Post from "./Post";

export default function Feed() {
    return (
        <div className="ml-55 mt-4 border-t border-gray-600 max-w-2xl pt-5 gap-4">
            <Post 
                type="regular"
                name="John Doe" 
                musicianType="Guitarist" 
                timeAgo="2 hours ago" 
                profileLetter="J" 
                caption="Just finished recording my new track! What do you think? 🎸 #newmusic #guitar"
                photo="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop"
                numberOfLikes={24} 
                numberOfComments={8} 
                likes={["John Doe", "Sarah Wilson"]} 
                comments={[
                    {
                        id: "1",
                        author: "Sarah Johnson",
                        authorInitial: "S",
                        content: "This is amazing! Love the vibe 🔥",
                        timeAgo: "2h ago"
                    }
                ]} 
            />
            <Post 
                type="music"
                name="Sarah Wilson" 
                musicianType="Vocalist" 
                timeAgo="1 hour ago" 
                profileLetter="S" 
                caption="New song out now! Check it out and let me know what you think! 🎤"
                photo="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop"
                numberOfLikes={42} 
                numberOfComments={12} 
                likes={["John Doe", "Sarah Wilson"]} 
                comments={[
                    {
                        id: "1",
                        author: "Mike Chen",
                        authorInitial: "M",
                        content: "Great work! Would love to collaborate sometime.",
                        timeAgo: "2h ago"
                    }
                ]} 
            />
            <Post 
                type="regular"
                name="Mike Johnson" 
                musicianType="Drummer" 
                timeAgo="30 minutes ago" 
                profileLetter="M" 
                caption="New drum kit arrived! Time to make some noise 🥁"
                photo="https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&h=600&fit=crop"
                numberOfLikes={18} 
                numberOfComments={5} 
                likes={["John Doe", "Sarah Wilson"]} 
                comments={[
                    {
                        id: "1",
                        author: "Emma Davis",
                        authorInitial: "E",
                        content: "This is amazing! Love the vibe 🔥",
                        timeAgo: "2h ago"
                    }
                ]} 
            />
            <Post 
                type="regular"
                name="Emma Davis" 
                musicianType="Pianist" 
                timeAgo="15 minutes ago" 
                profileLetter="E" 
                caption="Late night piano session. There's something magical about playing in the dark 🎹"
                numberOfLikes={31} 
                numberOfComments={9} 
                likes={["John Doe", "Sarah Wilson"]} 
                comments={[
                    {
                        id: "1",
                        author: "Alex Chen",
                        authorInitial: "A",
                        content: "Great work! Would love to collaborate sometime.",
                        timeAgo: "2h ago"
                    }
                ]} 
            />
            <Post 
                type="event"
                name="Alex Chen" 
                musicianType="Bassist" 
                timeAgo="5 minutes ago" 
                profileLetter="A" 
                caption="Join us for an amazing jam session! 🎵"
                numberOfLikes={7} 
                numberOfComments={3} 
                likes={["John Doe", "Sarah Wilson"]} 
                comments={[
                    {
                        id: "1",
                        author: "Emily Johnson",
                        authorInitial: "E",
                        content: "This is amazing! Love the vibe 🔥",
                        timeAgo: "2h ago"
                    }
                ]}
                eventName="Weekend Jam Session"
                eventDate="March 15, 2025"
                eventTime="7:00 PM"
                eventLocation="The Music Studio, Downtown"
                eventAttendees="12"
            />
        </div>
    )
}