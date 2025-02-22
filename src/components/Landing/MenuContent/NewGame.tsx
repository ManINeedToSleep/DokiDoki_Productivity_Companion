"use client";

import { useRouter } from "next/navigation";
import DDLCButton from "@/components/Common/Buttons/Button";
import { motion } from "framer-motion";
import { useCharacter } from '../CharacterContext';
import { useSound } from '@/hooks/useSound';

interface Character {
  id: string;
  name: string;
  description: string;
  chibiPath: string;
  spritePath: string;
}

const characters: Character[] = [
  {
    id: "sayori",
    name: "Sayori",
    description: "Always ready to encourage you and celebrate your achievements!",
    chibiPath: "/images/chibi_sprites/Sayori-Chibi-HC.png",
    spritePath: "/images/sprites/Sayori-HC-724.png"
  },
  {
    id: "yuri",
    name: "Yuri",
    description: "Helps you maintain deep concentration and mindfulness.",
    chibiPath: "/images/chibi_sprites/Yuri-Chibi-HC.png",
    spritePath: "/images/sprites/Yuri-HC-724.png"
  },
  {
    id: "natsuki",
    name: "Natsuki",
    description: "Keeps you motivated with her direct and spirited approach!",
    chibiPath: "/images/chibi_sprites/Natsuki-Chibi-HC.png",
    spritePath: "/images/sprites/Natsuki-HC-724.png"
  },
  {
    id: "monika",
    name: "Monika",
    description: "Guides you through your productivity journey with expertise.",
    chibiPath: "/images/chibi_sprites/Monika-Chibi-HC.png",
    spritePath: "/images/sprites/Monika-HC-724.png"
  }
];

export default function NewGame() {
  const router = useRouter();
  const { selectedCharacter, setSelectedCharacter } = useCharacter();
  const playSelectSound = useSound('/audio/sfx/ddlc-select-sfx.mp3');

  const handleCharacterSelect = (characterId: string) => {
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

  const menuContent = (
    <div className="p-6">
      <h2 className="text-2xl font-[Riffic] text-pink-700 mb-4">Choose Your Companion!</h2>
      <p className="text-base text-pink-900 mb-6">
        {selectedCharacter 
          ? `Would you like ${characters.find(c => c.id === selectedCharacter)?.name} to be your companion?`
          : "Click on a character to select them as your companion!"}
      </p>

      <div className="flex justify-between items-center mb-8">
        {characters.map((char) => (
          <motion.div
            key={char.id}
            className={`relative cursor-pointer flex flex-col items-center
              ${selectedCharacter === char.id ? 'scale-110' : 'hover:scale-105'}`}
            whileHover={{ scale: selectedCharacter === char.id ? 1.1 : 1.05 }}
            onClick={() => handleCharacterSelect(char.id)}
          >
            <motion.img
              src={char.chibiPath}
              alt={`${char.name} chibi`}
              className="w-24 h-24 object-contain mb-2"
              animate={{
                scale: selectedCharacter === char.id ? 1.1 : 1,
                opacity: selectedCharacter && selectedCharacter !== char.id ? 0.6 : 1
              }}
            />
            <p className={`text-xs font-[Riffic] text-center
              ${selectedCharacter === char.id ? 'text-pink-700' : 'text-pink-500'}`}>
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
            {characters.find(c => c.id === selectedCharacter)?.description}
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

  return menuContent;
}
