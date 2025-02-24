"use client";

import { useUserData } from './useUserData';
import { useNotification } from '@/contexts/NotificationContext';
import { calculateLevel, checkBackgroundUnlocks } from '@/constants/characterProgress';
import { CharacterId } from '@/types/character';

export function useCharacterProgress() {
  const { userData, updateSettings } = useUserData();
  const { showNotification } = useNotification();

  const updateCharacterProgress = async (characterId: CharacterId, minutesCompleted: number) => {
    if (!userData?.stats.characterStats) return;

    const currentStats = userData.stats.characterStats[characterId];
    const newTotalMinutes = currentStats.totalMinutes + minutesCompleted;
    
    // Calculate new level
    const levelInfo = calculateLevel(newTotalMinutes);
    const oldLevel = currentStats.level;

    // Check for new backgrounds
    const newBackgrounds = checkBackgroundUnlocks(
      characterId,
      newTotalMinutes,
      currentStats.backgrounds
    );

    // Update character stats
    const updatedStats = {
      ...currentStats,
      totalMinutes: newTotalMinutes,
      totalSessions: currentStats.totalSessions + 1,
      ...levelInfo,
      backgrounds: [...currentStats.backgrounds, ...newBackgrounds]
    };

    // Show notifications for level ups and new backgrounds
    if (levelInfo.level > oldLevel) {
      showNotification({
        message: `Level ${levelInfo.level} reached with ${characterId}!`,
        type: 'achievement',
        character: characterId,
        duration: 6000
      });
    }

    newBackgrounds.forEach(bg => {
      showNotification({
        message: `New background unlocked: ${bg.name}`,
        type: 'achievement',
        character: characterId,
        duration: 6000
      });
    });

    // Update user data
    await updateSettings({
      ...userData.settings,
      characterStats: {
        ...userData.stats.characterStats,
        [characterId]: updatedStats
      }
    });
  };

  return { updateCharacterProgress };
} 