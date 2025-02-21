"use client";
// // import { Button } from "../Common/Button";
import DDLCButton from "@/components/Common/Buttons/Button";
import { useTimer } from "./TimerProvider";

/**
 * Timer Controls Component
 * 
 * Provides user interface controls for the timer:
 * - Start/Pause Toggle: Single button that changes based on timer state
 * - Reset Button: Returns timer to initial state (25:00)
 * 
 * Button States:
 * 1. When timer is inactive:
 *    - Shows "Start"
 *    - Clicking starts the countdown
 * 2. When timer is active:
 *    - Shows "Pause"
 *    - Clicking pauses the countdown
 * 3. Reset button:
 *    - Always available
 *    - Stops timer and resets to 25:00
 */
export const TimerControls = () => {
  const { isRunning, startTimer, pauseTimer, resetTimer, skipTimer, timerType } = useTimer();

  return (
    <div className="flex justify-center gap-4">
      <DDLCButton 
        label={isRunning ? 'Pause' : 'Start'}
        onClick={isRunning ? pauseTimer : startTimer}
      />
      <DDLCButton 
        label="Reset"
        onClick={resetTimer}
      />
      {timerType !== 'work' && (
        <DDLCButton 
          label="Skip"
          onClick={skipTimer}
        />
      )}
    </div>
  );
}; 