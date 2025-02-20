"use client";

import { motion } from "framer-motion";
import DDLCButton from "@/components/Common/Buttons/Button";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ 
        backgroundImage: "url('/images/backgrounds/polkadot-pink.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#FFF5F8"
      }}>
      <motion.div
        className="w-[400px] bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-[Riffic] text-pink-700 mb-6 text-center">
          Join the Club!
        </h1>
        
        <div className="space-y-6">
          <div className="bg-pink-50 p-4 rounded-lg">
            <h2 className="text-xl text-pink-800 mb-4">Sign In</h2>
            <DDLCButton 
              label="Continue with Google" 
              onClick={() => console.log("Google sign in")}
            />
          </div>

          <div className="bg-pink-50 p-4 rounded-lg">
            <h2 className="text-xl text-pink-800 mb-4">Sign Up</h2>
            <DDLCButton 
              label="Create Account" 
              onClick={() => console.log("Create account")}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
