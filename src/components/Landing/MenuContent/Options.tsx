"use client";

import DDLCButton from "@/components/Common/Buttons/Button";

export default function Options() {
  return (
    <>
      <h2 className="text-3xl font-[Riffic] text-pink-700 mb-4">Settings</h2>
      <div className="space-y-6">
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="text-xl text-pink-800 mb-2">Timer Settings</h3>
          <p className="text-pink-600 mb-4">Customize your focus session durations</p>
          <DDLCButton label="Configure" onClick={() => console.log("Configure timer")} />
        </div>
        
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="text-xl text-pink-800 mb-2">Appearance</h3>
          <p className="text-pink-600 mb-4">Customize your visual experience</p>
          <DDLCButton label="Customize" onClick={() => console.log("Customize appearance")} />
        </div>
      </div>
    </>
  );
} 