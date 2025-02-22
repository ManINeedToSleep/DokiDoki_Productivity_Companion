import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import type { UserData, UserSettings } from '@/types/user';

const defaultSettings: Omit<UserSettings, 'selectedCompanion'> = {
  pomodoroLength: 25,
  shortBreakLength: 5,
  longBreakLength: 15,
  soundVolume: 0.5,
  musicVolume: 0.3,
  notifications: {
    sound: true,
    desktop: true
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

  const updateSettings = async (newSettings: UserSettings) => {
    if (!user?.uid) return;
    
    try {
      // Update the document with the entire settings object
      await updateDoc(doc(db, 'users', user.uid), {
        settings: {
          selectedCompanion: newSettings.selectedCompanion,
          pomodoroLength: newSettings.pomodoroLength,
          shortBreakLength: newSettings.shortBreakLength,
          longBreakLength: newSettings.longBreakLength,
          soundVolume: newSettings.soundVolume,
          musicVolume: newSettings.musicVolume,
          notifications: {
            sound: newSettings.notifications.sound,
            desktop: newSettings.notifications.desktop
          }
        },
        updatedAt: serverTimestamp()
      });
      
      // Update local state
      setUserData(prev => prev ? {
        ...prev,
        settings: newSettings
      } : null);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return { userData, loading, updateSettings };
} 