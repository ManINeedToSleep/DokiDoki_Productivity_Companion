"use client";

import { useUserData } from './useUserData';
import { useNotification } from '@/contexts/NotificationContext';
import { useCharacterProgress } from './useCharacterProgress';
import { ACHIEVEMENTS } from '@/constants/achievements';
import { CharacterId } from '@/types/character';
import { Goal, Achievement, SessionRecord, UserStats } from '@/types/user';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useProgress() {
  const { userData, updateUserData, refreshUserData } = useUserData();
  const { showNotification } = useNotification();
  const { updateCharacterProgress } = useCharacterProgress();

  const addActivity = async (activity: {
    type: 'session' | 'achievement' | 'goal';
    description: string;
  }) => {
    if (!userData) return;
    
    const currentActivity = userData.stats.recentActivity || [];
    
    await updateUserData({
      stats: {
        ...userData.stats,
        recentActivity: [
          { ...activity, date: new Date().toISOString() },
          ...currentActivity.slice(0, 9)
        ]
      }
    });
  };

  const addSessionRecord = async (record: Omit<SessionRecord, 'id'>) => {
    if (!userData) return;
    const today = new Date().toISOString().split('T')[0];
    const id = Math.random().toString(36).substr(2, 9);

    const newRecord: SessionRecord = {
      ...record,
      id,
      completedAt: new Date()
    };

    const todayHistory = userData.stats.history[today] || {
      sessions: 0,
      minutes: 0,
      seconds: 0,
      records: []
    };

    await updateUserData({
      stats: {
        ...userData.stats,
        history: {
          ...userData.stats.history,
          [today]: {
            ...todayHistory,
            records: [...todayHistory.records, newRecord]
          }
        }
      }
    });

    addActivity({
      type: 'session',
      description: `Completed a ${record.duration} minute ${record.type} session`
    });
  };

  const addGoal = async (newGoal: Omit<Goal, "id" | "createdAt" | "completed">) => {
    if (!userData) return;

    // Check if user already has 3 active goals
    const incompleteGoals = (userData.stats.goals || []).filter(goal => !goal.completed);
    
    if (incompleteGoals.length >= 3) {
      showNotification({
        message: "Please complete existing goals first",
        type: 'system',
        icon: '⚠️'
      });
      return;
    }

    const goalToAdd = {
      ...newGoal,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completed: false
    };

    try {
      // Get current user doc for fresh data
      const userDoc = await getDoc(doc(db, 'users', userData.id));
      if (!userDoc.exists()) {
        throw new Error("User document not found");
      }
      
      const currentData = userDoc.data();
      const currentGoals = [...(currentData.stats?.goals || [])];
      const updatedGoals = [...currentGoals, goalToAdd];
      
      console.log('Current goals from DB:', currentGoals.length);
      console.log('Updated goals:', updatedGoals.length);

      // Update ONLY the goals array in Firestore
      await updateDoc(doc(db, 'users', userData.id), {
        "stats.goals": updatedGoals
      });
      
      // Now refresh to get latest data
      await refreshUserData();
      
      // Add activity
      addActivity({
        type: 'goal',
        description: `Set a new goal: ${newGoal.title}`
      });

      showNotification({
        message: `New goal created: ${newGoal.title}`,
        type: 'system',
        icon: '🎯'
      });
    } catch (error) {
      console.error('Error adding goal:', error);
      showNotification({
        message: 'Failed to add goal. Please try again.',
        type: 'system',
        icon: '❌'
      });
    }
  };

  const updateGoalProgress = async (goalId: string, minutesCompleted: number) => {
    if (!userData) return;

    const goals = userData.stats.goals.map(goal => {
      if (goal.id !== goalId) return goal;

      const newMinutes = goal.currentMinutes + minutesCompleted;
      const completed = newMinutes >= goal.targetMinutes;

      if (completed && !goal.completed) {
        showNotification({
          message: `Goal completed: ${goal.title}`,
          type: 'achievement',
          icon: '🎯'
        });
        addActivity({
          type: 'goal',
          description: `Completed goal: ${goal.title}`
        });
      }

      return {
        ...goal,
        currentMinutes: newMinutes,
        completed
      };
    });

    await updateUserData({
      stats: {
        ...userData.stats,
        goals
      }
    });
  };

  const handleSessionComplete = async (
    minutes: number,
    type: 'pomodoro' | 'shortBreak' | 'longBreak',
    characterId: CharacterId
  ) => {
    if (!userData) return;

    // Update session stats
    await addSessionRecord({
      duration: minutes,
      type,
      completedAt: new Date()
    });

    // Update character progress
    if (type === 'pomodoro') {
      await updateCharacterProgress(characterId, minutes);
      
      // Update goals
      userData.stats.goals
        .filter(goal => !goal.completed)
        .forEach(goal => updateGoalProgress(goal.id, minutes));
    }

    // Check achievements
    const newAchievements = checkNewAchievements(userData.stats);
    if (newAchievements.length > 0) {
      await updateUserData({
        stats: {
          ...userData.stats,
          achievements: [...userData.stats.achievements, ...newAchievements]
        }
      });

      newAchievements.forEach(achievement => {
        showNotification({
          message: `Achievement unlocked: ${achievement.name}`,
          type: 'achievement',
          icon: achievement.icon
        });
        addActivity({
          type: 'achievement',
          description: `Unlocked achievement: ${achievement.name}`
        });
      });
    }
  };

  return {
    addGoal,
    handleSessionComplete,
    addActivity
  };
}

function checkNewAchievements(stats: UserStats): Achievement[] {
  const newAchievements: Achievement[] = [];
  const existingIds = new Set(stats.achievements.map(a => a.id));

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

  // Add other achievement checks here

  return newAchievements;
} 