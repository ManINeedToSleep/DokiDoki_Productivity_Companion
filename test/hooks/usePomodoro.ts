"use client";
import { useState, useEffect, useRef } from 'react';
import { useUserData } from './useUserData';

export type TimerType = 'pomodoro' | 'shortBreak' | 'longBreak';

interface PomodoroConfig {
  onComplete?: (minutesCompleted: number) => void;
  onTick?: (remainingTime: number) => void;
}

// Default durations as fallback
const DEFAULT_DURATIONS = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60
};

export function usePomodoro({ onComplete, onTick }: PomodoroConfig = {}) {
  const { userData } = useUserData();
  const [timerType, setTimerType] = useState<TimerType>('pomodoro');

  // Get duration based on user settings or fall back to defaults
  const getTimerDuration = (type: TimerType): number => {
    if (!userData?.settings) return DEFAULT_DURATIONS[type];
    
    switch (type) {
      case 'pomodoro':
        return (userData.settings.pomodoroLength || 25) * 60;
      case 'shortBreak':
        return (userData.settings.shortBreakLength || 5) * 60;
      case 'longBreak':
        return (userData.settings.longBreakLength || 15) * 60;
    }
  };

  const [time, setTime] = useState(() => getTimerDuration(timerType));
  const [isActive, setIsActive] = useState(false);
  const [initialTime, setInitialTime] = useState(() => getTimerDuration(timerType));
  
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Timer effect
  useEffect(() => {
    // Cleanup function
    const cleanup = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };

    // Only start if active and time > 0
    if (isActive && time > 0) {
      cleanup(); // Clear any existing interval
      
      intervalRef.current = setInterval(() => {
        setTime(currentTime => {
          const newTime = currentTime - 1;
          
          if (newTime <= 0) {
            cleanup();
            setIsActive(false);
            onComplete?.(Math.floor(initialTime / 60));
            return 0;
          }
          
          onTick?.(newTime);
          return newTime;
        });
      }, 1000);
    }

    // Cleanup on unmount or when dependencies change
    return cleanup;
  }, [isActive, initialTime, onComplete, onTick]);

  // Update timer when settings change
  useEffect(() => {
    const newDuration = getTimerDuration(timerType);
    if (!isActive) {
      setTime(newDuration);
      setInitialTime(newDuration);
    }
  }, [userData?.settings, timerType, isActive]);

  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);
  
  const reset = () => {
    setIsActive(false);
    const newDuration = getTimerDuration(timerType);
    setTime(newDuration);
    setInitialTime(newDuration);
  };

  const changeTimerType = (type: TimerType) => {
    setTimerType(type);
    const newDuration = getTimerDuration(type);
    setTime(newDuration);
    setInitialTime(newDuration);
    setIsActive(false);
  };

  return {
    time,
    isActive,
    timerType,
    start,
    pause,
    reset,
    changeTimerType,
    getMinutesCompleted: () => Math.floor((initialTime - time) / 60)
  };
} 