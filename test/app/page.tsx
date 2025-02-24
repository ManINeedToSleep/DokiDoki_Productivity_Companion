"use client";

import { motion, AnimatePresence } from "framer-motion";
import MenuOptions from "@/components/Landing/MenuOptions";
import { CharacterProvider, useCharacter } from "@/components/Landing/CharacterContext";
import { CHARACTERS } from "@/constants/characters";
import Image from 'next/image';

function MainContent() {
  const { selectedCharacter } = useCharacter();

  return (
    <div className="min-h-screen flex font-sans relative"
      style={{ 
        backgroundImage: "url('/images/backgrounds/Menu-Background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#FFF5F8"
      }}>

      {/* Main Menu Image */}
      <motion.div
        className="h-full w-1/4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Image 
          src="/images/backgrounds/Menu-Option-Background.png" 
          alt="Doki Doki Productivity Club Menu"
          className="h-screen w-full object-cover"
          style={{ objectPosition: 'left center' }}
          width={1920}
          height={1080}
          priority
        />
      </motion.div>

      {/* Character Sprite */}
      <AnimatePresence mode="wait">
        {selectedCharacter && (
          <motion.div
            key={selectedCharacter}
            className="h-screen flex items-center justify-center w-1/4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={CHARACTERS[selectedCharacter].spritePath}
              alt={CHARACTERS[selectedCharacter].name}
              className="h-[85vh] w-auto object-contain"
              width={724}
              height={1024}
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty quarter for spacing */}
      <div className="w-1/4" />

      {/* Menu Options - in the last quarter */}
      <div className="w-1/4">
        <MenuOptions />
      </div>
      
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