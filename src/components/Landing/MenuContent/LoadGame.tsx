"use client";

import { useRouter } from "next/navigation";
import DDLCButton from "@/components/Common/Buttons/Button";

export default function LoadGame() {
  const router = useRouter();

  return (
    <>
      <h2 className="text-3xl font-[Riffic] text-pink-700 mb-4">Resume Progress</h2>
      <div className="space-y-4">
        <div className="bg-pink-50 p-6 rounded-lg">
          <h3 className="text-xl text-pink-800 mb-2">Welcome Back!</h3>
          <p className="text-pink-900 mb-6">
            Sign in to continue your productivity journey with your companion.
          </p>
          <DDLCButton 
            label="Sign In" 
            onClick={() => router.push('/auth?mode=signin')}
          />
        </div>
      </div>
    </>
  );
}
