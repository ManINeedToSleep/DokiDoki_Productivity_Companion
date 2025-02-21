"use client";
import { useTimerStats } from '@/hooks/useTimerStats';
import { motion } from 'framer-motion';

export function QuickStats() {
  const { stats, loading, error } = useTimerStats();

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-6 bg-pink-100 rounded w-3/4"></div>
        <div className="h-6 bg-pink-100 rounded w-2/3"></div>
        <div className="h-6 bg-pink-100 rounded w-4/5"></div>
        <div className="h-6 bg-pink-100 rounded w-3/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 font-[Halogen] text-center py-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-3 font-[Halogen]">
      <div className="flex justify-between items-center">
        <span className="text-pink-700">Today's Focus Time:</span>
        <span className="text-pink-900">
          {Math.floor(stats.todaysMinutes / 60)}h {stats.todaysMinutes % 60}m
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-pink-700">Current Streak:</span>
        <span className="text-pink-900">{stats.currentStreak} days</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-pink-700">Sessions Today:</span>
        <span className="text-pink-900">{stats.todaysSessions} sessions</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-pink-700">Weekly Goal Progress:</span>
        <div className="w-20 h-2 bg-pink-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: `${(stats.weeklyProgress / stats.weeklyGoal) * 100}%` 
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
} 