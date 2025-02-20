"use client";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn"; // Utility for class merging

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "bg-sakuraWhite shadow-lg rounded-2xl p-6 border border-sakuraPink text-sakuraAccent",
        "dark:bg-sakuraLight dark:text-sakuraAccent dark:border-sakuraPink",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
