"use client";

import { motion } from 'framer-motion';
import { useUserData } from '@/hooks/useUserData';
import Loading from "@/components/Common/Loading";

type CompanionType = 'sayori' | 'yuri' | 'natsuki' | 'monika';

export default function CompanionDisplay() {
  const { userData, loading } = useUserData();

  if (loading) {
    return <Loading message="Loading your companion..." />;
  }

  const companion = userData?.settings?.selectedCompanion as CompanionType;

  if (!companion) return null;

  return (
    <div className="h-full flex items-end justify-center">
      <motion.img
        src={`/images/sprites/${companion}-hc-724.png`}
        alt={`${companion} sprite`}
        className="h-[90vh] object-contain"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
} 