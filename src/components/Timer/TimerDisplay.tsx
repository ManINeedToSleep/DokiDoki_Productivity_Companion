"use client";
import { useTimer } from "./TimerProvider";
import { motion } from "framer-motion";

// /**
//  * Timer Display Component
//  * 
//  * Displays the current timer state in MM:SS format.
//  * Uses the timer context to access current minutes and seconds.
//  * 
//  * Format:
//  * - Minutes: Always 2 digits (00-25)
//  * - Seconds: Always 2 digits (00-59)
//  * - Example: "25:00", "04:30", "00:05"
//  */
// export const TimerDisplay = () => {
//   const { minutes, seconds } = useTimer();

//   return (
//     <div className="text-6xl font-mono text-center mb-8">
//       {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
//     </div>
//   );
// }; 

export function TimerDisplay() {
  const { time, timerType, sessionCount } = useTimer();

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const getTimerLabel = () => {
    switch (timerType) {
      case 'work':
        return 'Pomodoro';
      case 'break':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
    }
  };

  return (
    <div className="text-center mb-8">
      <motion.div
        className="text-6xl font-[Riffic] text-pink-700 mb-2"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
      </motion.div>
      <div className="text-xl font-[Halogen] text-pink-600">
        {getTimerLabel()}
      </div>
      <div className="text-sm font-[Halogen] text-pink-500 mt-2">
        Session {sessionCount + 1}
      </div>
    </div>
  );
} 