"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUserData } from '@/hooks/useUserData';
import { UserSettings } from '@/types/user';
import Loading from '@/components/Common/Loading';
import DDLCButton from '@/components/Common/Buttons/Button';
import { useSound } from '@/hooks/useSound';
import ElasticSlider from '@/components/Common/ElasticSliders';
import { useAudio } from '@/contexts/AudioContext';
import Image from 'next/image';

interface Character {
  id: string;
  name: string;
  description: string;
  chibiPath: string;
}

const characters: Character[] = [
  {
    id: "sayori",
    name: "Sayori",
    description: "Always ready to encourage you and celebrate your achievements!",
    chibiPath: "/images/chibi_sprites/Sayori-Chibi-HC.png"
  },
  {
    id: "yuri",
    name: "Yuri",
    description: "Helps you maintain deep concentration and mindfulness.",
    chibiPath: "/images/chibi_sprites/Yuri-Chibi-HC.png"
  },
  {
    id: "natsuki",
    name: "Natsuki",
    description: "Keeps you motivated with her direct and spirited approach!",
    chibiPath: "/images/chibi_sprites/Natsuki-Chibi-HC.png"
  },
  {
    id: "monika",
    name: "Monika",
    description: "Guides you through your productivity journey with expertise.",
    chibiPath: "/images/chibi_sprites/Monika-Chibi-HC.png"
  }
];

// Move defaultSettings outside the component
const defaultSettings: UserSettings = {
  selectedCompanion: 'sayori',
  pomodoroLength: 25,
  shortBreakLength: 5,
  longBreakLength: 15,
  soundVolume: 0.5,
  musicVolume: 0.3,
  notifications: {
    sound: true,
    desktop: true
  }
};

