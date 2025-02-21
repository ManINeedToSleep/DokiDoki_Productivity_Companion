"use client";

import { useRouter } from "next/navigation";
import DDLCButton from "@/components/Common/Buttons/Button";
import { motion } from "framer-motion";
import { useCharacter } from '../CharacterContext';

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
    spritePath: "/images/sprites/Sayori-hc-724.png"
  },
  {
    id: "yuri",
    name: "Yuri",
    description: "Helps you maintain deep concentration and mindfulness.",
    chibiPath: "/images/chibi_sprites/Yuri-Chibi-HC.png",
    spritePath: "/images/sprites/Yuri-hc-724.png"
  },
  {
    id: "natsuki",
    name: "Natsuki",
    description: "Keeps you motivated with her direct and spirited approach!",
    chibiPath: "/images/chibi_sprites/Natsuki-Chibi-HC.png",
    spritePath: "/images/sprites/Natsuki_724.png"
  },
  {
    id: "monika",
    name: "Monika",
    description: "Guides you through your productivity journey with expertise.",
    chibiPath: "/images/chibi_sprites/Monika-Chibi-HC.png",
    spritePath: "/images/sprites/Monika_29.png"
  }
];

export default function NewGame() {
  const router = useRouter();
  const { selectedCharacter, setSelectedCharacter } = useCharacter();

  const handleStartJourney = () => {
    if (selectedCharacter) {
      localStorage.setItem('selectedCompanion', selectedCharacter);
      router.push('/auth?mode=signup');
    }
  };

  // This will be rendered in the card
  const menuContent = (
    <>
      <h2 className="text-3xl font-[Riffic] text-pink-700 mb-4">Choose Your Companion!</h2>
      <p className="text-lg text-pink-900 mb-6">
        {selectedCharacter 
          ? `Would you like ${characters.find(c => c.id === selectedCharacter)?.name} to be your companion?`
          : "Click on a character to select them as your companion!"}
      </p>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {characters.map((char) => (
          <motion.div
            key={char.id}
            className={`relative cursor-pointer flex flex-col items-center
              ${selectedCharacter === char.id ? 'scale-110' : 'hover:scale-105'}`}
            whileHover={{ scale: selectedCharacter === char.id ? 1.1 : 1.05 }}
            onClick={() => setSelectedCharacter(char.id)}
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
            <p className={`text-sm font-[Riffic] text-center
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
          <p className="text-pink-900 italic">
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
    </>
  );

  return (
    <>
      {menuContent}
    </>
  );
}
