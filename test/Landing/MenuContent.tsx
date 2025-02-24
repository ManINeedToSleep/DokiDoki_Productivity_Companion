"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MenuItemId } from "@/types/menu";
import NewGame from "./MenuContent/NewGame";
import LoadGame from "./MenuContent/LoadGame";
import Options from "./MenuContent/Options";
import About from "./MenuContent/About";
import Help from "./MenuContent/Help";
import Extra from "./MenuContent/Extra";

interface MenuContentProps {
  selectedItem: MenuItemId;
}

const CONTENT_MAP: Record<MenuItemId, React.ReactNode> = {
  'newGame': <NewGame />,
  'loadGame': <LoadGame />,
  'options': <Options />,
  'about': <About />,
  'help': <Help />,
  'extra': <Extra />
};

const ANIMATION_VARIANTS = {
  initial: { opacity: 0, x: 50, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -50, scale: 0.95 },
  transition: { 
    duration: 0.3,
    ease: "easeInOut"
  }
};

const MenuContent = ({ selectedItem }: MenuContentProps) => {
  return (
    <div className="fixed inset-0 left-1/3 flex items-center justify-center z-10">
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedItem}
          className="w-[550px] max-h-[600px] overflow-y-auto 
            bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg"
          initial={ANIMATION_VARIANTS.initial}
          animate={ANIMATION_VARIANTS.animate}
          exit={ANIMATION_VARIANTS.exit}
          transition={ANIMATION_VARIANTS.transition}
        >
          {CONTENT_MAP[selectedItem]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MenuContent; 