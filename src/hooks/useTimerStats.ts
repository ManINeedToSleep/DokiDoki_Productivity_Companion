"use client";
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useUserData } from './useUserData';
import type { UserStats } from '@/types/user';

const DEFAULT_WEEKLY_GOAL = 1200; // 20 hours per week

interface FirebaseError {
  code: string;
  message: string;
}

export function useTimerStats() {
  const { userData, loading } = useUserData();
  const [currentSessionMinutes, setCurrentSessionMinutes] = useState(0);
  const [currentSessionSeconds, setCurrentSessionSeconds] = useState(0);

  // Calculate real-time stats including current session
  const realTimeStats = userData?.stats ? {
    ...userData.stats,
    todaysSessions: (userData.stats.todaysSessions || 0),
    todaysMinutes: (userData.stats.todaysMinutes || 0) + currentSessionMinutes,
    todaysSeconds: currentSessionSeconds,
    weeklyProgress: calculateWeeklyProgress(userData.stats.history || {}) + currentSessionMinutes,
  } : null;

  const updateCurrentSession = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    setCurrentSessionMinutes(minutes);
    setCurrentSessionSeconds(seconds);
  };

  const updateStats = async (minutesCompleted: number) => {
    // Add early return if no user data (which means no auth)
    if (!userData?.id) {
      console.log('No authenticated user found');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    
    // Update history with current session
    const history = userData.stats?.history || {};
    const todaysSessions = (history[today]?.sessions || 0) + 1;
    const todaysMinutes = (history[today]?.minutes || 0) + minutesCompleted;
    
    history[today] = {
      sessions: todaysSessions,
      minutes: todaysMinutes,
      seconds: currentSessionSeconds
    };

    const newStats: UserStats = {
      ...userData.stats,
      totalSessions: (userData.stats?.totalSessions || 0) + 1,
      todaysSessions,
      todaysMinutes,
      todaysSeconds: currentSessionSeconds,
      lastActiveDate: today,
      currentStreak: userData.stats?.currentStreak || 0,
      longestStreak: Math.max(userData.stats?.currentStreak || 0, userData.stats?.longestStreak || 0),
      weeklyProgress: calculateWeeklyProgress(history),
      weeklyGoal: userData.stats?.weeklyGoal || DEFAULT_WEEKLY_GOAL,
      totalMinutes: (userData.stats?.totalMinutes || 0) + minutesCompleted,
      history
    };

    try {
      const userRef = doc(db, 'users', userData.id);
      await updateDoc(userRef, {
        'stats': newStats
      });
    } catch (err) {
      // More specific error handling
      if ((err as FirebaseError)?.code === 'permission-denied') {
        console.log('Session expired, please sign in again');
        return;
      }
      console.error('Failed to update stats:', err);
    } finally {
      setCurrentSessionMinutes(0);
      setCurrentSessionSeconds(0);
    }
  };

  // Return default stats if no userData
  return {
    stats: userData ? (realTimeStats || {
      totalSessions: 0,
      todaysSessions: 0,
      todaysMinutes: 0,
      todaysSeconds: 0,
      currentStreak: 0,
      weeklyProgress: 0,
      weeklyGoal: DEFAULT_WEEKLY_GOAL,
    }) : null,
    updateStats,
    updateCurrentSession,
    loading
  };
}

function calculateWeeklyProgress(history: { [date: string]: { minutes: number } }) {
  const today = new Date();
  let weeklyMinutes = 0;
  
  // Get last 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    weeklyMinutes += history[dateStr]?.minutes || 0;
  }
  
  return weeklyMinutes;
} 