"use client";

import { useTimer } from './TimerProvider';
import { useUserData } from '@/hooks/useUserData';
import DDLCButton from '@/components/Common/Buttons/Button';

export function TimerTypeSelect() {
  const { timerType, setTimerType, isRunning } = useTimer();
  const { userData } = useUserData();

  const settings = userData?.settings || {
    pomodoroLength: 25,
    shortBreakLength: 5,
    longBreakLength: 15
  };

  return (
    <div className="flex justify-center gap-4 mb-8">
      <DDLCButton
        label={`Pomodoro (${settings.pomodoroLength}m)`}
        onClick={() => setTimerType('pomodoro')}
        disabled={isRunning}
        className={timerType !== 'pomodoro' ? 'opacity-70' : ''}
      />
      <DDLCButton
        label={`Short Break (${settings.shortBreakLength}m)`}
        onClick={() => setTimerType('shortBreak')}
        disabled={isRunning}
        className={timerType !== 'shortBreak' ? 'opacity-70' : ''}
      />
      <DDLCButton
        label={`Long Break (${settings.longBreakLength}m)`}
        onClick={() => setTimerType('longBreak')}
        disabled={isRunning}
        className={timerType !== 'longBreak' ? 'opacity-70' : ''}
      />
    </div>
  );
} 