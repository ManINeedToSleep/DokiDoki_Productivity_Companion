"use client";

import { useUserData } from '@/hooks/useUserData';

type CompanionType = 'sayori' | 'yuri' | 'natsuki' | 'monika';

const companionMessages: Record<CompanionType, {
  welcomeMessages: string[];
  newUserMessages: string[];
}> = {
  sayori: {
    welcomeMessages: [
      "I'm so excited to start this journey with you! Let's make every day count! ♪",
      "Dear {name}, let's do our best together!"
    ],
    newUserMessages: [
      "Hi! I'm Sayori! I'll be your study buddy from now on!",
      "We're going to have so much fun being productive together!"
    ]
  },
  yuri: {
    welcomeMessages: [
      "Welcome back... I look forward to helping you stay focused.",
      "Dear {name}, shall we begin our productive session?"
    ],
    newUserMessages: [
      "Hello... I'm Yuri. I'll do my best to help you stay focused.",
      "I hope we can create a peaceful and productive atmosphere together."
    ]
  },
  natsuki: {
    welcomeMessages: [
      "Hey! Don't expect me to go easy on you just because we're starting!",
      "Alright, let's see what you've got! No slacking off!"
    ],
    newUserMessages: [
      "Listen up! I'm Natsuki, and I'll help you stay on track!",
      "Don't get the wrong idea, but I'll make sure you stay productive!"
    ]
  },
  monika: {
    welcomeMessages: [
      "Welcome! I've been waiting to help you with your goals.",
      "Hello! Ready to make the most of our time together?"
    ],
    newUserMessages: [
      "Hi, I'm Monika! I'll be your personal productivity partner.",
      "Together, we'll develop great study habits and achieve your goals!"
    ]
  }
};

export default function NotebookMessage() {
  const { userData, loading } = useUserData();
  
  if (loading || !userData) return null;

  const companion = userData.settings.selectedCompanion as CompanionType;
  if (!companionMessages[companion]) {
    console.error('Invalid companion type:', companion);
    return null;
  }

  const messages = userData.stats.totalSessions === 0
    ? companionMessages[companion].newUserMessages
    : companionMessages[companion].welcomeMessages;
    
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="text-pink-700 font-[Halogen] text-lg">
      {randomMessage}
    </div>
  );
} 