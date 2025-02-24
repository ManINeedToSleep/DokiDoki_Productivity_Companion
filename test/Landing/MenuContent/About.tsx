"use client";

import { motion } from "framer-motion";
import { ABOUT_SECTIONS } from "@/constants/content";

interface AboutSectionProps {
  title: string;
  content?: string | React.ReactNode;
  listItems?: string[];
}

const AboutSection = ({ title, content, listItems }: AboutSectionProps) => (
  <div className="bg-pink-50/50 p-6 rounded-lg backdrop-blur-sm">
    <h3 className="text-xl text-pink-800 mb-3 font-[Riffic]">{title}</h3>
    {content && (
      typeof content === 'string' ? (
        <p className="text-pink-900 leading-relaxed">{content}</p>
      ) : (
        content
      )
    )}
    {listItems && (
      <ul className="space-y-4 text-pink-900">
        {listItems.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-pink-500 mr-2">♥</span>
            <p>{item}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default function About() {
  return (
    <>
      <h2 className="text-3xl font-[Riffic] text-pink-700 mb-4">About DDPC</h2>
      <div className="space-y-6">
        {ABOUT_SECTIONS.map((section, index) => (
          <AboutSection key={index} {...section} />
        ))}
        
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