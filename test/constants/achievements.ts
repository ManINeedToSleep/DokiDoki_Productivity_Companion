import { Achievement } from '@/types/user';

export const ACHIEVEMENTS = {
  FIRST_SESSION: {
    id: 'first_session',
    name: 'First Step',
    description: 'Complete your first study session',
    icon: '🌱'
  },
  STREAK_3: {
    id: 'streak_3',
    name: 'Getting Into Rhythm',
    description: 'Maintain a 3-day study streak',
    icon: '🔥'
  },
  STREAK_7: {
    id: 'streak_7',
    name: 'Weekly Warrior',
    description: 'Maintain a 7-day study streak',
    icon: '🌟'
  },
  TOTAL_HOURS_10: {
    id: 'total_hours_10',
    name: 'Dedicated Student',
    description: 'Study for a total of 10 hours',
    icon: '📚'
  },
  WEEKLY_GOAL: {
    id: 'weekly_goal',
    name: 'Goal Crusher',
    description: 'Reach your weekly study goal',
    icon: '🎯'
  },
  SESSIONS_10: {
    id: 'sessions_10',
    name: 'Focus Master',
    description: 'Complete 10 study sessions',
    icon: '⏱️'
  }
} as const;

export function checkAchievements(stats: UserStats): Achievement[] {
  const newAchievements: Achievement[] = [];
  const existingIds = new Set(stats.achievements.map(a => a.id));

  // Check each achievement condition
  if (!existingIds.has(ACHIEVEMENTS.FIRST_SESSION.id) && stats.totalSessions > 0) {
    newAchievements.push({
      ...ACHIEVEMENTS.FIRST_SESSION,
      unlockedAt: new Date()
    });
  }

  if (!existingIds.has(ACHIEVEMENTS.STREAK_3.id) && stats.currentStreak >= 3) {
    newAchievements.push({
      ...ACHIEVEMENTS.STREAK_3,
      unlockedAt: new Date()
    });
  }

  // Add more achievement checks here...

  return newAchievements;
} 