"use client";

import { useSound } from '@/hooks/useSound';

interface DDLCButtonProps {
  label: string;
  onClick?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  disabled?: boolean;
  className?: string;
}

const DDLCButton = ({ label, onClick, disabled = false, className }: DDLCButtonProps) => {
  const playSelectSound = useSound('/audio/sfx/ddlc-select-sfx.mp3');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSelectSound();
    if (onClick) {
      // Check if the onClick handler expects an event parameter
      if (onClick.length > 0) {
        (onClick as (e: React.MouseEvent<HTMLButtonElement>) => void)(e);
      } else {
        (onClick as () => void)();
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-[Riffic] text-pink-900 
        border-4 border-[#FFB6C1] bg-[#FFEEF3] hover:bg-[#FFCCDD] 
        disabled:opacity-50 disabled:cursor-not-allowed transition-colors
        ${className || ''}`}
    >
      {label}
    </button>
  );
};

export default DDLCButton;
