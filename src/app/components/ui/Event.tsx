'use client';
import { useState } from "react";
import ProfileImage from "./ProfileImage";
import { Card } from "@/components/ui/card";
import { CalendarBlank, Clock, MapPin, UsersThree, Ticket, Plus, X } from "@phosphor-icons/react";

interface EventData {
    id: string;
    name: string;
    date: string;
    time: string;
    location: string;
    description: string;
    attendees: number;
    maxAttendees?: number;
    organizer: string;
    organizerInitial: string;
    genre: string;
    price?: string;
    isInterested?: boolean;
    isPast?: boolean;
}

export default function Event({ tab }: { tab: string }) {
    const [upcomingEvents, setUpcomingEvents] = useState<EventData[]>([
        {
            id: "1",
            name: "Weekend Jam Session",
            date: "March 15, 2025",
            time: "7:00 PM",
            location: "The Music Studio, Downtown",
            description: "Join us for an amazing jam session with local musicians. Bring your instruments and let's create some magic together!",
            attendees: 12,
            maxAttendees: 20,
            organizer: "Alex Chen",
            organizerInitial: "A",
            genre: "Jazz",
            price: "Free",
            isInterested: false
        },
        {
            id: "2",
            name: "Rock Night at The Venue",
            date: "March 22, 2025",
            time: "8:30 PM",
            location: "The Venue, Music District",
            description: "A night dedicated to rock music. Multiple bands will perform, and we're looking for more musicians to join!",
            attendees: 8,
            maxAttendees: 15,
            organizer: "Sarah Wilson",
            organizerInitial: "S",
            genre: "Rock",
            price: "$15",
            isInterested: true
        }
    ]);

    const [pastEvents, setPastEvents] = useState<EventData[]>([
        {
            id: "4",
            name: "Winter Music Festival",
            date: "February 14, 2025",
            time: "6:00 PM",
            location: "City Park Amphitheater",
            description: "Annual winter music festival featuring local bands and solo artists.",
            attendees: 45,
            organizer: "Emma Davis",
            organizerInitial: "E",
            genre: "Mixed",
            price: "$25",
            isPast: true
        }
    ]);

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        name: "",
        date: "",
        time: "",
        location: "",
        description: "",
        maxAttendees: "",
        genre: "",
        price: ""
    });

    const handleInterestToggle = (eventId: string) => {
        setUpcomingEvents(prev => prev.map(event => 
            event.id === eventId 
                ? { 
                    ...event, 
                    isInterested: !event.isInterested,
                    attendees: event.isInterested ? event.attendees - 1 : event.attendees + 1
                }
                : event
        ));
    };

    const handleCreateEvent = (e: React.FormEvent) => {
        e.preventDefault();
        const event: EventData = {
            id: Date.now().toString(),
            name: newEvent.name,
            date: newEvent.date,
            time: newEvent.time,
            location: newEvent.location,
            description: newEvent.description,
            attendees: 0,
            maxAttendees: parseInt(newEvent.maxAttendees) || undefined,
            organizer: "You",
            organizerInitial: "Y",
            genre: newEvent.genre,
            price: newEvent.price || "Free"
        };
        
        setUpcomingEvents(prev => [event, ...prev]);
        setNewEvent({
            name: "",
            date: "",
            time: "",
            location: "",
            description: "",
            maxAttendees: "",
            genre: "",
            price: ""
        });
        setShowCreateForm(false);
    };

    const renderEventCard = (event: EventData, showInterestButton = true) => (
        <Card key={event.id} className="mt-4 max-w-4xl">
            <div className="w-full">
                {/* Event Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                        <ProfileImage firstLetter={event.organizerInitial} />
                        <div>
                            <h3 className="text-white font-semibold text-lg">{event.name}</h3>
                            <div className="flex items-center gap-2 text-[#6e7da3] text-sm">
                                <span>by {event.organizer}</span>
                                <span>•</span>
                                <span className="px-2 py-1 bg-[#2c3e57] text-orange-400 text-xs rounded-full">
                                    {event.genre}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-orange-500 font-semibold">{event.price}</div>
                        {event.isPast && (
                            <div className="text-[#6e7da3] text-xs">Past Event</div>
                        )}
                    </div>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#a3aec8]">
                            <CalendarBlank size={16} className="text-[#6e7da3]" />
                            <span className="text-sm">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#a3aec8]">
                            <Clock size={16} className="text-[#6e7da3]" />
                            <span className="text-sm">{event.time}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#a3aec8]">
                            <MapPin size={16} className="text-[#6e7da3]" />
                            <span className="text-sm">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#a3aec8]">
                            <UsersThree size={16} className="text-[#6e7da3]" />
                            <span className="text-sm">
                                {event.attendees} {event.maxAttendees ? `of ${event.maxAttendees}` : ''} attendees
                            </span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-[#a3aec8] text-sm mb-4">{event.description}</p>

                {/* Action Button */}
                {showInterestButton && !event.isPast && (
                    <button
                        onClick={() => handleInterestToggle(event.id)}
                        className={`w-full py-2 px-4 rounded-lg transition-colors font-medium ${
                            event.isInterested
                                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                : 'bg-[#2c3e57] hover:bg-[#3c4e67] text-white'
                        }`}
                    >
                        {event.isInterested ? "I'm Going!" : "I'm Interested"}
                    </button>
                )}
            </div>
        </Card>
    );

    const renderCreateForm = () => (
        <Card className="mt-4 max-w-4xl">
            <div className="w-full">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-heading text-white">Create New Event</h2>
                    <button
                        onClick={() => setShowCreateForm(false)}
                        className="text-[#6e7da3] hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleCreateEvent} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Event Name</label>
                            <input
                                type="text"
                                required
                                value={newEvent.name}
                                onChange={(e) => setNewEvent(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full bg-[#2c2c4c] border border-[#6e7da3] rounded-md p-2 text-white focus:border-white outline-none"
                                placeholder="Enter event name"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Genre</label>
                            <select
                                required
                                value={newEvent.genre}
                                onChange={(e) => setNewEvent(prev => ({ ...prev, genre: e.target.value }))}
                                className="w-full bg-[#2c2c4c] border border-[#6e7da3] rounded-md p-2 text-white focus:border-white outline-none"
                            >
                                <option value="">Select genre</option>
                                <option value="Rock">Rock</option>
                                <option value="Jazz">Jazz</option>
                                <option value="Blues">Blues</option>
                                <option value="Acoustic">Acoustic</option>
                                <option value="Electronic">Electronic</option>
                                <option value="Classical">Classical</option>
                                <option value="Folk">Folk</option>
                                <option value="Mixed">Mixed</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Date</label>
                            <input
                                type="date"
                                required
                                value={newEvent.date}
                                onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                                className="w-full bg-[#2c2c4c] border border-[#6e7da3] rounded-md p-2 text-white focus:border-white outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Time</label>
                            <input
                                type="time"
                                required
                                value={newEvent.time}
                                onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                                className="w-full bg-[#2c2c4c] border border-[#6e7da3] rounded-md p-2 text-white focus:border-white outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Price</label>
                            <input
                                type="text"
                                value={newEvent.price}
                                onChange={(e) => setNewEvent(prev => ({ ...prev, price: e.target.value }))}
                                className="w-full bg-[#2c2c4c] border border-[#6e7da3] rounded-md p-2 text-white focus:border-white outline-none"
                                placeholder="e.g., Free, $15, $25"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-white text-sm font-medium mb-2">Location</label>
                        <input
                            type="text"
                            required
                            value={newEvent.location}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                            className="w-full bg-[#2c2c4c] border border-[#6e7da3] rounded-md p-2 text-white focus:border-white outline-none"
                            placeholder="Enter venue or location"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-medium mb-2">Max Attendees</label>
                        <input
                            type="number"
                            value={newEvent.maxAttendees}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, maxAttendees: e.target.value }))}
                            className="w-full bg-[#2c2c4c] border border-[#6e7da3] rounded-md p-2 text-white focus:border-white outline-none"
                            placeholder="Leave empty for unlimited"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-medium mb-2">Description</label>
                        <textarea
                            required
                            rows={4}
                            value={newEvent.description}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full bg-[#2c2c4c] border border-[#6e7da3] rounded-md p-2 text-white focus:border-white outline-none resize-none"
                            placeholder="Describe your event..."
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors"
                        >
                            <Plus size={16} />
                            Create Event
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowCreateForm(false)}
                            className="px-6 py-2 border border-[#6e7da3] text-[#6e7da3] rounded-md hover:border-white hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Card>
    );

    const renderContent = () => {
        switch (tab) {
            case 'upcoming':
                return (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-heading text-white">Upcoming Events ({upcomingEvents.length})</h2>
                            <div className="flex items-center gap-2 text-[#6e7da3] text-sm">
                                <CalendarBlank size={16} />
                                <span>Events happening soon</span>
                            </div>
                        </div>
                        {upcomingEvents.length === 0 ? (
                            <div className="text-center py-12">
                                <CalendarBlank size={48} className="text-[#6e7da3] mx-auto mb-4" />
                                <h3 className="text-white text-lg mb-2">No upcoming events</h3>
                                <p className="text-[#6e7da3]">Check back later for new events or create your own!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {upcomingEvents.map(event => renderEventCard(event))}
                            </div>
                        )}
                    </div>
                );

            case 'past':
                return (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-heading text-white">Past Events ({pastEvents.length})</h2>
                            <div className="flex items-center gap-2 text-[#6e7da3] text-sm">
                                <Ticket size={16} />
                                <span>Events you've attended</span>
                            </div>
                        </div>
                        {pastEvents.length === 0 ? (
                            <div className="text-center py-12">
                                <Ticket size={48} className="text-[#6e7da3] mx-auto mb-4" />
                                <h3 className="text-white text-lg mb-2">No past events</h3>
                                <p className="text-[#6e7da3]">Your event history will appear here after attending events.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {pastEvents.map(event => renderEventCard(event, false))}
                            </div>
                        )}
                    </div>
                );

            case 'create':
                return (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-heading text-white">Create Event</h2>
                            {!showCreateForm && (
                                <button
                                    onClick={() => setShowCreateForm(true)}
                                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
                                >
                                    <Plus size={16} />
                                    New Event
                                </button>
                            )}
                        </div>
                        
                        {showCreateForm ? (
                            renderCreateForm()
                        ) : (
                            <div className="text-center py-12">
                                <Plus size={48} className="text-[#6e7da3] mx-auto mb-4" />
                                <h3 className="text-white text-lg mb-2">Ready to create an event?</h3>
                                <p className="text-[#6e7da3] mb-6">Bring musicians together by organizing your own event.</p>
                                <button
                                    onClick={() => setShowCreateForm(true)}
                                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md transition-colors mx-auto"
                                >
                                    <Plus size={16} />
                                    Create Your First Event
                                </button>
                            </div>
                        )}
                    </div>
                );

            default:
                return (
                    <div className="p-6">
                        <h2 className="text-xl font-heading text-white">Events</h2>
                        <p className="text-[#6e7da3]">Select a tab to view events.</p>
                    </div>
                );
        }
    };

    return renderContent();
}