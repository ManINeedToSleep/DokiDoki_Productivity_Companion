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
  pomodoroSettings: {
    workDuration: number;  // in minutes
    breakDuration: number;
    longBreakDuration: number;
    sessionsBeforeLongBreak: number;
  };
  notifications: {
    sound: boolean;
    desktop: boolean;
  };
  theme: {
    background: string;
    color: string;
  };
}

export interface UserData {
  id: string;
  email: string;
  settings: UserSettings;
  stats: UserStats;
  createdAt: Date;
} 