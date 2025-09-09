"use client";

import { useState } from "react";
import { Send, UserCircle } from "lucide-react";
import ProfileImage from "../components/ui/ProfileImage";

type Message = { id: number; sender: string; text: string; me: boolean };

export default function MessagesPage() {
  // Store conversations and their messages
  const [conversations, setConversations] = useState<Record<string, Message[]>>({
    Alice: [
      { id: 1, sender: "Alice", text: "Hey there! 👋", me: false },
      { id: 2, sender: "Me", text: "Hello Alice, how are you?", me: true },
      { id: 3, sender: "Alice", text: "I’m doing well, thanks for asking!", me: false },
    ],
    John: [
      { id: 1, sender: "John", text: "Yo, ready for practice?", me: false },
      { id: 2, sender: "Me", text: "Give me 10 mins", me: true },
    ],
    Mary: [{ id: 1, sender: "Mary", text: "Don’t forget tomorrow’s event 🎶", me: false }],
    "Group Chat": [
      { id: 1, sender: "Alice", text: "Let’s plan the setlist!", me: false },
      { id: 2, sender: "Me", text: "Cool, I’ll add my suggestions", me: true },
    ],
  });

  const [activeConversation, setActiveConversation] = useState<string>("Alice");
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    setConversations((prev) => ({
      ...prev,
      [activeConversation]: [
        ...prev[activeConversation],
        { id: Date.now(), sender: "Me", text: newMessage, me: true },
      ],
    }));

    setNewMessage("");
  };

  return (
    <div className="flex flex-1 bg-[linear-gradient(175deg,rgb(40,60,90)_0%,rgba(30,50,80,0.7)_85%)] text-white text-sm">
      {/* Sidebar - Conversations */}
      <aside className="w-60 bg-[#23233d] border-r border-[#2f2f4f] flex flex-col">
        <div className="p-4 text-lg font-semibold border-b border-[#2f2f4f]">
          Messages
        </div>
        <div className="flex-1 overflow-y-auto">
          {Object.keys(conversations).map((name) => (
            <div
              key={name}
              onClick={() => setActiveConversation(name)}
              className={`flex items-center gap-3 p-4 cursor-pointer ${
                activeConversation === name ? "shadow-[0_4px_10px_rgba(255,255,255,0.5)]" : "hover:shadow-[0_4px_15px_rgba(255,255,255,0.5)]"
              }`}
            >
              <ProfileImage firstLetter={name[0]} />
              <div>
                <div className="font-medium">{name}</div>
                <div className="text-sm text-gray-400 truncate w-34">
                  {conversations[name][conversations[name].length - 1]?.text || "No messages yet"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex flex-col flex-1">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#2f2f4f] flex items-center gap-3">
          <ProfileImage firstLetter={activeConversation[0]} />
          <div>
            <div className="font-semibold">{activeConversation}</div>
            <div className="text-sm text-gray-400">Online</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[linear-gradient(175deg,rgb(40,60,90)_0%,rgba(30,50,80,0.7)_85%)]">
          {conversations[activeConversation].map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.me ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs ${
                  msg.me
                    ? "bg-[#2c2c4c] shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)] text-white rounded-br-none"
                    : "bg-[#2c2c4c] text-gray-200 rounded-bl-none shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-[#2f2f4f] flex items-center gap-2">
          <input
            type="text"
            placeholder={`Message ${activeConversation}...`}
            className="flex-1 border border-[#6e7da3] focus:border-white bg-[#2c2c4c] rounded-full px-4 py-2 text-white outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-orange-600 hover:bg-orange-700 p-3 rounded-full transition"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </main>
    </div>
  );
}
