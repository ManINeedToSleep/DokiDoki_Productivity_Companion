"use client";

import { createContext, useContext, useState } from 'react';

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
  const [soundVolume, setSoundVolume] = useState(0.5);
  const [musicVolume, setMusicVolume] = useState(0.3);

  return (
    <AudioContext.Provider
      value={{
        soundVolume,
        musicVolume,
        updateSoundVolume: setSoundVolume,
        updateMusicVolume: setMusicVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext); 