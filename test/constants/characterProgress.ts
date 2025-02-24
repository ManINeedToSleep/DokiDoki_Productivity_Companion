import { CharacterId, CharacterBackground } from '@/types/character';

export const LEVEL_UP_MINUTES = 60; // Minutes needed to level up
export const MAX_LEVEL = 50; // Maximum level a character can reach

// Background unlock requirements
export const CHARACTER_BACKGROUNDS: Record<CharacterId, CharacterBackground[]> = {
  sayori: [
    { id: 'classroom', name: 'Classroom', path: '/images/backgrounds/Classroom.png', requiredMinutes: 0 },
    { id: 'residential', name: 'Residential', path: '/images/backgrounds/Residential.png', requiredMinutes: 120 },
    { id: 'house', name: 'House', path: '/images/backgrounds/House.png', requiredMinutes: 300 },
    // Add more backgrounds
  ],
  natsuki: [
    { id: 'club', name: 'Club Room', path: '/images/backgrounds/Club.png', requiredMinutes: 0 },
    { id: 'kitchen', name: 'Kitchen', path: '/images/backgrounds/Kitchen.png', requiredMinutes: 120 },
    { id: 'house', name: 'House', path: '/images/backgrounds/House.png', requiredMinutes: 300 },
    // Add more backgrounds
  ],
  yuri: [
    { id: 'library', name: 'Library', path: '/images/backgrounds/Library.png', requiredMinutes: 0 },
    { id: 'corridor', name: 'Corridor', path: '/images/backgrounds/Corridor.png', requiredMinutes: 120 },
    { id: 'house', name: 'House', path: '/images/backgrounds/House.png', requiredMinutes: 300 },
    // Add more backgrounds
  ],
  monika: [
    { id: 'club', name: 'Club Room', path: '/images/backgrounds/Club.png', requiredMinutes: 0 },
    { id: 'spaceroom', name: 'Space Room', path: '/images/backgrounds/Spaceroom.png', requiredMinutes: 120 },
    { id: 'house', name: 'House', path: '/images/backgrounds/House.png', requiredMinutes: 300 },
    // Add more backgrounds
  ]
} as const;

export function calculateLevel(totalMinutes: number) {
  const level = Math.min(Math.floor(totalMinutes / LEVEL_UP_MINUTES) + 1, MAX_LEVEL);
  const currentLevelMinutes = totalMinutes % LEVEL_UP_MINUTES;
  return { level, currentLevelMinutes };
}

export function checkBackgroundUnlocks(
  characterId: keyof typeof CHARACTER_BACKGROUNDS,
  totalMinutes: number,
  unlockedBackgrounds: Array<{ id: string; unlockedAt: Date }>
) {
  const availableBackgrounds = CHARACTER_BACKGROUNDS[characterId];
  const unlockedIds = new Set(unlockedBackgrounds.map(bg => bg.id));
  
  return availableBackgrounds
    .filter(bg => !unlockedIds.has(bg.id) && totalMinutes >= bg.requiredMinutes)
    .map(bg => ({
      id: bg.id,
      name: bg.name,
      unlockedAt: new Date()
    }));
} 