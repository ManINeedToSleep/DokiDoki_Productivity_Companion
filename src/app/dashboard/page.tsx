"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '@/components/Common/Loading';
import CompanionDisplay from '@/components/Dashboard/CompanionDisplay';
import { QuickStats } from '@/components/Dashboard/QuickStats';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen overflow-y-auto"
      style={{ 
        backgroundImage: "url('/images/backgrounds/polkadot-pink.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#FFF5F8"
      }}>
      <div className="flex relative">
        {/* Companion Section - 1/4 width */}
        <div className="w-1/4 fixed left-0 top-16 bottom-0">
          <CompanionDisplay />
        </div>

        {/* Main Content Section - 3/4 width */}
        <div className="w-3/4 ml-[25%] p-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <h1 className="text-3xl font-[Riffic] text-pink-700 mb-8">
              Welcome, {user?.email}!
            </h1>
            
            {/* Dashboard Content */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/50 rounded-lg p-6 border-2 border-pink-200">
                <h2 className="text-xl font-[Riffic] text-pink-600 mb-4">Quick Stats</h2>
                <QuickStats />
              </div>
              
              <div className="bg-white/50 rounded-lg p-6 border-2 border-pink-200">
                <h2 className="text-xl font-[Riffic] text-pink-600 mb-4">Recent Activity</h2>
                <p className="font-[Halogen] text-pink-700">Coming soon...</p>
              </div>
              
              <div className="bg-white/50 rounded-lg p-6 border-2 border-pink-200">
                <h2 className="text-xl font-[Riffic] text-pink-600 mb-4">Goals</h2>
                <p className="font-[Halogen] text-pink-700">Coming soon...</p>
              </div>
              
              <div className="bg-white/50 rounded-lg p-6 border-2 border-pink-200">
                <h2 className="text-xl font-[Riffic] text-pink-600 mb-4">Achievements</h2>
                <p className="font-[Halogen] text-pink-700">Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
