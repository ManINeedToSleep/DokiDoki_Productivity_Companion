// import { Button } from "../Common/Button";
// import { useTimer } from "./TimerProvider";
// import { cn } from "@/utils/cn";

// export const TimerTypeSelect = () => {
//   const { timerType, changeTimerType, isActive } = useTimer();

//   return (
//     <div className="flex justify-center gap-4 mb-8">
//       <Button
//         onClick={() => changeTimerType('pomodoro')}
//         className={cn(timerType !== 'pomodoro' && 'opacity-50')}
//         disabled={isActive}
//       >
//         Pomodoro
//       </Button>
//       <Button
//         onClick={() => changeTimerType('shortBreak')}
//         className={cn(timerType !== 'shortBreak' && 'opacity-50')}
//         disabled={isActive}
//       >
//         Short Break
//       </Button>
//       <Button
//         onClick={() => changeTimerType('longBreak')}
//         className={cn(timerType !== 'longBreak' && 'opacity-50')}
//         disabled={isActive}
//       >
//         Long Break
//       </Button>
//     </div>
//   );
// }; 