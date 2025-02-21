"use client";
import DDLCButton from "@/components/Common/Buttons/Button";
import { useTimer } from "./TimerProvider";
import { cn } from "@/utils/cn";

export const TimerTypeSelect = () => {
  const { timerType, setTimerType, isRunning } = useTimer();

  return (
    <div className="flex justify-center gap-4 mb-8">
      <DDLCButton
        label="Pomodoro"
        onClick={() => setTimerType('work')}
        className={cn(timerType !== 'work' && 'opacity-50')}
        disabled={isRunning}
      />
      <DDLCButton
        label="Short Break"
        onClick={() => setTimerType('break')}
        className={cn(timerType !== 'break' && 'opacity-50')}
        disabled={isRunning}
      />
      <DDLCButton
        label="Long Break"
        onClick={() => setTimerType('longBreak')}
        className={cn(timerType !== 'longBreak' && 'opacity-50')}
        disabled={isRunning}
      />
    </div>
  );
}; 