export default function SettingsPage() {
  const { userData, loading, updateSettings } = useUserData();
  const { updateSoundVolume, updateMusicVolume } = useAudio();
  
  // Use default settings, then override with userData if available
  const [settings, setSettings] = useState<UserSettings>(() => ({
    ...defaultSettings,
    ...(userData?.settings || {})
  }));

  // Update settings when userData changes
  useEffect(() => {
    if (userData?.settings) {
      setSettings({
        ...defaultSettings, // Always include defaults
        ...userData.settings // Override with user settings
      });
    }
  }, [userData?.settings]);

  const playSelectSound = useSound('/audio/sfx/ddlc-select-sfx.mp3');

  if (loading) return <Loading />;

  const handleSettingChange = <T extends keyof UserSettings>(key: T, value: UserSettings[T]) => {
    playSelectSound();
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    playSelectSound();
    await updateSettings({
      ...defaultSettings, // Include defaults
      ...settings, // Override with current settings
      notifications: {
        ...defaultSettings.notifications, // Include default notifications
        ...settings.notifications // Override with current notifications
      }
    });
  };

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(userData?.settings);

  const handleVolumeChange = (key: 'soundVolume' | 'musicVolume', value: number) => {
    const newVolume = value / 100;
    setSettings(prev => ({ ...prev, [key]: newVolume }));
    
    if (key === 'soundVolume') {
      updateSoundVolume(newVolume);
    } else {
      updateMusicVolume(newVolume);
    }
  };

  const handleVolumeChangeComplete = (key: 'soundVolume' | 'musicVolume', value: number) => {
    const newVolume = value / 100;
    handleSettingChange(key, newVolume);
    
    // Play test sound only for sound effects volume
    if (key === 'soundVolume') {
      playSelectSound();
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 p-8">
      <motion.div 
        className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-[Riffic] text-pink-700 mb-8">Settings</h1>

        {/* Companion Selection */}
        <section className="mb-8">
          <h2 className="text-2xl font-[Riffic] text-pink-600 mb-4">Change Companion</h2>
          <div className="grid grid-cols-4 gap-6">
            {characters.map((char) => (
              <motion.div
                key={char.id}
                className={`relative cursor-pointer p-4 rounded-lg border-4 transition-all
                  ${settings.selectedCompanion === char.id 
                    ? 'border-pink-500 bg-pink-50' 
                    : 'border-pink-200 hover:border-pink-300'}`}
                onClick={() => handleSettingChange('selectedCompanion', char.id)}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={char.chibiPath}
                  alt={char.name}
                  width={96}
                  height={96}
                  className="mx-auto mb-2 object-contain"
                />
                <h3 className="text-center font-[Riffic] text-pink-700">{char.name}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timer Settings */}
        <section className="mb-8">
          <h2 className="text-2xl font-[Riffic] text-pink-600 mb-4">Timer Settings</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-pink-700 font-[Riffic]">Pomodoro Length</label>
              <input
                type="number"
                min={1}
                max={60}
                value={settings.pomodoroLength}
                onChange={(e) => handleSettingChange('pomodoroLength', parseInt(e.target.value))}
                className="w-full p-3 rounded-lg bg-white/50 border border-pink-100 
                  focus:border-pink-300 focus:outline-none text-center
                  text-pink-900 font-['Halogen'] placeholder:text-pink-300"
              />
              <p className="text-sm text-pink-600 text-center">Minutes</p>
            </div>
            <div className="space-y-2">
              <label className="block text-pink-700 font-[Riffic]">Short Break</label>
              <input
                type="number"
                min={1}
                max={30}
                value={settings.shortBreakLength}
                onChange={(e) => handleSettingChange('shortBreakLength', parseInt(e.target.value))}
                className="w-full p-3 rounded-lg bg-white/50 border border-pink-100 
                  focus:border-pink-300 focus:outline-none text-center
                  text-pink-900 font-['Halogen'] placeholder:text-pink-300"
              />
              <p className="text-sm text-pink-600 text-center">Minutes</p>
            </div>
            <div className="space-y-2">
              <label className="block text-pink-700 font-[Riffic]">Long Break</label>
              <input
                type="number"
                min={1}
                max={60}
                value={settings.longBreakLength}
                onChange={(e) => handleSettingChange('longBreakLength', parseInt(e.target.value))}
                className="w-full p-3 rounded-lg bg-white/50 border border-pink-100 
                  focus:border-pink-300 focus:outline-none text-center
                  text-pink-900 font-['Halogen'] placeholder:text-pink-300"
              />
              <p className="text-sm text-pink-600 text-center">Minutes</p>
            </div>
          </div>
        </section>

        {/* Audio Settings */}
        <section className="mb-8">
          <h2 className="text-2xl font-[Riffic] text-pink-600 mb-4">Audio Settings</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-pink-700 font-[Riffic]">Sound Effects Volume</label>
              <ElasticSlider
                defaultValue={(settings.soundVolume || 0.5) * 100}
                startingValue={0}
                maxValue={100}
                className="mx-auto"
                leftIcon={
                  <span className="text-pink-500 font-[Riffic]">🔈</span>
                }
                rightIcon={
                  <span className="text-pink-500 font-[Riffic]">🔊</span>
                }
                onChange={(value) => handleVolumeChange('soundVolume', value)}
                onChangeComplete={(value) => handleVolumeChangeComplete('soundVolume', value)}
              />
            </div>
            <div className="space-y-4">
              <label className="block text-pink-700 font-[Riffic]">Music Volume</label>
              <ElasticSlider
                defaultValue={(settings.musicVolume || 0.3) * 100}
                startingValue={0}
                maxValue={100}
                className="mx-auto"
                leftIcon={
                  <span className="text-pink-500 font-[Riffic]">🎵</span>
                }
                rightIcon={
                  <span className="text-pink-500 font-[Riffic]">🎼</span>
                }
                onChange={(value) => handleVolumeChange('musicVolume', value)}
                onChangeComplete={(value) => handleVolumeChangeComplete('musicVolume', value)}
              />
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="mb-8">
          <h2 className="text-2xl font-[Riffic] text-pink-600 mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.notifications?.sound}
                onChange={(e) => handleSettingChange('notifications', {
                  ...settings.notifications,
                  sound: e.target.checked
                })}
                className="w-5 h-5 rounded border-pink-300 text-pink-500 
                  focus:ring-pink-500 focus:ring-offset-0"
              />
              <label className="text-pink-700 font-['Halogen']">Enable sound notifications</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.notifications?.desktop}
                onChange={(e) => handleSettingChange('notifications', {
                  ...settings.notifications,
                  desktop: e.target.checked
                })}
                className="w-5 h-5 rounded border-pink-300 text-pink-500 
                  focus:ring-pink-500 focus:ring-offset-0"
              />
              <label className="text-pink-700 font-['Halogen']">Enable desktop notifications</label>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-center">
          <DDLCButton
            label="Save Settings"
            onClick={handleSaveSettings}
            disabled={!hasChanges}
          />
        </div>
      </motion.div>
    </div>
  );
}
