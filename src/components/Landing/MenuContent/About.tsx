"use client";

export default function About() {
  return (
    <>
      <h2 className="text-3xl font-[Riffic] text-pink-700 mb-4">About DDPC</h2>
      <div className="space-y-4">
        <p className="text-lg text-pink-900">
          Doki Doki Productivity Club is a cute and engaging productivity app inspired by
          the visual novel aesthetic.
        </p>
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="text-xl text-pink-800 mb-2">Version</h3>
          <p className="text-pink-600">1.0.0</p>
        </div>
        <p className="text-sm text-pink-600 italic">
          Made with ❤️ for productive people everywhere
        </p>
      </div>
    </>
  );
} 