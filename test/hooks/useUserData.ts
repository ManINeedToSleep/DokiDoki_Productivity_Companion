"use client";

import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import type { UserData, UserSettings } from '@/types/user';
import { initializeUserData } from '@/utils/initializeUserData';
import { registerFirestoreListener } from '@/utils/firestore-helpers';

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

let unsubscribeFirestore: (() => void) | null = null;

export function useUserData() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Cleanup previous listener if exists
    if (unsubscribeFirestore) {
      unsubscribeFirestore();
      unsubscribeFirestore = null;
    }

    if (!user) {
      setUserData(null);
      setLoading(false);
      return;
    }

    // Set up real-time listener to user document
    try {
      unsubscribeFirestore = onSnapshot(
        doc(db, 'users', user.uid),
        async (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserData);
          } else {
            // Initialize user data if it doesn't exist
            console.log('Initializing new user data');
            const newUserData = initializeUserData(user.uid, user.email!);
            await setDoc(doc(db, 'users', user.uid), newUserData);
            setUserData(newUserData);
          }
          setLoading(false);
        },
        (error) => {
          // Only log error if not permission-related (which happens on logout)
          if (error.code !== 'permission-denied') {
            console.error('Error fetching user data:', error);
          }
          setLoading(false);
        }
      );

      // Register for cleanup
      if (unsubscribeFirestore) {
        registerFirestoreListener(unsubscribeFirestore);
      }
    } catch (error) {
      console.error('Error setting up user data listener:', error);
      setLoading(false);
    }

    // Cleanup on unmount or user change
    return () => {
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
        unsubscribeFirestore = null;
      }
    };
  }, [user]);

  const refreshUserData = useCallback(async () => {
    if (!user) return;
    
    // Force a refresh by getting the latest document
    const docRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setUserData(doc.data() as UserData);
      }
    });
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

  const updateUserData = async (newData: Partial<UserData>) => {
    if (!user?.uid) return;
    
    try {
      console.log('Updating user data:', newData); // Debug log
      console.log('Previous goals:', userData?.stats?.goals); // Debug log
      
      await updateDoc(doc(db, 'users', user.uid), newData);
      setUserData(prev => {
        const updated = prev ? { ...prev, ...newData } : null;
        console.log('Updated userData:', updated); // Debug log
        return updated;
      });
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  // Debug logging
  useEffect(() => {
    console.log("UserData hook state:", {
      isLoading: loading,
      hasUser: !!user,
      hasUserData: !!userData,
      userData: userData ? {
        id: userData.id,
        email: userData.email,
        hasSettings: !!userData.settings,
        hasStats: !!userData.stats
      } : null
    });
  }, [loading, user, userData]);

  return {
    userData,
    loading,
    updateSettings,
    updateUserData,
    refreshUserData
  };
} 