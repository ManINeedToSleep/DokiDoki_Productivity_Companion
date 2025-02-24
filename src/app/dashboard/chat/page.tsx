"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserData } from '@/hooks/useUserData';
import Loading from '@/components/Common/Loading';
import CompanionDisplay from '@/components/Dashboard/CompanionDisplay';
import { useSound } from '@/hooks/useSound';
import DDLCButton from '@/components/Common/Buttons/Button';

interface Message {
  id: string;
  sender: 'user' | 'companion';
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}

function capitalizeFirstLetter(string: string | undefined): string {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Add this color mapping after the capitalizeFirstLetter function
const companionColors = {
  monika: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-900',
    userBg: 'bg-emerald-500'
  },
  yuri: {
    bg: 'bg-purple-100',
    text: 'text-purple-900',
    userBg: 'bg-purple-500'
  },
  natsuki: {
    bg: 'bg-pink-100',
    text: 'text-pink-900',
    userBg: 'bg-pink-500'
  },
  sayori: {
    bg: 'bg-sky-100',
    text: 'text-sky-900',
    userBg: 'bg-sky-500'
  }
} as const;

export default function ChatPage() {
  const { userData, loading } = useUserData();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isCompanionTyping, setIsCompanionTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const playSelectSound = useSound('/audio/sfx/ddlc-select-sfx.mp3');

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) return <Loading />;

  const simulateCompanionTyping = async (text: string) => {
    setIsCompanionTyping(true);
    
    // Simulate typing delay (2-4 seconds)
    await new Promise(resolve => 
      setTimeout(resolve, 2000 + Math.random() * 2000)
    );

    setIsCompanionTyping(false);
    return {
      id: Date.now().toString(),
      sender: 'companion' as const,
      text,
      timestamp: new Date()
    };
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    playSelectSound();
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // TODO: Replace with actual AI response
    const companionResponse = await simulateCompanionTyping(
      `Hey there! I'm ${capitalizeFirstLetter(userData?.settings?.selectedCompanion)}. I'm still learning how to chat, but I'll be fully functional soon!`
    );
    setMessages(prev => [...prev, companionResponse]);
  };

  // Get the current companion's colors
  const currentColors = companionColors[userData?.settings?.selectedCompanion as keyof typeof companionColors] || companionColors.sayori;

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 flex">
      {/* Chat Section - 2/3 width */}
      <div className="w-2/3 p-8">
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg h-[calc(100vh-8rem)] flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-[Riffic] text-pink-700 mb-8">
            Chat with {capitalizeFirstLetter(userData?.settings?.selectedCompanion)}
          </h1>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto mb-4 p-4">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div 
                    className={`max-w-[70%] p-4 rounded-lg ${
                      message.sender === 'user' 
                        ? `${currentColors.userBg} text-white` 
                        : `${currentColors.bg} ${currentColors.text}`
                    }`}
                  >
                    <p className="font-['Halogen']">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' 
                        ? 'opacity-70' 
                        : `${currentColors.text} opacity-50`
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isCompanionTyping && (
                <motion.div
                  key="typing-indicator"
                  className="flex justify-start mb-4"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className={`${currentColors.bg} ${currentColors.text} p-4 rounded-lg`}>
                    <p className="font-['Halogen']">typing...</p>
                  </div>
                </motion.div>
              )}
              <div key="messages-end" ref={messagesEndRef} />
            </AnimatePresence>
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-white/50 border border-pink-100 
                focus:border-pink-300 focus:outline-none text-pink-900 
                font-['Halogen'] placeholder:text-pink-300"
              placeholder="Type your message..."
            />
            <DDLCButton
              label="Send"
              disabled={!newMessage.trim() || isCompanionTyping}
            />
          </form>
        </motion.div>
      </div>

      {/* Companion Section - 1/3 width */}
      <div className="w-1/3 fixed right-0 top-16 bottom-0">
        <CompanionDisplay />
      </div>
    </div>
  );
}
