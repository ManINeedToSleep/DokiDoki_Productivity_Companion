"use client";
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

interface TimerStats {
  totalSessions: number;
  totalMinutes: number;
  currentStreak: number;
  lastSessionDate: string | null;
  todaysSessions: number;
  todaysMinutes: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

const DEFAULT_STATS: TimerStats = {
  totalSessions: 0,
  totalMinutes: 0,
  currentStreak: 0,
  lastSessionDate: null,
  todaysSessions: 0,
  todaysMinutes: 0,
  weeklyGoal: 10, // Default goal: 10 sessions per week
  weeklyProgress: 0,
};

export function useTimerStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<TimerStats>(DEFAULT_STATS);
  const [currentSessionMinutes, setCurrentSessionMinutes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadStats() {
      if (!user) return;
      
      try {
        setError(null);
        const statsRef = doc(db, 'users', user.uid, 'stats', 'timer');
        const statsDoc = await getDoc(statsRef);
        
        if (!mounted) return;

        if (statsDoc.exists()) {
          const data = statsDoc.data() as TimerStats;
          // Reset daily stats if it's a new day
          if (data.lastSessionDate !== new Date().toDateString()) {
            try {
              await updateDoc(statsRef, {
                todaysSessions: 0,
                todaysMinutes: 0,
                lastSessionDate: new Date().toDateString()
              });
              if (mounted) {
                setStats({ ...data, todaysSessions: 0, todaysMinutes: 0 });
              }
            } catch (err) {
              console.error('Error resetting daily stats:', err);
              if (mounted) {
                setStats(data);
              }
            }
          } else {
            if (mounted) {
              setStats(data);
            }
          }
        } else {
          // Initialize stats document
          const initialStats = {
            ...DEFAULT_STATS,
            lastSessionDate: new Date().toDateString()
          };
          await setDoc(statsRef, initialStats);
          if (mounted) {
            setStats(initialStats);
          }
        }
      } catch (err) {
        console.error('Error loading stats:', err);
        if (mounted) {
          setError('Failed to load stats');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadStats();
    return () => { mounted = false; };
  }, [user]);

  const updateCurrentSession = (minutes: number) => {
    setCurrentSessionMinutes(minutes);
  };

  // Calculate real-time stats including current session
  const realTimeStats = {
    ...stats,
    todaysMinutes: stats.todaysMinutes + currentSessionMinutes,
  };

  const updateStats = async (sessionMinutes: number) => {
    if (!user) return;
    setError(null);

    try {
      const statsRef = doc(db, 'users', user.uid, 'stats', 'timer');
      const today = new Date().toDateString();
      
      const newStats = {
        totalSessions: stats.totalSessions + 1,
        totalMinutes: stats.totalMinutes + sessionMinutes,
        todaysSessions: stats.todaysSessions + 1,
        todaysMinutes: stats.todaysMinutes + sessionMinutes,
        lastSessionDate: today,
        weeklyProgress: stats.weeklyProgress + 1,
        currentStreak: stats.lastSessionDate === today ? 
          stats.currentStreak : 
          stats.currentStreak + 1
      };

      await updateDoc(statsRef, newStats);
      setStats(prev => ({ ...prev, ...newStats }));
      setCurrentSessionMinutes(0); // Reset current session
    } catch (err) {
      console.error('Error updating stats:', err);
      setError('Failed to update stats');
      throw err;
    }
  };

  return {
    stats: realTimeStats, // Return real-time stats instead of base stats
    loading,
    error,
    updateStats,
    updateCurrentSession
  };
} 