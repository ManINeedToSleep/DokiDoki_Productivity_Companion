"use client";

import { motion } from "framer-motion";
import { useUserData } from '@/hooks/useUserData';
import { formatDistanceToNow } from 'date-fns';
import { ACHIEVEMENTS } from '@/constants/achievements';

interface AchievementItemProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  index: number;
}

const AchievementItem = ({ name, description, icon, unlockedAt, index }: AchievementItemProps) => {
  const isLocked = !unlockedAt;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`${
        isLocked ? 'bg-white/30 grayscale' : 'bg-white/50'
      } p-4 rounded-lg flex items-start gap-4 transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className={`text-2xl ${isLocked ? 'opacity-50' : 'animate-bounce'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-[Halogen] text-pink-800">{name}</h3>
        <p className="text-sm text-pink-700 mt-1">{description}</p>
        {unlockedAt && (
          <p className="text-xs text-pink-500 mt-2">
            Unlocked {formatDistanceToNow(unlockedAt, { addSuffix: true })}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const CATEGORIES = {
  milestones: {
    title: "Milestones",
    icon: "🎯",
    achievements: ['FIRST_SESSION', 'SESSIONS_10', 'TOTAL_HOURS_10']
  },
  streaks: {
    title: "Streaks",
    icon: "🔥",
    achievements: ['STREAK_3', 'STREAK_7']
  },
  goals: {
    title: "Goals",
    icon: "🎉",
    achievements: ['WEEKLY_GOAL']
  }
} as const;

export function Achievements() {
  const { userData } = useUserData();
  const achievements = userData?.stats?.achievements || [];
  
  const unlockedAchievements = new Set(achievements.map(a => a.id));
  const achievementDates = new Map(
    achievements.map(a => [a.id, a.unlockedAt])
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-[Riffic] text-pink-700">Achievements</h2>
        <span className="text-sm text-pink-600 font-[Halogen]">
          {unlockedAchievements.size} / {Object.keys(ACHIEVEMENTS).length} unlocked
        </span>
      </div>

      {Object.entries(CATEGORIES).map(([categoryId, category], categoryIndex) => (
        <motion.div
          key={categoryId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">{category.icon}</span>
            <h3 className="text-lg font-[Riffic] text-pink-700">{category.title}</h3>
          </div>

          <div className="space-y-3">
            {category.achievements.map((achievementId, index) => {
              const achievement = ACHIEVEMENTS[achievementId];
              return (
                <AchievementItem
                  key={achievement.id}
                  {...achievement}
                  unlockedAt={
                    unlockedAchievements.has(achievement.id)
                      ? achievementDates.get(achievement.id)
                      : undefined
                  }
                  index={index}
                />
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
} 