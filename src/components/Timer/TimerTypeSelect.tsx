"use client";
import DDLCButton from "@/components/Common/Buttons/Button";
import { useTimer } from "./TimerProvider";
import { cn } from "@/utils/cn";

export const TimerTypeSelect = () => {
  const { timerType, changeTimerType, isActive } = useTimer();

  return (
    <div className="flex justify-center gap-4 mb-8">
      <DDLCButton
        label="Pomodoro"
        onClick={() => changeTimerType('pomodoro')}
        className={cn(timerType !== 'pomodoro' && 'opacity-50')}
        disabled={isActive}
      />
      <DDLCButton
        label="Short Break"
        onClick={() => changeTimerType('shortBreak')}
        className={cn(timerType !== 'shortBreak' && 'opacity-50')}
        disabled={isActive}
      />
      <DDLCButton
        label="Long Break"
        onClick={() => changeTimerType('longBreak')}
        className={cn(timerType !== 'longBreak' && 'opacity-50')}
        disabled={isActive}
      />
    </div>
  );
}; 