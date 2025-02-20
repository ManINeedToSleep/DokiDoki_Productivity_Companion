"use client";

import { useState } from "react";

interface DDLCButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const DDLCButton = ({ label, onClick, disabled = false }: DDLCButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      className={`w-[180px] h-[60px] text-lg font-bold border-4 rounded-md transition-all
        ${
          disabled
            ? "border-gray-400 bg-gray-300 text-gray-500 cursor-not-allowed" // Insensitive
            : isPressed
            ? "border-[#FFB6C1] bg-[#FFB6C1] text-pink-900" // Selected (using hover color)
            : "border-[#FFB6C1] bg-[#FFEEF3] text-pink-700 hover:bg-[#FFCCDD] hover:border-[#FFAAC9]" // Idle with new hover
      }`}
      onClick={() => !disabled && onClick?.()}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default DDLCButton;
