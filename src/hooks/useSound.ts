"use client";

import { useRef, useCallback } from 'react';
import { useAudio } from '@/contexts/AudioContext';

export function useSound(soundPath: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { soundVolume } = useAudio();

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(soundPath);
    }
    
    audioRef.current.volume = soundVolume;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(error => {
      console.log("Sound play prevented:", error);
    });
  }, [soundPath, soundVolume]);

  return play;
} 