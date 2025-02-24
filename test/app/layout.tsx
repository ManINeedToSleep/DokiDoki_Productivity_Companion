"use client";

import { useState, useEffect } from "react";
import "./globals.css";
import AuthWrapper from "@/components/Providers/AuthWrapper";
import SharedBackgroundMusic from '@/components/Common/Audio/SharedBackgroundMusic';
import { AudioProvider } from '@/contexts/AudioContext';
import LoadingScreen from '@/components/Common/LoadingScreen';

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
          <LoadingScreen />
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
