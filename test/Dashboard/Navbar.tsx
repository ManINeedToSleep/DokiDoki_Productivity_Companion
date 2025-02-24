"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FaHome, 
  FaClock, 
  FaComments, 
  FaCog, 
  FaSignOutAlt 
} from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useSound } from '@/hooks/useSound';
import { useUserData } from '@/hooks/useUserData';
import DDLCButton from '@/components/Common/Buttons/Button';
import { CHARACTERS } from '@/constants/characters';
import Image from 'next/image';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Home', icon: <FaHome size={20} />, path: '/dashboard' },
  { label: 'Timer', icon: <FaClock size={20} />, path: '/dashboard/timer' },
  { label: 'Chat', icon: <FaComments size={20} />, path: '/dashboard/chat' },
  { label: 'Settings', icon: <FaCog size={20} />, path: '/dashboard/settings' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const playSelectSound = useSound('/audio/sfx/ddlc-select-sfx.mp3');
  const { userData, loading } = useUserData();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNavClick = (path: string) => {
    if (path !== pathname) {
      playSelectSound();
    }
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm shadow-md px-4 py-2">
        <div className="animate-pulse h-10 bg-pink-100 rounded"></div>
      </div>
    );
  }

  if (!userData) {
    console.error("Navbar: userData is missing");
    return null;
  }

  const selectedCharacter = userData.settings.selectedCompanion;
  const characterData = CHARACTERS[selectedCharacter];

  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm shadow-md px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative">
            <Image
              src={characterData.chibiPath}
              alt={characterData.name}
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="font-[Riffic] text-pink-700 text-lg">Doki Doki Productivity Club</h1>
            <p className="text-xs text-pink-600">{userData.email}</p>
          </div>
        </div>
        <DDLCButton label="Sign Out" onClick={handleSignOut} />
      </div>
    </div>
  );
} 