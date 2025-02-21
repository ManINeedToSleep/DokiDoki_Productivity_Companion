"use client";

import { cn } from "@/lib/utils";

interface DDLCButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

const DDLCButton = ({ label, onClick, disabled = false, className }: DDLCButtonProps) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-[Riffic] text-pink-900 border-4 border-[#FFB6C1] bg-[#FFEEF3] hover:bg-[#FFCCDD] disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
        className
      )}
      onClick={(e) => !disabled && onClick?.(e)}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default DDLCButton;
