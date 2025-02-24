"use client";

import { useRouter } from "next/navigation";
import DDLCButton from "@/components/Common/Buttons/Button";
import { motion } from "framer-motion";
import { useCharacter } from '../CharacterContext';
import { useSound } from '@/hooks/useSound';
import { CHARACTERS } from '@/constants/characters';
import { CharacterId, Character } from '@/types/character';


export default function NewGame() {
  const router = useRouter();
  const { selectedCharacter, setSelectedCharacter } = useCharacter();
  const playSelectSound = useSound('/audio/sfx/ddlc-select-sfx.mp3');

  const handleCharacterSelect = (characterId: CharacterId) => {
    playSelectSound();
    setSelectedCharacter(characterId);
  };

  const handleStartJourney = () => {
    if (selectedCharacter) {
      playSelectSound();
      localStorage.setItem('selectedCompanion', selectedCharacter);
      router.push('/auth?mode=signup');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-[Riffic] text-pink-700 mb-4">Choose Your Companion!</h2>
      <p className="text-base text-pink-900 mb-6">
        {selectedCharacter 
          ? `Would you like ${CHARACTERS[selectedCharacter].name} to be your companion?`
          : "Click on a character to select them as your companion!"}
      </p>

      <div className="flex justify-between items-center mb-8">
        {(Object.entries(CHARACTERS) as Array<[CharacterId, Character]>).map(([id, char]) => (
          <motion.div
            key={id}
            className={`relative cursor-pointer flex flex-col items-center
              ${selectedCharacter === id ? 'scale-110' : 'hover:scale-105'}`}
            whileHover={{ scale: selectedCharacter === id ? 1.1 : 1.05 }}
            onClick={() => handleCharacterSelect(id)}
          >
            <motion.img
              src={char.chibiPath}
              alt={`${char.name} chibi`}
              className="w-24 h-24 object-contain mb-2"
              animate={{
                scale: selectedCharacter === id ? 1.1 : 1,
                opacity: selectedCharacter && selectedCharacter !== id ? 0.6 : 1
              }}
            />
            <p className={`text-xs font-[Riffic] text-center
              ${selectedCharacter === id ? 'text-pink-700' : 'text-pink-500'}`}>
              {char.name}
            </p>
          </motion.div>
        ))}
      </div>
      
      {selectedCharacter && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <p className="text-pink-900 italic text-sm">
            {CHARACTERS[selectedCharacter].description}
          </p>
        </motion.div>
      )}

      <div className="flex justify-center">
        <DDLCButton 
          label="Start Journey" 
          onClick={handleStartJourney}
          disabled={!selectedCharacter}
        />
      </div>
    </div>
  );
}
