"use client";

import DDLCButton from "@/components/Common/Buttons/Button";

export default function LoadGame() {
  const savedSessions = [
    { id: 1, name: "Morning Study", date: "2024-03-20" },
    { id: 2, name: "Evening Focus", date: "2024-03-19" },
  ];

  return (
    <>
      <h2 className="text-3xl font-[Riffic] text-pink-700 mb-4">Resume Progress</h2>
      <div className="space-y-4">
        {savedSessions.map(session => (
          <div key={session.id} className="bg-pink-50 p-4 rounded-lg">
            <h3 className="text-xl text-pink-800">{session.name}</h3>
            <p className="text-sm text-pink-600">{session.date}</p>
            <DDLCButton 
              label="Load" 
              onClick={() => console.log(`Loading session ${session.id}`)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
