"use client";

import { motion } from "framer-motion";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loading({ message = "Loading...", fullScreen = false }: LoadingProps) {
  return (
    <motion.div 
      className={`flex flex-col items-center justify-center ${fullScreen ? 'h-screen' : 'h-full'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-pink-700 font-[Halogen]">{message}</p>
    </motion.div>
  );
} 