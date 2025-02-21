"use client";
import { useTimerStats } from '@/hooks/useTimerStats';
import { motion } from 'framer-motion';
import { formatTime } from '@/utils/formatTime';
import Loading from "@/components/Common/Loading";

export function QuickStats() {
  const { stats, loading } = useTimerStats();
  
  if (loading) {
    return <Loading message="Loading your stats..." />;
  }

  const todaysMinutes = stats?.todaysMinutes || 0;
  const currentStreak = stats?.currentStreak || 0;
  const todaysSessions = stats?.todaysSessions || 0;
  const weeklyProgress = stats?.weeklyProgress || 0;
  const weeklyGoal = stats?.weeklyGoal || 1200; // 20 hours default

  return (
    <div className="space-y-3 font-[Halogen]">
      <div className="flex justify-between items-center">
        <span className="text-pink-700">Today&apos;s Focus Time:</span>
        <span className="text-pink-900">
          {formatTime((todaysMinutes * 60) + (stats?.todaysSeconds || 0))}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-pink-700">Current Streak:</span>
        <span className="text-pink-900">{currentStreak} days</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-pink-700">Sessions Today:</span>
        <span className="text-pink-900">{todaysSessions} sessions</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-pink-700">Weekly Goal Progress:</span>
        <div className="w-20 h-2 bg-pink-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: `${Math.min((weeklyProgress / weeklyGoal) * 100, 100)}%` 
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
} 