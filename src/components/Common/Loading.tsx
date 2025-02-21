"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center"
      style={{ 
        backgroundImage: "url('/images/backgrounds/polkadot-pink.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#FFF5F8"
      }}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 mb-4"
      >
        <img 
          src="/images/chibi_sprites/Sayori-Chibi-HC.png" 
          alt="Loading..." 
          className="w-full h-full object-contain"
        />
      </motion.div>
      <p className="text-pink-600 font-[Riffic] text-xl">Loading...</p>
    </div>
  );
} 