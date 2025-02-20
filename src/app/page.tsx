"use client";

import { motion, AnimatePresence } from "framer-motion";
import MenuOptions from "@/components/Landing/MenuOptions";
import { CharacterProvider, useCharacter } from "@/components/Landing/CharacterContext";

const characters = {
  "sayori": {
    spritePath: "/images/sprites/Sayori-hc-724.png",
    name: "Sayori"
  },
  "yuri": {
    spritePath: "/images/sprites/Yuri-hc-724.png",
    name: "Yuri"
  },
  "natsuki": {
    spritePath: "/images/sprites/Natsuki-hc-724.png",
    name: "Natsuki"
  },
  "monika": {
    spritePath: "/images/sprites/Monika-hc-29.png",
    name: "Monika"
  }
};

function MainContent() {
  const { selectedCharacter } = useCharacter();

  return (
    <div className="min-h-screen flex font-sans"
      style={{ 
        backgroundImage: "url('/images/backgrounds/polkadot-pink.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#FFF5F8"
      }}>
      {/* Main Menu Image */}
      <motion.div
        className="h-full w-1/2 max-w-2xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img 
          src="/images/backgrounds/Menu-Screen.png" 
          alt="Doki Doki Productivity Club Menu"
          className="h-screen w-full object-cover"
          style={{ objectPosition: 'left center' }}
        />
      </motion.div>

      {/* Character Sprite */}
      <AnimatePresence mode="wait">
        {selectedCharacter && (
          <motion.div
            key={selectedCharacter}
            className="fixed left-[27%] top-[10%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ 
              duration: 0.5,
              ease: "easeOut",
              opacity: { duration: 0.3 }
            }}
          >
            <img
              src={characters[selectedCharacter as keyof typeof characters]?.spritePath}
              alt={characters[selectedCharacter as keyof typeof characters]?.name}
              className="h-[85vh] object-contain origin-bottom"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Options */}
      <MenuOptions />
      
      {/* Footer */}
      <footer className="absolute bottom-4 left-4 text-gray-600 text-sm">
        Inspired by Doki Doki Literature Club | Made with ❤️
      </footer>
    </div>
  );
}

export default function LandingPage() {
  return (
    <CharacterProvider>
      <MainContent />
    </CharacterProvider>
  );
}