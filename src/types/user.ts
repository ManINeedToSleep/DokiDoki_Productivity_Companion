export interface UserStats {
  totalSessions: number;
  todaysSessions: number;
  todaysMinutes: number;
  todaysSeconds: number;
  lastActiveDate: string;  // ISO string format
  currentStreak: number;
  longestStreak: number;
  weeklyProgress: number;
  weeklyGoal: number;
  totalMinutes: number;
  history: {
    [date: string]: {
      sessions: number;
      minutes: number;
      seconds: number;
    }
  };
}

export interface UserSettings {
  selectedCompanion: string;
  pomodoroLength: number;
  shortBreakLength: number;
  longBreakLength: number;
  soundVolume: number;
  musicVolume: number;
  notifications: {
    sound: boolean;
    desktop: boolean;
  };
}

export interface UserData {
  id: string;
  email: string;
  settings: UserSettings;
  stats: UserStats;
  createdAt: Date;
} 