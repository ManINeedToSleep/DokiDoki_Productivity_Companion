"use client";
import { useTimerStats } from '@/hooks/useTimerStats';

export function TodayProgress() {
  const { stats, loading, error } = useTimerStats();

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-pink-100 rounded"></div>
        <div className="h-8 bg-pink-100 rounded"></div>
        <div className="h-8 bg-pink-100 rounded"></div>
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
    <div className="space-y-4 font-[Halogen]">
      <div className="flex justify-between items-center">
        <span className="text-pink-700">Sessions Completed</span>
        <span className="text-pink-900 text-lg">{stats.todaysSessions}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-pink-700">Total Focus Time</span>
        <span className="text-pink-900">{Math.floor(stats.todaysMinutes / 60)}h {stats.todaysMinutes % 60}m</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-pink-700">Current Streak</span>
        <span className="text-pink-900">{stats.currentStreak} days</span>
      </div>
    </div>
  );
} 