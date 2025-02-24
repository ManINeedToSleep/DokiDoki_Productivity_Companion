"use client";

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '@/components/Common/Loading';
import CompanionDisplay from '@/components/Dashboard/CompanionDisplay';
import { QuickStats } from '@/components/Dashboard/QuickStats';
import { Goals } from '@/components/Dashboard/Goals';
import { RecentActivity } from '@/components/Dashboard/RecentActivity';
import { Achievements } from '@/components/Dashboard/Achievements';
import { CharacterProgress } from '@/components/Dashboard/CharacterProgress';
import { motion } from 'framer-motion';
import { useUserData } from '@/hooks/useUserData';
import { TimerProvider } from '@/components/Timer/TimerProvider';

interface DashboardSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const DashboardSection = ({ children, delay = 0, className = "" }: DashboardSectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={`bg-white/50 rounded-lg p-6 border-2 border-pink-200 ${className}`}
  >
    {children}
  </motion.div>
);

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { loading: userDataLoading } = useUserData();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading || userDataLoading) return <Loading />;
  if (!user) return null;

  return (
    <TimerProvider>
      <div className="min-h-screen overflow-y-auto pt-20">
        <div className="flex relative">
          {/* Companion Section */}
          <div className="w-1/4 fixed left-0 top-16 bottom-0">
            <CompanionDisplay />
          </div>

          {/* Main Content Section */}
          <div className="w-3/4 ml-[25%] p-8">
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.h1 
                className="text-3xl font-[Riffic] text-pink-700 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Welcome back, {user.email?.split('@')[0]}!
              </motion.h1>
              
              <div className="grid grid-cols-12 gap-6">
                {/* Character Progress - Spans 4 columns */}
                <DashboardSection delay={0.1} className="col-span-4">
                  <CharacterProgress />
                </DashboardSection>

                {/* Quick Stats - Spans 8 columns */}
                <DashboardSection delay={0.2} className="col-span-8">
                  <QuickStats />
                </DashboardSection>
                
                {/* Recent Activity - Spans 6 columns */}
                <DashboardSection delay={0.3} className="col-span-6">
                  <RecentActivity />
                </DashboardSection>
                
                {/* Goals - Spans 6 columns */}
                <DashboardSection delay={0.4} className="col-span-6">
                  <Goals />
                </DashboardSection>
                
                {/* Achievements - Spans full width */}
                <DashboardSection delay={0.5} className="col-span-12">
                  <Achievements />
                </DashboardSection>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </TimerProvider>
  );
}
