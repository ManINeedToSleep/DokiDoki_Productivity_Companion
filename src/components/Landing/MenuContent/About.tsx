"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <h2 className="text-3xl font-[Riffic] text-pink-700 mb-4">About DDPC</h2>
      <div className="space-y-6">
        <div className="bg-pink-50/50 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl text-pink-800 mb-3 font-[Riffic]">Welcome to the Club!</h3>
          <p className="text-pink-900 leading-relaxed">
            Doki Doki Productivity Club combines the charm of visual novels with powerful productivity tools. 
            Choose your companion, set your goals, and embark on a journey to become your most productive self!
          </p>
        </div>

        <div className="bg-pink-50/50 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl text-pink-800 mb-3 font-[Riffic]">Why Choose Us?</h3>
          <ul className="space-y-4 text-pink-900">
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">♥</span>
              <p><span className="font-semibold">Personalized Companionship:</span> Four unique companions, 
              each with their own personality and approach to productivity. They&apos;ll support, motivate, 
              and celebrate your achievements!</p>
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">♥</span>
              <p><span className="font-semibold">Engaging Experience:</span> Not just another timer app - 
              DDPC creates an immersive environment where productivity feels like spending time with a friend.</p>
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">♥</span>
              <p><span className="font-semibold">Adaptive Support:</span> Whether you need gentle encouragement 
              or energetic motivation, your companion adapts to your working style and preferences.</p>
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">♥</span>
              <p><span className="font-semibold">Progress Tracking:</span> Watch your productivity bloom with 
              detailed statistics, achievements, and memorable moments with your companion.</p>
            </li>
          </ul>
        </div>

        <div className="bg-pink-50/50 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl text-pink-800 mb-3 font-[Riffic]">Current Features</h3>
          <ul className="space-y-3 text-pink-900">
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">•</span>
              Customizable Pomodoro Timer
            </li>
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">•</span>
              Character-specific Interactions
            </li>
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">•</span>
              Progress Tracking & Statistics
            </li>
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">•</span>
              Achievement System
            </li>
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">•</span>
              Cloud Save Support
            </li>
          </ul>
        </div>

        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-pink-600 italic">
            Made with ❤️ by productivity enthusiasts, for productivity enthusiasts
          </p>
          <p className="text-xs text-pink-500 mt-1">
            Version 1.0.0 | Inspired by Doki Doki Literature Club
          </p>
        </motion.div>
      </div>
    </>
  );
} 