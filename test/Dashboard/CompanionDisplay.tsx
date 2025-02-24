"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useUserData } from '@/hooks/useUserData';
import { CHARACTERS, DEFAULT_CHARACTER_STATS } from '@/constants';
import { CharacterId } from '@/types';
import Loading from "@/components/Common/Loading";
import { calculateLevel } from '@/constants/characterProgress';

export default function CompanionDisplay() {
  const { userData, loading } = useUserData();

  if (loading) {
    return <Loading message="Loading your companion..." />;
  }

  // Always have a default companion
  const companion = userData?.settings?.selectedCompanion || 'sayori';
  const characterData = CHARACTERS[companion as keyof typeof CHARACTERS];
  const characterStats = userData?.stats?.characterStats?.[companion] || DEFAULT_CHARACTER_STATS;
  const { level } = calculateLevel(characterStats.totalMinutes);

  return (
    <div className="h-full flex flex-col items-center justify-end relative">
      {/* Level Badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="absolute top-4 right-4 bg-pink-500 text-white rounded-full px-4 py-2 font-[Halogen] shadow-lg"
      >
        Level {level}
      </motion.div>

      {/* Character Sprite */}
      <motion.div
        className="relative h-[90vh] w-full"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={CHARACTERS[companion as keyof typeof CHARACTERS].spritePath}
          alt={CHARACTERS[companion as keyof typeof CHARACTERS].name}
          fill
          sizes="(max-width: 768px) 250px, (max-width: 1024px) 350px, 450px"
          className="object-contain object-bottom"
          priority
        />
      </motion.div>

      {/* Stats Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-pink-700">Total Time</p>
            <p className="font-[Halogen] text-pink-900">
              {Math.floor(characterStats.totalMinutes / 60)}h {characterStats.totalMinutes % 60}m
            </p>
          </div>
          <div>
            <p className="text-sm text-pink-700">Sessions</p>
            <p className="font-[Halogen] text-pink-900">
              {characterStats.totalSessions} completed
            </p>
          </div>
          <div>
            <p className="text-sm text-pink-700">Backgrounds</p>
            <p className="font-[Halogen] text-pink-900">
              {characterStats.backgrounds.length} unlocked
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 