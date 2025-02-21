"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePomodoro, TimerType, TIMER_DURATIONS } from "@/hooks/usePomodoro";
import { useTimerStats } from '@/hooks/useTimerStats';
import { useUserData } from '@/hooks/useUserData';

/**
 * Timer Context and Provider
 * 
 * Implements a Pomodoro timer with the following features:
 * - 25-minute countdown timer
 * - Start/pause functionality
 * - Reset capability
 * - Real-time minutes/seconds calculation
 * 
 * The timer uses React's useEffect for the countdown logic and
 * provides the timer state and controls through React Context.
 */

/**
 * Type definition for the Timer context value
 */
interface TimerContextType {
  time: number;
  isRunning: boolean;
  timerType: TimerType;
  sessionCount: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipTimer: () => void;
  setTimerType: (type: TimerType) => void;
}

// Create context with null as initial value
const TimerContext = createContext<TimerContextType | undefined>(undefined);

/**
 * Timer Provider Component
 * 
 * Manages the timer state and provides timer functionality to child components
 * through React Context.
 * 
 * @example
 * ```tsx
 * <TimerProvider>
 *   <TimerDisplay />
 *   <TimerControls />
 * </TimerProvider>
 * ```
 */
export function TimerProvider({ children }: { children: React.ReactNode }) {
  const { updateStats, updateCurrentSession } = useTimerStats();
  const { userData } = useUserData();
  const [sessionCount, setSessionCount] = useState(0);
  
  // Initialize session count from userData
  useEffect(() => {
    if (userData) {
      setSessionCount(userData.stats.todaysSessions || 0);
    }
  }, [userData]);

  const handleComplete = async (minutesCompleted: number) => {
    if (minutesCompleted > 0) {
      try {
        await updateStats(minutesCompleted);
        setSessionCount((prev) => prev + 1);
        updateCurrentSession(0);
      } catch (error) {
        console.error('Failed to update stats:', error);
      }
    }
  };

  const {
    time,
    isActive: isRunning,
    timerType,
    start: startTimer,
    pause,
    reset,
    changeTimerType: setTimerType,
    getMinutesCompleted
  } = usePomodoro({
    onComplete: handleComplete,
    onTick: (remainingTime) => {
      if (timerType === 'work') {
        const timeElapsed = TIMER_DURATIONS.work - remainingTime;
        updateCurrentSession(timeElapsed);
      }
    }
  });

  const pauseTimer = async () => {
    const minutesCompleted = getMinutesCompleted();
    if (timerType === 'work' && minutesCompleted > 0 && isRunning) {
      await handleComplete(minutesCompleted);
    }
    pause();
  };

  const resetTimer = async () => {
    const minutesCompleted = getMinutesCompleted();
    if (timerType === 'work' && minutesCompleted > 0 && isRunning) {
      await handleComplete(minutesCompleted);
    }
    reset();
  };

  const skipTimer = () => {
    if (timerType === 'work') return;
    reset();
    setTimerType('work');
  };

  return (
    <TimerContext.Provider value={{
      time,
      isRunning,
      timerType,
      sessionCount,
      startTimer,
      pauseTimer,
      resetTimer,
      skipTimer,
      setTimerType
    }}>
      {children}
    </TimerContext.Provider>
  );
}

/**
 * Custom hook to access the timer context
 * 
 * @throws {Error} If used outside of TimerProvider
 * @returns {TimerContextType} Timer context value
 * 
 * @example
 * ```tsx
 * const { minutes, seconds, isActive, start, pause, reset } = useTimer();
 * ```
 */
export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
} 