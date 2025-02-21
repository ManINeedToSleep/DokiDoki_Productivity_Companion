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
  stats: {
    totalSessions: number;
    totalMinutes: number;
    lastSession: Date;
  };
} 