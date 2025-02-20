"use client";

import DDLCButton from "@/components/Common/Buttons/Button";

export default function Help() {
  return (
    <>
      <h2 className="text-3xl font-[Riffic] text-pink-700 mb-4">Help & Guide</h2>
      <div className="space-y-4">
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="text-xl text-pink-800 mb-2">Quick Start</h3>
          <p className="text-pink-600 mb-4">Learn how to use DDPC effectively</p>
          <DDLCButton label="Tutorial" onClick={() => console.log("Start tutorial")} />
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="text-xl text-pink-800 mb-2">FAQ</h3>
          <p className="text-pink-600 mb-4">Common questions and answers</p>
          <DDLCButton label="View FAQ" onClick={() => console.log("View FAQ")} />
        </div>
      </div>
    </>
  );
} 