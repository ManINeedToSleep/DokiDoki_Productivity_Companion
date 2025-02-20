"use client";
import { useTimer } from "./TimerProvider";

/**
 * Timer Display Component
 * 
 * Displays the current timer state in MM:SS format.
 * Uses the timer context to access current minutes and seconds.
 * 
 * Format:
 * - Minutes: Always 2 digits (00-25)
 * - Seconds: Always 2 digits (00-59)
 * - Example: "25:00", "04:30", "00:05"
 */
export const TimerDisplay = () => {
  const { minutes, seconds } = useTimer();

  return (
    <div className="text-6xl font-mono text-center mb-8">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}; 