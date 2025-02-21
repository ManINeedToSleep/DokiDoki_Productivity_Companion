"use client";
import { useTimerStats } from '@/hooks/useTimerStats';
import { formatTime } from '@/utils/formatTime';

export function TodayProgress() {
  const { stats, loading } = useTimerStats();

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-pink-100 rounded"></div>
        <div className="h-8 bg-pink-100 rounded"></div>
        <div className="h-8 bg-pink-100 rounded"></div>
      </div>
    );
  }

  const todaysSessions = stats?.todaysSessions || 0;
  const todaysMinutes = stats?.todaysMinutes || 0;
  const currentStreak = stats?.currentStreak || 0;

  return (
    <div className="space-y-4 font-[Halogen]">
      <div className="flex justify-between items-center">
        <span className="text-pink-700">Sessions Completed</span>
        <span className="text-pink-900 text-lg">{todaysSessions}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-pink-700">Total Focus Time</span>
        <span className="text-pink-900">{formatTime(todaysMinutes * 60)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-pink-700">Current Streak</span>
        <span className="text-pink-900">{currentStreak} days</span>
      </div>
    </div>
  );
} 