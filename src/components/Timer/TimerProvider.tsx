"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePomodoro, TimerType } from "@/hooks/usePomodoro";
import { useTimerStats } from '@/hooks/useTimerStats';

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
type TimerContextType = {
  minutes: number;      // Current minutes remaining (0-25)
  seconds: number;      // Current seconds remaining (0-59)
  isActive: boolean;    // Timer running state
  timerType: TimerType;  // Current timer type
  start: () => void;    // Starts or resumes the timer
  pause: () => void;    // Pauses the timer
  reset: () => void;    // Resets timer to 25:00
  changeTimerType: (type: TimerType) => void;
};

// Create context with null as initial value
const TimerContext = createContext<TimerContextType | null>(null);

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
export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const { updateStats, updateCurrentSession } = useTimerStats();
  const [accumulatedMinutes, setAccumulatedMinutes] = useState(0);
  
  const {
    time,
    isActive,
    start,
    pause,
    reset,
    timerType,
    changeTimerType,
  } = usePomodoro({
    onComplete: async () => {
      if (timerType === 'pomodoro') {
        const totalMinutes = 25 - Math.floor(time / 60);
        await updateStats(totalMinutes);
        updateCurrentSession(0);
      }
      console.log('Timer completed!');
    },
    onTick: (currentTime) => {
      if (timerType === 'pomodoro' && isActive) {
        // Calculate elapsed minutes in current session
        const totalMinutes = 25 - Math.floor(currentTime / 60);
        updateCurrentSession(totalMinutes);
      }
    }
  });

  // Reset current session when timer type changes or resets
  useEffect(() => {
    updateCurrentSession(0);
  }, [timerType, updateCurrentSession]);

  const handleReset = () => {
    updateCurrentSession(0);
    reset();
  };

  const handlePause = () => {
    pause();
    // Don't reset current session on pause to keep the stats showing
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <TimerContext.Provider 
      value={{ 
        minutes, 
        seconds, 
        isActive, 
        timerType,
        start, 
        pause: handlePause,
        reset: handleReset,
        changeTimerType 
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

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
export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
}; 