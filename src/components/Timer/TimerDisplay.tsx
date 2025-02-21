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

export const TimerDisplay = () => {
  const { minutes, seconds } = useTimer();

  return (
    <motion.div 
      className="text-8xl font-[Halogen] text-center mb-8 text-pink-700"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </motion.div>
  );
}; 