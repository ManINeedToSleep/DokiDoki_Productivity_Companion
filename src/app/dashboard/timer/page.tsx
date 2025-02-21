"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { TimerProvider } from '@/components/Timer/TimerProvider';
import { TimerDisplay } from '@/components/Timer/TimerDisplay';
import { TimerControls } from '@/components/Timer/TimerControls';
import { TimerTypeSelect } from '@/components/Timer/TimerTypeSelect';
import CompanionDisplay from '@/components/Dashboard/CompanionDisplay';
import Loading from '@/components/Common/Loading';
import { TodayProgress } from '@/components/Timer/TodayProgress';

export default function TimerPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) return <Loading />;
  if (!user) return null;

  return (
    <div 
      className="min-h-[calc(100vh-4rem)] pt-16"
      style={{ 
        backgroundImage: "url('/images/backgrounds/polkadot-pink.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#FFF5F8"
      }}>
      <div className="flex">
        {/* Main Timer Section - 2/3 width */}
        <div className="w-2/3 p-8">
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <TimerProvider>
              <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-[Riffic] text-pink-700 mb-8 text-center">
                  Study Timer
                </h1>
                <TimerTypeSelect />
                <TimerDisplay />
                <TimerControls />
              </div>
            </TimerProvider>
          </motion.div>

          {/* Extra Content Area */}
          <div className="mt-8 grid grid-cols-2 gap-6">
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-[Riffic] text-pink-600 mb-4">Today's Progress</h2>
              <TodayProgress />
            </motion.div>

            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-[Riffic] text-pink-600 mb-4">Study Notes</h2>
              <p className="font-[Halogen] text-pink-700">Coming soon...</p>
            </motion.div>
          </div>
        </div>

        {/* Companion Section - 1/3 width */}
        <div className="w-1/3 fixed right-0 top-16 bottom-0">
          <CompanionDisplay />
        </div>
      </div>
    </div>
  );
}
