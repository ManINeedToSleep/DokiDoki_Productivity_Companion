"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import BackgroundMusic from './BackgroundMusic';

const musicMap = {
  '/': '/audio/bgm/runereality.ogg',
  '/auth': '/audio/bgm/runereality.ogg',
  '/dashboard': '/audio/bgm/runereality.ogg',
  '/dashboard/chat': '/audio/bgm/runereality.ogg',
  '/dashboard/timer': "/audio/bgm/Monika'sLullaby.ogg",
  '/dashboard/settings': '/audio/bgm/runereality.ogg'
};

export default function SharedBackgroundMusic() {
  const pathname = usePathname();
  const [currentMusic, setCurrentMusic] = useState<string>('');

  useEffect(() => {
    // Find the most specific matching path
    const matchingPath = Object.keys(musicMap)
      .filter(path => pathname.startsWith(path))
      .sort((a, b) => b.length - a.length)[0];

    const newMusic = musicMap[matchingPath as keyof typeof musicMap] || musicMap['/'];
    
    if (newMusic !== currentMusic) {
      setCurrentMusic(newMusic);
    }
  }, [pathname, currentMusic]);

  if (!currentMusic) return null;

  return <BackgroundMusic src={currentMusic} />;
} 