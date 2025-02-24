"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { CharacterContextType, CharacterId } from '@/types/character';

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterId | null>(null);

  return (
    <CharacterContext.Provider value={{ selectedCharacter, setSelectedCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
} 