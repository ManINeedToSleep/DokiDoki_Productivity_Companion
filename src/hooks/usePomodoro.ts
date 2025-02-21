"use client";
import { useState, useEffect, useCallback } from 'react';

export type TimerType = 'pomodoro' | 'shortBreak' | 'longBreak';

interface PomodoroConfig {
  onComplete?: () => void;
  onTick?: (currentTime: number) => void;
}

const TIMER_DURATION = {
  pomodoro: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
};

export const usePomodoro = ({ onComplete, onTick }: PomodoroConfig = {}) => {
  const [time, setTime] = useState(TIMER_DURATION.pomodoro);
  const [isActive, setIsActive] = useState(false);
  const [timerType, setTimerType] = useState<TimerType>('pomodoro');

  const reset = useCallback(() => {
    setTime(TIMER_DURATION[timerType]);
    setIsActive(false);
  }, [timerType]);

  const changeTimerType = useCallback((type: TimerType) => {
    setTimerType(type);
    setTime(TIMER_DURATION[type]);
    setIsActive(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((currentTime) => {
          if (currentTime <= 1) {
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          const newTime = currentTime - 1;
          onTick?.(newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, time, onComplete, onTick]);

  return {
    time,
    isActive,
    timerType,
    start: () => setIsActive(true),
    pause: () => setIsActive(false),
    reset,
    changeTimerType,
  };
}; 