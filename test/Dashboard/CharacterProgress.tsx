"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserData } from '@/hooks/useUserData';
import { CHARACTERS, DEFAULT_CHARACTER_STATS } from '@/constants';
import { CHARACTER_BACKGROUNDS, LEVEL_UP_MINUTES, MAX_LEVEL } from '@/constants/characterProgress';
import { CharacterId } from '@/types';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import DDLCButton from '@/components/Common/Buttons/Button';
import { CharacterProgressModal } from './CharacterProgressModal';
import { CharacterSelector } from './CharacterSelector';
import Loading from "@/components/Common/Loading";

export function CharacterProgress() {
  const { userData, loading } = useUserData();
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterId>('sayori');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update selected character when userData changes
  useEffect(() => {
    if (userData?.settings?.selectedCompanion) {
      setSelectedCharacter(userData.settings.selectedCompanion as CharacterId);
    }
  }, [userData]);

  if (loading) {
    return <Loading message="Loading character progress..." />;
  }

  if (!userData) return null;

  if (!userData?.stats?.characterStats) {
    // Add type assertion for the companion
    const defaultCompanion = (userData?.settings?.selectedCompanion || 'sayori') as keyof typeof CHARACTERS;

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-[Riffic] text-pink-700">Character Progress</h2>
        <div className="bg-white/50 p-6 rounded-lg border-2 border-pink-200 text-center">
          <motion.p 
            className="text-pink-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Begin your journey with {CHARACTERS[defaultCompanion].name}!
          </motion.p>
          <DDLCButton 
            label="Check Progress System" 
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <CharacterProgressModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          companion={defaultCompanion}
        />
      </div>
    );
  }

  const characterStats = userData.stats.characterStats[selectedCharacter] || DEFAULT_CHARACTER_STATS;
  const character = CHARACTERS[selectedCharacter];
  const progress = (characterStats.currentLevelMinutes / LEVEL_UP_MINUTES) * 100;
  const availableBackgrounds = CHARACTER_BACKGROUNDS[selectedCharacter];

  console.log('Selected character:', selectedCharacter); // Debug log
  console.log('Character stats:', characterStats); // Debug log

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-[Riffic] text-pink-700">Character Progress</h2>
      
      <CharacterSelector
        selectedCharacter={selectedCharacter}
        onSelect={setSelectedCharacter}
        characterStats={userData.stats.characterStats}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCharacter}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative">
              <Image
                src={character.chibiPath}
                alt={character.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-[Halogen] text-pink-800">
                  Level {characterStats.level}
                </h3>
                <span className="text-sm text-pink-600">
                  {characterStats.level === MAX_LEVEL ? "MAX" : `${characterStats.currentLevelMinutes}/${LEVEL_UP_MINUTES} min`}
                </span>
              </div>
              <div className="w-full h-2 bg-pink-100 rounded-full overflow-hidden mt-2">
                <motion.div
                  className="h-full bg-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/50 p-3 rounded-lg">
              <p className="text-pink-700">Total Time</p>
              <p className="text-pink-900 font-[Halogen]">
                {Math.floor(characterStats.totalMinutes / 60)}h {characterStats.totalMinutes % 60}m
              </p>
            </div>
            <div className="bg-white/50 p-3 rounded-lg">
              <p className="text-pink-700">Sessions</p>
              <p className="text-pink-900 font-[Halogen]">
                {characterStats.totalSessions} completed
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-[Halogen] text-pink-800 mb-3">Backgrounds</h3>
            <div className="grid grid-cols-2 gap-3">
              {availableBackgrounds.map((bg) => {
                const isUnlocked = characterStats.backgrounds.some(b => b.id === bg.id);
                const unlockedBg = characterStats.backgrounds.find(b => b.id === bg.id);

                return (
                  <motion.div
                    key={bg.id}
                    className={`relative rounded-lg overflow-hidden ${
                      !isUnlocked ? 'opacity-50 grayscale' : ''
                    }`}
                    whileHover={{ scale: isUnlocked ? 1.05 : 1 }}
                  >
                    <Image
                      src={bg.path}
                      alt={bg.name}
                      width={200}
                      height={112}
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                      <p className="text-xs text-white font-[Halogen]">{bg.name}</p>
                      {isUnlocked ? (
                        <p className="text-xs text-pink-300">
                          Unlocked {formatDistanceToNow(unlockedBg!.unlockedAt, { addSuffix: true })}
                        </p>
                      ) : (
                        <p className="text-xs text-pink-300">
                          Unlock at {bg.requiredMinutes} minutes
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 