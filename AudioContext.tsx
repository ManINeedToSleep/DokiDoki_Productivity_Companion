"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useUserData } from '@/hooks/useUserData';

interface AudioContextType {
  soundVolume: number;
  musicVolume: number;
  updateSoundVolume: (volume: number) => void;
  updateMusicVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType>({
  soundVolume: 0.5,
  musicVolume: 0.3,
  updateSoundVolume: () => {},
  updateMusicVolume: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const { userData, updateSettings } = useUserData();
  const [soundVolume, setSoundVolume] = useState(userData?.settings?.soundVolume || 0.5);
  const [musicVolume, setMusicVolume] = useState(userData?.settings?.musicVolume || 0.3);

  // Update local state when user settings change
  useEffect(() => {
    if (userData?.settings) {
      setSoundVolume(userData.settings.soundVolume);
      setMusicVolume(userData.settings.musicVolume);
    }
  }, [userData?.settings]);

  const handleSoundVolumeUpdate = async (volume: number) => {
    setSoundVolume(volume);
    if (userData?.settings) {
      await updateSettings({
        ...userData.settings,
        soundVolume: volume
      });
    }
  };

  const handleMusicVolumeUpdate = async (volume: number) => {
    setMusicVolume(volume);
    if (userData?.settings) {
      await updateSettings({
        ...userData.settings,
        musicVolume: volume
      });
    }
  };

  return (
    <AudioContext.Provider
      value={{
        soundVolume,
        musicVolume,
        updateSoundVolume: handleSoundVolumeUpdate,
        updateMusicVolume: handleMusicVolumeUpdate,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext); 