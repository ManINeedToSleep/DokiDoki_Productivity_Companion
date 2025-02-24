"use client";
import { useUserData } from '@/hooks/useUserData';
import { motion } from 'framer-motion';
import { formatTime } from '@/utils/formatTime';
import Loading from "@/components/Common/Loading";

interface StatItemProps {
  label: string;
  value: string | number;
  icon: string;
  index: number;
}

const StatItem = ({ label, value, icon, index }: StatItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white/50 p-4 rounded-lg flex items-center gap-3"
  >
    <span className="text-2xl">{icon}</span>
    <div className="flex-1">
      <p className="text-pink-700 text-sm">{label}</p>
      <p className="text-pink-900 font-[Halogen] text-lg">{value}</p>
    </div>
  </motion.div>
);

export function QuickStats() {
  const { userData, loading } = useUserData();
  
  if (loading) {
    return <Loading message="Loading your stats..." />;
  }

  if (!userData) {
    return null;
  }

  const stats = userData.stats;
  const todaysTotalSeconds = (stats.todaysMinutes * 60) + (stats.todaysSeconds || 0);
  const weeklyProgressHours = Math.floor(stats.weeklyProgress / 60);
  const weeklyProgressMinutes = stats.weeklyProgress % 60;
  const weeklyGoalHours = Math.floor(stats.weeklyGoal / 60);

  const statItems: StatItemProps[] = [
    {
      label: "Today's Focus Time",
      value: formatTime(todaysTotalSeconds),
      icon: "⏱️",
      index: 0
    },
    {
      label: "Current Streak",
      value: `${stats.currentStreak} days`,
      icon: "🔥",
      index: 1
    },
    {
      label: "Sessions Today",
      value: `${stats.todaysSessions} sessions`,
      icon: "📚",
      index: 2
    },
    {
      label: "Weekly Progress",
      value: `${weeklyProgressHours}h ${weeklyProgressMinutes}m / ${weeklyGoalHours}h`,
      icon: "📊",
      index: 3
    },
    {
      label: "Total Study Time",
      value: formatTime(stats.totalMinutes * 60),
      icon: "⭐",
      index: 4
    },
    {
      label: "Longest Streak",
      value: `${stats.longestStreak} days`,
      icon: "🏆",
      index: 5
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {statItems.map((item) => (
        <StatItem key={item.label} {...item} />
      ))}
      
      <motion.div
        className="col-span-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="bg-white/50 p-4 rounded-lg">
          <h3 className="text-lg font-[Riffic] text-pink-700 mb-2">Weekly Goal Progress</h3>
          <div className="w-full h-2 bg-pink-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((stats.weeklyProgress / stats.weeklyGoal) * 100, 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-pink-600 mt-2">
            {Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100)}% of weekly goal completed
          </p>
        </div>
      </motion.div>
    </div>
  );
} 