"use client";

import { motion } from "framer-motion";
import { formatDistanceToNow } from 'date-fns';
import { useUserData } from '@/hooks/useUserData';
import { CHARACTERS } from '@/constants/characters';
import Image from 'next/image';

interface ActivityItemProps {
  type: 'session' | 'achievement' | 'goal';
  description: string;
  date: string;
  index: number;
  character?: string;
}

const ActivityItem = ({ type, description, date, index, character }: ActivityItemProps) => {
  const iconMap = {
    session: "⏱️",
    achievement: "🏆",
    goal: "🎯"
  };

  const bgColorMap = {
    session: "bg-pink-50/70",
    achievement: "bg-yellow-50/70",
    goal: "bg-blue-50/70"
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`${bgColorMap[type]} p-4 rounded-lg flex items-start gap-3`}
    >
      {character ? (
        <div className="w-10 h-10 relative shrink-0">
          <Image
            src={CHARACTERS[character as keyof typeof CHARACTERS].chibiPath}
            alt={CHARACTERS[character as keyof typeof CHARACTERS].name}
            fill
            sizes="(max-width: 768px) 32px, 40px"
            className="object-contain"
          />
        </div>
      ) : (
        <span className="text-xl">{iconMap[type]}</span>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-pink-900 font-[Halogen] truncate">{description}</p>
        <p className="text-sm text-pink-600 mt-1">
          {formatDistanceToNow(new Date(date), { addSuffix: true })}
        </p>
      </div>
    </motion.div>
  );
};

export function RecentActivity() {
  const { userData } = useUserData();

  if (!userData) return null;

  const activities = (userData.stats?.recentActivity || []).slice(0, 3); // Show only 3 most recent activities

  if (!activities.length) {
    return (
      <div className="text-center text-pink-600 p-4 bg-white/30 rounded-lg">
        <p className="font-[Halogen]">No recent activities yet.</p>
        <p className="text-sm mt-2">Start your first study session!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-[Riffic] text-pink-700">Recent Activity</h2>
        <span className="text-sm text-pink-600 font-[Halogen]">
          Last {Math.min(activities.length, 10)} activities
        </span>
      </div>
      
      <div className="space-y-3">
        {activities.slice(0, 10).map((activity, index) => (
          <ActivityItem
            key={`${activity.date}-${index}`}
            {...activity}
            index={index}
            character={
              activity.type === 'session' 
                ? userData?.settings.selectedCompanion 
                : undefined
            }
          />
        ))}
      </div>

      {activities.length > 10 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-pink-600 mt-4"
        >
          + {activities.length - 10} more activities
        </motion.p>
      )}
    </div>
  );
} 