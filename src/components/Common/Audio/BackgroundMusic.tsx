"use client";

import { useEffect, useRef } from 'react';
import { useAudio } from '@/contexts/AudioContext';

interface BackgroundMusicProps {
  src: string;
  autoPlay?: boolean;
}

export default function BackgroundMusic({ src, autoPlay = true }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { musicVolume } = useAudio();

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
    }

    audioRef.current.src = src;
    audioRef.current.volume = musicVolume;

    const playAudio = () => {
      if (audioRef.current && autoPlay) {
        audioRef.current.play().catch(error => {
          console.log("Autoplay prevented:", error);
        });
      }
    };

    // Try to play immediately
    playAudio();

    // Also try to play on first user interaction
    const handleInteraction = () => {
      playAudio();
      document.removeEventListener('click', handleInteraction);
    };
    document.addEventListener('click', handleInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      document.removeEventListener('click', handleInteraction);
    };
  }, [src, autoPlay, musicVolume]);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  return null;
} 