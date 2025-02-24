"use client";

import { motion } from "framer-motion";
import { CHARACTERS } from '@/constants';
import Image from 'next/image';
import { CharacterId, UserCharacterStats, Character } from '@/types';

interface CharacterSelectorProps {
  selectedCharacter: CharacterId;
  onSelect: (character: CharacterId) => void;
  characterStats: UserCharacterStats;
}

export function CharacterSelector({ selectedCharacter, onSelect, characterStats }: CharacterSelectorProps) {
  return (
    <div className="flex gap-2 mb-4">
      {(Object.entries(CHARACTERS) as Array<[CharacterId, Character]>).map(([id, char]) => (
        <motion.button
          key={id}
          onClick={() => onSelect(id)}
          className={`relative rounded-lg p-1 transition-all ${
            selectedCharacter === id 
              ? 'bg-pink-200 scale-105' 
              : 'bg-white/50 hover:bg-pink-100'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-12 h-12 relative">
            <Image
              src={char.chibiPath}
              alt={char.name}
              fill
              sizes="(max-width: 768px) 30px, 48px"
              className="object-contain"
            />
          </div>
          <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {characterStats[id]?.level || 1}
          </div>
        </motion.button>
      ))}
    </div>
  );
} 