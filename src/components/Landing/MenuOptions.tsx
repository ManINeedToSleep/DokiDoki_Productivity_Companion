"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import MenuContent from "./MenuContent";
import { useSound } from '@/hooks/useSound';

const menuItems = [
  {
    label: "New Game",
    onClick: () => console.log("Starting new game...")
  },
  {
    label: "Load Game",
    onClick: () => console.log("Loading game...")
  },
  {
    label: "Options",
    onClick: () => console.log("Opening options...")
  },
  {
    label: "About",
    onClick: () => console.log("Opening about...")
  },
  {
    label: "Help",
    onClick: () => console.log("Opening help...")
  },
  {
    label: "Extra",
    onClick: () => console.log("Opening extras...")
  }
];

export default function MenuOptions() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const playSelectSound = useSound('/audio/sfx/ddlc-select-sfx.mp3');

  const getItemPosition = (position: number) => {
    const radius = 200;
    const angleStep = 0.15;
    const angle = position * angleStep;
    
    const y = position * 50;
    const x = Math.sin(angle) * radius * 0.25;
    
    return `translateX(${x}px) translateY(${y}px)`;
  };

  const handleMenuSelect = (index: number) => {
    playSelectSound();
    setSelectedIndex(index);
    menuItems[index].onClick();
  };

  return (
    <>
      <div className="fixed left-8 top-[75%] -translate-y-1/2 w-[300px] overflow-visible">
        {/* 
          Menu Position Controls:
          - Adjusted left position for curve alignment
          - Moved down further (from 70% to 75%)
          - Wider, more gentle curve to match menu screen
          - Adjusted spacing for better visual flow
        */}
        <div className="relative h-[450px]">
          {menuItems.map((item, index) => {
            const isSelected = selectedIndex === index;
            const position = index - selectedIndex;
            
            return (
              <motion.button
                key={item.label}
                className={`absolute left-0 w-full py-2 text-3xl text-left px-6
                  transition-all duration-300 font-[Riffic] cursor-pointer
                  ${isSelected ? 'z-10' : 'z-0'}`}
                style={{
                  transform: `${getItemPosition(position)} scale(${isSelected ? 1.2 : 0.9})`,
                  opacity: Math.abs(position) > 2.5 ? 0 : 1 - Math.abs(position) * 0.2,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleMenuSelect(index)}
              >
                <div className="relative">
                  {/* Background text (hot pink border effect) */}
                  <span 
                    className="absolute inset-0 text-[#FF69B4]"
                    style={{ 
                      transform: 'scale(1.02)',
                      WebkitTextStroke: '4px #FF69B4',
                      WebkitTextFillColor: 'transparent',
                      opacity: isSelected ? 1 : 0.7
                    }}
                  >
                    {item.label}
                  </span>
                  
                  {/* Foreground text (light pink) */}
                  <span 
                    className={`relative transition-colors duration-200
                      ${hoveredIndex === index || isSelected ? 'text-white' : 'text-pink-200'}`}
                  >
                    {item.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* Add the content display */}
      <MenuContent selectedItem={menuItems[selectedIndex].label} />
    </>
  );
} 