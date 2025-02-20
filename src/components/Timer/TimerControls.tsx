// "use client";
// // import { Button } from "../Common/Button";
// import { useTimer } from "./TimerProvider";

// /**
//  * Timer Controls Component
//  * 
//  * Provides user interface controls for the timer:
//  * - Start/Pause Toggle: Single button that changes based on timer state
//  * - Reset Button: Returns timer to initial state (25:00)
//  * 
//  * Button States:
//  * 1. When timer is inactive:
//  *    - Shows "Start"
//  *    - Clicking starts the countdown
//  * 2. When timer is active:
//  *    - Shows "Pause"
//  *    - Clicking pauses the countdown
//  * 3. Reset button:
//  *    - Always available
//  *    - Stops timer and resets to 25:00
//  */
// export const TimerControls = () => {
//   const { isActive, start, pause, reset } = useTimer();

//   return (
//     <div className="flex justify-center gap-4">
//       <Button onClick={isActive ? pause : start}>
//         {isActive ? 'Pause' : 'Start'}
//       </Button>
//       <Button onClick={reset} className="bg-opacity-50">
//         Reset
//       </Button>
//     </div>
//   );
// }; 