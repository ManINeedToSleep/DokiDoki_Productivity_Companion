"use client";

import Navbar from '@/components/Dashboard/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        backgroundImage: "url('/images/backgrounds/polkadot-pink.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#FFF5F8"
      }}
    >
      <Navbar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
} 