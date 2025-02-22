"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import "./globals.css";
import AuthWrapper from "@/components/Providers/AuthWrapper";
import SharedBackgroundMusic from '@/components/Common/Audio/SharedBackgroundMusic';
import { AudioProvider } from '@/contexts/AudioContext';

export const metadata: Metadata = {
  title: "DDLC Productivity Club",
  description: "Study with your favorite Doki!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading of assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading screen for at least 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body>
        {isLoading ? (
          <div className="fixed inset-0 bg-pink-50 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="w-32 h-32 mb-4 mx-auto">
                <img
                  src="/images/chibi_sprites/Sayori-Chibi-HC.png"
                  alt="Loading..."
                  className="w-full h-full object-contain animate-bounce"
                />
              </div>
              <h1 className="text-2xl font-[Riffic] text-pink-700 mb-2">
                Loading your study session...
              </h1>
              <p className="text-pink-500 font-[Halogen]">
                Your Doki is getting ready!
              </p>
            </div>
          </div>
        ) : (
          <AudioProvider>
            <SharedBackgroundMusic />
            <AuthWrapper>
              {children}
            </AuthWrapper>
          </AudioProvider>
        )}
      </body>
    </html>
  );
}
