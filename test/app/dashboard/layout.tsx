"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useUserData } from '@/hooks/useUserData';
import { Navbar } from '@/components/Dashboard/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData } = useUserData();
  const selectedBackground = userData?.stats.selectedBackground || 'Menu-Background.png';

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={selectedBackground}
        className="min-h-screen flex flex-col"
        style={{ 
          backgroundImage: `url('/images/backgrounds/${selectedBackground}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#FFF5F8"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Navbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </motion.div>
    </AnimatePresence>
  );
} 