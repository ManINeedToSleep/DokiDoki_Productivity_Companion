"use client";

import { motion } from 'framer-motion';
import { useUserData } from '@/hooks/useUserData';

const companionData = {
  sayori: {
    spritePath: "/images/sprites/Sayori-hc-724.png",
    welcomeMessages: [
      "Heeeey! Welcome back! Ready to be productive together? ♪",
      "Yay! You're here! Let's make today super awesome!",
      "I knew you'd come back! Let's do our best today!"
    ],
    newUserMessages: [
      "Hi! I'm Sayori! I'll be your study buddy from now on!",
      "We're going to have so much fun being productive together!"
    ]
  },
  yuri: {
    spritePath: "/images/sprites/Yuri-hc-724.png",
    welcomeMessages: [
      "Welcome back... I've been looking forward to our next study session.",
      "Shall we begin where we left off?",
      "I find our productive moments together... quite enjoyable."
    ],
    newUserMessages: [
      "Hello... I'm Yuri. I'll do my best to help you stay focused.",
      "I hope we can create a peaceful and productive atmosphere together."
    ]
  },
  // Add other characters...
};

export default function CompanionDisplay() {
  const { userData, loading } = useUserData();
  const companion = userData?.settings.selectedCompanion || 'sayori';
  
  if (loading) return null;

  return (
    <div className="h-full flex items-end justify-center">
      <motion.img
        src={companionData[companion as keyof typeof companionData].spritePath}
        alt={`${companion} sprite`}
        className="h-[90vh] object-contain"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
} 