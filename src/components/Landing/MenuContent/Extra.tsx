"use client";

import DDLCButton from "@/components/Common/Buttons/Button";

export default function Extra() {
  return (
    <>
      <h2 className="text-3xl font-[Riffic] text-pink-700 mb-4">Extras</h2>
      <div className="space-y-4">
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="text-xl text-pink-800 mb-2">Achievements</h3>
          <p className="text-pink-600 mb-4">View your productivity milestones</p>
          <DDLCButton label="View" onClick={() => console.log("View achievements")} />
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="text-xl text-pink-800 mb-2">Gallery</h3>
          <p className="text-pink-600 mb-4">Special moments and unlockables</p>
          <DDLCButton label="Browse" onClick={() => console.log("Browse gallery")} />
        </div>
      </div>
    </>
  );
} 