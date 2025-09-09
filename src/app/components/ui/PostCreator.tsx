'use client';
import { useRef, useState } from "react";
import ProfileImage from "./ProfileImage";
import { Card } from "@/components/ui/card";
import { CameraIcon, MusicNotesIcon, CalendarBlankIcon, XIcon, PlusIcon  } from '@phosphor-icons/react';

interface MediaFile {
    file: File;
    previewUrl: string;
    id: string;
}

export default function PostCreator() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const audioInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<MediaFile[]>([]);
    const [showMusicForm, setShowMusicForm] = useState(false);
    const [showEventForm, setShowEventForm] = useState(false);
    const [musicData, setMusicData] = useState({
        name: '',
        genre: '',
        audioFile: null as File | null
    });
    const [eventData, setEventData] = useState({
        name: '',
        date: '',
        time: '',
        location: '',
        price: '',
        currency: 'USD'
    });
    const [postText, setPostText] = useState("");

    const uploadButtonStyle = "flex items-center gap-2 bg-[#2c3e57] text-white px-3 sm:px-4 py-1 rounded-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)] hover:bg-[#3c4e67] text-sm";

    const handleMediaClick = () => {
        fileInputRef.current?.click();
    };

    const handleMusicClick = () => {
        setShowMusicForm(!showMusicForm);
        setShowEventForm(false); // Close event form if open
    };

    const handleEventClick = () => {
        setShowEventForm(!showEventForm);
        setShowMusicForm(false); // Close music form if open
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newMediaFiles: MediaFile[] = Array.from(files).map(file => ({
                file,
                previewUrl: URL.createObjectURL(file),
                id: Math.random().toString(36).substr(2, 9)
            }));
            
            setSelectedFiles(prev => [...prev, ...newMediaFiles]);
        }
    };

    const handleAudioFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setMusicData(prev => ({ ...prev, audioFile: file }));
        }
    };

    const removeFile = (fileId: string) => {
        setSelectedFiles(prev => {
            const fileToRemove = prev.find(f => f.id === fileId);
            if (fileToRemove) {
                URL.revokeObjectURL(fileToRemove.previewUrl);
            }
            return prev.filter(f => f.id !== fileId);
        });
    };

    const removeAllFiles = () => {
        selectedFiles.forEach(file => {
            URL.revokeObjectURL(file.previewUrl);
        });
        setSelectedFiles([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const closeMusicForm = () => {
        setShowMusicForm(false);
        setMusicData({ name: '', genre: '', audioFile: null });
        if (audioInputRef.current) {
            audioInputRef.current.value = '';
        }
    };

    const closeEventForm = () => {
        setShowEventForm(false);
        setEventData({ name: '', date: '', time: '', location: '', price: '', currency: 'USD' });
    };

    const isPostDisabled = postText.trim().length === 0;

    return (
        <div className="ml-55">
            <Card className="mt-10 max-w-2xl">
                {/* Hidden file inputs */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    multiple
                    className="hidden"
                />
                <input
                    ref={audioInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioFileChange}
                    className="hidden"
                />

                {/* Top row: Profile + Textarea */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full text-sm">
                    <ProfileImage firstLetter="O" />
                    <textarea
                        rows={4}
                        placeholder="What's on your mind?"
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                        className="flex-1 bg-[#2c2c4c] border border-[#6e7da3] rounded-md 
                                    p-2 outline-none shadow-inner text-white resize-none
                                    w-full sm:w-auto focus:border-white"
                    />
                </div>

                {/* Music upload form */}
                {showMusicForm && (
                    <div className="w-full bg-[#2c2c4c] rounded-md p-4 border border-[#6e7da3]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-white font-semibold">Upload Music</h3>
                            <button
                                onClick={closeMusicForm}
                                className="text-[#6e7da3] transition-colors bg-[#2c3e57] text-white border border-[#6e7da3] rounded-full cursor-pointer hover:bg-[#3c4e67] p-1"
                            >
                                <XIcon size={20} />
                            </button>
                        </div>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="block text-white text-sm mb-1">Song Name</label>
                                <input
                                    type="text"
                                    value={musicData.name}
                                    onChange={(e) => setMusicData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Enter song name"
                                    className="w-full bg-[#1a1a2e] border border-[#6e7da3] rounded-md p-2 text-white focus:border-white outline-none"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-white text-sm mb-1">Genre</label>
                                <select
                                    value={musicData.genre}
                                    onChange={(e) => setMusicData(prev => ({ ...prev, genre: e.target.value }))}
                                    className="w-full bg-[#1a1a2e] border border-[#6e7da3] rounded-md p-2 text-white focus:border-white outline-none"
                                >
                                    <option value="">Select genre</option>
                                    <option value="rock">Rock</option>
                                    <option value="pop">Pop</option>
                                    <option value="hip-hop">Hip-Hop</option>
                                    <option value="jazz">Jazz</option>
                                    <option value="classical">Classical</option>
                                    <option value="electronic">Electronic</option>
                                    <option value="country">Country</option>
                                    <option value="blues">Blues</option>
                                    <option value="folk">Folk</option>
                                    <option value="r&b">R&B</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-white text-sm mb-1">Audio File</label>
                                <button
                                    onClick={() => audioInputRef.current?.click()}
                                    className="w-full bg-[#1a1a2e] border border-[#6e7da3] rounded-md p-2 text-white hover:border-white transition-colors text-left"
                                >
                                    {musicData.audioFile ? musicData.audioFile.name : 'Click to select audio file'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Event creation form */}
                {showEventForm && (
                    <div className="w-full bg-[#2c2c4c] rounded-md p-4 border border-[#6e7da3]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-white font-semibold">Create Event</h3>
                            <button
                                onClick={closeEventForm}
                                className="text-[#6e7da3] transition-colors bg-[#2c3e57] text-white border border-[#6e7da3] rounded-full cursor-pointer hover:bg-[#3c4e67] p-1"
                            >
                                <XIcon size={20} />
                            </button>
                        </div>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="block text-white text-sm mb-1">Event Name</label>
                                <input
                                    type="text"
                                    value={eventData.name}
                                    onChange={(e) => setEventData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Enter event name"
                                    className="w-full bg-[#1a1a2e] border border-[#6e7da3] rounded-md p-2 text-white focus:border-white outline-none"
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-white text-sm mb-1">Date</label>
                                    <input
                                        type="date"
                                        value={eventData.date}
                                        onChange={(e) => setEventData(prev => ({ ...prev, date: e.target.value }))}
                                        className="w-full bg-[#1a1a2e] border border-[#6e7da3] rounded-md p-2 text-white focus:border-white outline-none"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-white text-sm mb-1">Time</label>
                                    <input
                                        type="time"
                                        value={eventData.time}
                                        onChange={(e) => setEventData(prev => ({ ...prev, time: e.target.value }))}
                                        className="w-full bg-[#1a1a2e] border border-[#6e7da3] rounded-md p-2 text-white focus:border-white outline-none"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-white text-sm mb-1">Location</label>
                                <input
                                    type="text"
                                    value={eventData.location}
                                    onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
                                    placeholder="Enter event location"
                                    className="w-full bg-[#1a1a2e] border border-[#6e7da3] rounded-md p-2 text-white focus:border-white outline-none"
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-white text-sm mb-1">Price</label>
                                    <input
                                        type="text"
                                        value={eventData.price}
                                        onChange={(e) => setEventData(prev => ({ ...prev, price: e.target.value }))}
                                        placeholder="e.g., 15, 25, Free"
                                        className="w-full bg-[#1a1a2e] border border-[#6e7da3] rounded-md p-2 text-white focus:border-white outline-none"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-white text-sm mb-1">Currency</label>
                                    <select
                                        value={eventData.currency}
                                        onChange={(e) => setEventData(prev => ({ ...prev, currency: e.target.value }))}
                                        className="w-full bg-[#1a1a2e] border border-[#6e7da3] rounded-md p-2 text-white focus:border-white outline-none"
                                    >
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                        <option value="GBP">GBP (£)</option>
                                        <option value="CAD">CAD (C$)</option>
                                        <option value="AUD">AUD (A$)</option>
                                        <option value="JPY">JPY (¥)</option>
                                        <option value="NGN">NGN (₦)</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Multiple media files preview */}
                {selectedFiles.length > 0 && (
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-white font-semibold">Selected Media ({selectedFiles.length})</h3>
                            <button
                                onClick={removeAllFiles}
                                className="text-red-400 hover:text-red-300 text-sm transition-colors"
                            >
                                Remove All
                            </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {selectedFiles.map((mediaFile) => (
                                <div key={mediaFile.id} className="relative bg-[#2c2c4c] rounded-md p-2 border border-[#6e7da3]">
                                    {mediaFile.file.type.startsWith('image/') ? (
                                        <img 
                                            src={mediaFile.previewUrl} 
                                            alt="Preview" 
                                            className="w-full h-24 object-cover rounded-md"
                                        />
                                    ) : (
                                        <video 
                                            src={mediaFile.previewUrl} 
                                            className="w-full h-24 object-cover rounded-md"
                                        />
                                    )}
                                    <button
                                        onClick={() => removeFile(mediaFile.id)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors text-xs"
                                    >
                                        ×
                                    </button>
                                    <p className="text-white text-xs mt-1 truncate">{mediaFile.file.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 sm:gap-0">
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 justify-center sm:justify-start">
                        <button 
                            className={uploadButtonStyle}
                            onClick={handleMediaClick}
                        >
                            {selectedFiles.length > 0 ? <><PlusIcon size={16} /> <span>Add More</span></> : <><CameraIcon size={16} /><span>Media</span></>}
                        </button>
                        <button 
                            className={`${uploadButtonStyle} ${showMusicForm ? 'bg-orange-500' : ''}`}
                            onClick={handleMusicClick}
                        >
                            <MusicNotesIcon size={16} /> Music
                        </button>
                        <button 
                            className={`${uploadButtonStyle} ${showEventForm ? 'bg-orange-500' : ''}`}
                            onClick={handleEventClick}
                        >
                            <CalendarBlankIcon size={16} /> Event
                        </button> 
                    </div>
                    <button 
                        disabled={isPostDisabled}
                        className={`relative px-4 py-2 rounded-md w-full sm:w-auto font-bold transition-colors 
                            ${isPostDisabled 
                                ? 'bg-[rgba(255,165,0,0.10)] text-orange-400 opacity-50 cursor-not-allowed' 
                                : 'bg-[rgba(255,165,0,0.15)] text-orange-500 shadow-[inset_0_2px_6px_rgba(255,165,0,0.5)] hover:text-[#1a1a2e] overflow-hidden before:absolute before:inset-0 before:bg-orange-600 before:translate-x-[-100%] before:transition-transform before:duration-500 hover:before:translate-x-0'}
                        `}
                    >
                        <span className="relative z-10">Post</span>
                    </button>
                </div>
            </Card>
        </div>
    );
}
