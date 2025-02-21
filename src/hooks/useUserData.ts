import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import type { UserData, UserSettings } from '@/types/user';

const defaultSettings: UserSettings = {
  selectedCompanion: localStorage.getItem('selectedCompanion') || 'sayori',
  pomodoroSettings: {
    workDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4
  },
  notifications: {
    sound: true,
    desktop: true
  },
  theme: {
    background: 'default',
    color: 'pink'
  }
};

export function useUserData() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      if (!user) {
        setLoading(false);
        return;
      }

      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
      } else {
        // Create new user data with default settings
        const newUserData: UserData = {
          id: user.uid,
          email: user.email || '',
          settings: defaultSettings,
          stats: {
            totalSessions: 0,
            totalMinutes: 0,
            lastSession: new Date()
          }
        };
        await setDoc(userRef, newUserData);
        setUserData(newUserData);
      }
      setLoading(false);
    }

    loadUserData();
  }, [user]);

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    if (!user || !userData) return;

    const updatedSettings = {
      ...userData.settings,
      ...newSettings
    };

    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      ...userData,
      settings: updatedSettings
    }, { merge: true });

    setUserData({
      ...userData,
      settings: updatedSettings
    });
  };

  return { userData, loading, updateSettings };
} 