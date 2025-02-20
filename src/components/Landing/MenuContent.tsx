"use client";

import { AnimatePresence, motion } from "framer-motion";
import NewGame from "./MenuContent/NewGame";
import LoadGame from "./MenuContent/LoadGame";
import Options from "./MenuContent/Options";
import About from "./MenuContent/About";
import Help from "./MenuContent/Help";
import Extra from "./MenuContent/Extra";

interface MenuContentProps {
  selectedItem: string;
}

const MenuContent = ({ selectedItem }: MenuContentProps) => {
  const contentMap = {
    "New Game": <NewGame />,
    "Load Game": <LoadGame />,
    "Options": <Options />,
    "About": <About />,
    "Help": <Help />,
    "Extra": <Extra />
  };

  return (
    <>
      <div className="fixed inset-0 left-1/3 flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedItem}
            className="w-[550px] max-h-[600px] overflow-y-auto 
              bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            {contentMap[selectedItem as keyof typeof contentMap]}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default MenuContent; 