"use client";

import { motion } from "framer-motion";

export default function Extra() {
  return (
    <>
      <h2 className="text-3xl font-[Riffic] text-pink-700 mb-4">Credits & Disclaimers</h2>
      <div className="space-y-6">
        <div className="bg-pink-50/50 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl text-pink-800 mb-3 font-[Riffic]">About the Creator</h3>
          <p className="text-pink-900 leading-relaxed">
            DDPC was created as a passion project by a DDLC fan who wanted to combine 
            the charm of Doki Doki Literature Club with productivity tools. This project 
            is made purely for fun and to share something enjoyable with the community.
          </p>
        </div>

        <div className="bg-pink-50/50 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl text-pink-800 mb-3 font-[Riffic]">Assets Credits</h3>
          <p className="text-pink-900 leading-relaxed mb-3">
            The character sprites and artwork used in this project are from DDLC and DDLC Plus, 
            created by Team Salvato. These assets are used with respect to Team Salvato&apos;s IP Guidelines.
          </p>
          <ul className="list-disc list-inside text-pink-900 space-y-2">
            <li>Character Sprites: Team Salvato</li>
            <li>Original Game: Doki Doki Literature Club (Team Salvato)</li>
            <li>Fonts: Team Salvato & Public Fonts</li>
          </ul>
        </div>

        <div className="bg-pink-50/50 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl text-pink-800 mb-3 font-[Riffic]">Legal Disclaimer</h3>
          <p className="text-pink-900 leading-relaxed">
            This is a fan project and is not affiliated with Team Salvato. Doki Doki Literature 
            Club and all related characters and assets belong to Team Salvato. This project is 
            created under fair use and follows Team Salvato&apos;s IP Guidelines.
          </p>
        </div>

        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-pink-600 italic">
            Special thanks to Team Salvato for creating DDLC and inspiring this project! 💕
          </p>
          <a 
            href="http://teamsalvato.com/ip-guidelines/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-pink-500 hover:text-pink-600 underline mt-2 block"
          >
            Team Salvato IP Guidelines
          </a>
        </motion.div>
      </div>
    </>
  );
} 