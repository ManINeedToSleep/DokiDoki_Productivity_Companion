"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CHARACTERS } from '@/constants';
import { CharacterId } from '@/types';
import Image from 'next/image';
import DDLCButton from '@/components/Common/Buttons/Button';

interface CharacterProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  companion: CharacterId;
}

export function CharacterProgressModal({ isOpen, onClose, companion }: CharacterProgressModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-6 w-full max-w-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-[Riffic] text-pink-700 mb-6">Welcome to Your Journey!</h2>
            
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={CHARACTERS[companion].chibiPath}
                alt="Your companion"
                width={80}
                height={80}
                className="object-contain"
              />
              <div>
                <h3 className="text-lg font-[Halogen] text-pink-800">
                  Start Your Adventure with {CHARACTERS[companion].name}!
                </h3>
                <p className="text-pink-600 text-sm">Complete study sessions to level up and unlock rewards</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/70 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-[Halogen] text-pink-800 mb-1">Level Up</h4>
                <p className="text-sm text-pink-600">Gain experience through focused study time</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🎨</div>
                <h4 className="font-[Halogen] text-pink-800 mb-1">Unlock Backgrounds</h4>
                <p className="text-sm text-pink-600">Discover new scenes as you progress</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🏆</div>
                <h4 className="font-[Halogen] text-pink-800 mb-1">Earn Achievements</h4>
                <p className="text-sm text-pink-600">Complete milestones to unlock rewards</p>
              </div>
            </div>

            <div className="bg-pink-50/50 p-4 rounded-lg mb-6">
              <h4 className="font-[Halogen] text-pink-800 mb-2">Progress Preview</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm text-pink-600 mb-1">
                    <span>Level 1</span>
                    <span>Level 2</span>
                  </div>
                  <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-pink-300"
                      initial={{ width: "0%" }}
                      animate={{ width: "0%" }}
                    />
                  </div>
                </div>
                <p className="text-sm text-pink-600">
                  Complete your first study session to begin tracking progress!
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <DDLCButton label="Got it!" onClick={onClose} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 