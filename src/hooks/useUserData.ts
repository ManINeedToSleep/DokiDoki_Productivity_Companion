import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import type { UserData, UserSettings } from '@/types/user';

const defaultSettings: Omit<UserSettings, 'selectedCompanion'> = {
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
    const fetchUserData = async () => {
      if (!user) {
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (!userDoc.exists()) {
          const selectedCompanion = localStorage.getItem('selectedCompanion');
          
          if (!selectedCompanion) {
            setLoading(false);
            return;
          }

          const newUserData: UserData = {
            id: user.uid,
            email: user.email || '',
            settings: {
              ...defaultSettings,
              selectedCompanion,
            },
            stats: {
              totalSessions: 0,
              todaysSessions: 0,
              todaysMinutes: 0,
              todaysSeconds: 0,
              lastActiveDate: new Date().toISOString().split('T')[0],
              currentStreak: 0,
              longestStreak: 0,
              weeklyProgress: 0,
              weeklyGoal: 1200,
              totalMinutes: 0,
              history: {}
            },
            createdAt: new Date()
          };
          
          await setDoc(doc(db, 'users', user.uid), newUserData);
          setUserData(newUserData);
          localStorage.removeItem('selectedCompanion');
        } else {
          setUserData(userDoc.data() as UserData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    if (!user || !userData) return;

    const updatedSettings = {
      ...userData.settings,
      ...newSettings
    };

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        ...userData,
        settings: updatedSettings
      }, { merge: true });

      setUserData({
        ...userData,
        settings: updatedSettings
      });
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return { userData, loading, updateSettings };
} 