"use client";

import { useRouter } from "next/navigation";
import DDLCButton from "@/components/Common/Buttons/Button";
import { motion } from "framer-motion";

const LOAD_GAME_CONTENT = {
  title: "Resume Progress",
  subtitle: "Welcome Back!",
  description: "Sign in to continue your productivity journey with your companion.",
  buttonLabel: "Sign In"
} as const;

export default function LoadGame() {
  const router = useRouter();

  return (
    <>
      <h2 className="text-3xl font-[Riffic] text-pink-700 mb-4">
        {LOAD_GAME_CONTENT.title}
      </h2>
      <div className="space-y-4">
        <motion.div 
          className="bg-pink-50 p-6 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl text-pink-800 mb-2">
            {LOAD_GAME_CONTENT.subtitle}
          </h3>
          <p className="text-pink-900 mb-6">
            {LOAD_GAME_CONTENT.description}
          </p>
          <DDLCButton 
            label={LOAD_GAME_CONTENT.buttonLabel}
            onClick={() => router.push('/auth?mode=signin')}
          />
        </motion.div>
      </div>
    </>
  );
}
