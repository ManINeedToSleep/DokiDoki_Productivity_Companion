import { CharacterId } from '@/types/character';

export const LOADING_CONFIG = {
  defaultCharacter: 'sayori' as CharacterId,
  messages: {
    title: "Loading your study session...",
    subtitle: "Your Doki is getting ready!"
  },
  styles: {
    background: "bg-pink-50",
    titleColor: "text-pink-700",
    subtitleColor: "text-pink-500"
  },
  animation: {
    bounce: "animate-bounce",
    duration: 2000 // ms
  }
} as const;

// Moved to a separate function for better testing and reusability
export function getRandomCharacter(exclude?: CharacterId): CharacterId {
  const characters: CharacterId[] = ['sayori', 'yuri', 'natsuki', 'monika'];
  if (exclude) {
    const filtered = characters.filter(char => char !== exclude);
    return filtered[Math.floor(Math.random() * filtered.length)];
  }
  return characters[Math.floor(Math.random() * characters.length)];
} 