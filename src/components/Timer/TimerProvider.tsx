"use client";
import { createContext, useContext, useState, useEffect } from "react";
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
  timerType: 'pomodoro' | 'shortBreak' | 'longBreak';
  sessionsCompleted: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  setTimerType: (type: 'pomodoro' | 'shortBreak' | 'longBreak') => void;
}

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
export function TimerProvider({ children }: { children: React.ReactNode }) {
  const { updateStats } = useTimerStats();
  const { userData } = useUserData();
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // Update timer when settings change
  useEffect(() => {
    if (userData?.settings) {
      switch (timerType) {
        case 'pomodoro':
          setTime(userData.settings.pomodoroLength * 60);
          break;
        case 'shortBreak':
          setTime(userData.settings.shortBreakLength * 60);
          break;
        case 'longBreak':
          setTime(userData.settings.longBreakLength * 60);
          break;
      }
    }
  }, [userData?.settings, timerType]);

  // Timer countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            if (timerType === 'pomodoro') {
              setSessionsCompleted(prev => prev + 1);
              updateStats(userData?.settings?.pomodoroLength || 25);
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time, timerType, userData?.settings?.pomodoroLength, updateStats]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    if (userData?.settings) {
      switch (timerType) {
        case 'pomodoro':
          setTime(userData.settings.pomodoroLength * 60);
          break;
        case 'shortBreak':
          setTime(userData.settings.shortBreakLength * 60);
          break;
        case 'longBreak':
          setTime(userData.settings.longBreakLength * 60);
          break;
      }
    }
  };

  return (
    <TimerContext.Provider
      value={{
        time,
        isRunning,
        timerType,
        sessionsCompleted,
        startTimer,
        pauseTimer,
        resetTimer,
        setTimerType
      }}
    >
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
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
} 