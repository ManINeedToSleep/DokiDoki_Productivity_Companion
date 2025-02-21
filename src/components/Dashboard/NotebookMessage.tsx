"use client";

import { motion } from 'framer-motion';
import { useUserData } from '@/hooks/useUserData';
import { useMemo } from 'react';

const companionMessages = {
  sayori: {
    new: [
      "I'm so excited to start this journey with you! Let's make every day count! ♪",
      "Yay! A new friend to study with! We're going to have so much fun being productive!",
      "Hi hi! I'm Sayori! I'll help you stay motivated and cheerful! ♪"
    ],
    returning: [
      "Welcome back! Ready to be super productive today? ♪",
      "Yay! You're here! Let's make today amazing!",
      "I knew you'd come back! Let's do our best together!"
    ],
    progress: (sessions: number) => `You've completed ${sessions} sessions so far! That's amazing! Keep it up! ♪`
  },
  yuri: {
    new: [
      "I hope we can create a peaceful and productive atmosphere together...",
      "I'll do my best to help you stay focused...",
      "Welcome... I look forward to our study sessions together..."
    ],
    returning: [
      "Welcome back... Shall we begin where we left off?",
      "I find our productive moments together... quite enjoyable.",
      "I've been looking forward to our next study session..."
    ],
    progress: (sessions: number) => `${sessions} study sessions... your dedication is truly admirable.`
  }
  // Add other characters...
};

export default function NotebookMessage() {
  const { userData } = useUserData();
  const companion = userData?.settings.selectedCompanion || 'sayori';
  const isNewUser = userData?.stats.totalSessions === 0;
  const totalSessions = userData?.stats.totalSessions || 0;

  // Generate random message but keep it consistent during component lifecycle
  const message = useMemo(() => {
    const messages = companionMessages[companion as keyof typeof companionMessages];
    if (!messages) return companionMessages.sayori.new[0];

    if (isNewUser) {
      const newMessages = messages.new;
      return newMessages[Math.floor(Math.random() * newMessages.length)];
    }

    // Alternate between returning messages and progress message
    const returningMessages = messages.returning;
    const shouldShowProgress = Math.random() > 0.5;
    
    if (shouldShowProgress) {
      return messages.progress(totalSessions);
    }
    
    return returningMessages[Math.floor(Math.random() * returningMessages.length)];
  }, [companion, isNewUser, totalSessions]);

  return (
    <motion.div 
      className="fixed bottom-0 left-[25%] right-0 z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Main content */}
      <div className="relative bg-[#FFEEF3] border-t-4 border-x-4 border-[#FFB6C1] p-6">
        <div className="max-w-4xl mx-8">
          <div className="font-[Halogen] text-lg text-pink-700 leading-relaxed"
            style={{ 
              backgroundImage: "linear-gradient(transparent 0%, transparent 90%, #FFB6C1 90%, #FFB6C1 100%)",
              backgroundSize: "100% 1.5em",
              lineHeight: "1.5em",
              paddingBottom: "0.5em"
            }}
          >
            {isNewUser ? (
              <p>Dear {userData?.email?.split('@')[0]},</p>
            ) : (
              <p>Welcome back, {userData?.email?.split('@')[0]}!</p>
            )}
            <p>{message}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface CompanionMessageProps {
  companion: string;
  isNewUser: boolean;
  totalSessions: number;
}

function CompanionMessage({ companion, isNewUser, totalSessions }: CompanionMessageProps) {
  const messages = {
    sayori: isNewUser 
      ? "I'm so excited to start this journey with you! Let's make every day count! ♪"
      : `You've completed ${totalSessions} sessions so far! That's amazing!`,
    yuri: isNewUser
      ? "I hope we can create a peaceful and productive atmosphere together..."
      : `${totalSessions} study sessions... your dedication is admirable.`,
    // Add other characters...
  };

  return (
    <p>{messages[companion as keyof typeof messages] || messages.sayori}</p>
  );
} 