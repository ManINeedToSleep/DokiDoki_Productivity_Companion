export * from './settings';
export * from './audio';
export * from './characters';
export * from './menu';
export * from './content';
export * from './loading';
export * from './messages';
export * from './characterProgress';
export * from './achievements';

export const DEFAULT_CHARACTER_STATS = {
  level: 1,
  currentLevelMinutes: 0,
  totalMinutes: 0,
  totalSessions: 0,
  backgrounds: []
} as const;

export const DEFAULT_SETTINGS = {
  selectedCompanion: 'sayori' as const,
  pomodoroLength: 25,
  shortBreakLength: 5,
  longBreakLength: 15,
  soundVolume: 0.5,
  musicVolume: 0.3,
  notifications: {
    sound: true,
    desktop: true
  }
} as const;
