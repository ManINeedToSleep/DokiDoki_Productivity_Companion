"use client";
import { useState, useEffect, useCallback } from 'react';

export type TimerType = 'work' | 'break' | 'longBreak';

interface PomodoroConfig {
  onComplete?: (minutesCompleted: number) => void;
  onTick?: (remainingTime: number) => void;
}

export const TIMER_DURATIONS = {
  work: 25 * 60,
  break: 5 * 60,
  longBreak: 15 * 60
};

export const usePomodoro = ({ onComplete, onTick }: PomodoroConfig = {}) => {
  const [time, setTime] = useState(TIMER_DURATIONS.work);
  const [initialTime, setInitialTime] = useState(TIMER_DURATIONS.work);
  const [isActive, setIsActive] = useState(false);
  const [timerType, setTimerType] = useState<TimerType>('work');

  const getMinutesCompleted = useCallback(() => {
    return Math.floor((initialTime - time) / 60);
  }, [initialTime, time]);

  const reset = useCallback(() => {
    setTime(TIMER_DURATIONS[timerType]);
    setInitialTime(TIMER_DURATIONS[timerType]);
    setIsActive(false);
  }, [timerType]);

  const changeTimerType = useCallback((type: TimerType) => {
    setTimerType(type);
    setTime(TIMER_DURATIONS[type]);
    setInitialTime(TIMER_DURATIONS[type]);
    setIsActive(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((currentTime) => {
          if (currentTime <= 1) {
            setIsActive(false);
            if (timerType === 'work') {
              onComplete?.(getMinutesCompleted());
            }
            return 0;
          }
          onTick?.(currentTime - 1);
          return currentTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, time, timerType, onComplete, onTick, getMinutesCompleted]);

  return {
    time,
    isActive,
    timerType,
    start: () => setIsActive(true),
    pause: () => setIsActive(false),
    reset,
    changeTimerType,
    getMinutesCompleted
  };
}; 