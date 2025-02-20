"use client";

import { useRouter } from "next/navigation";
import DDLCButton from "@/components/Common/Buttons/Button";

export default function Help() {
  const router = useRouter();
  const repoUrl = "https://github.com/ManINeedToSleep/DokiDoki_Productivity_Companion";

  return (
    <>
      <h2 className="text-3xl font-[Riffic] text-pink-700 mb-4">Help & Support</h2>
      <div className="space-y-4">
        <div className="bg-pink-50/50 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl text-pink-800 mb-2">FAQ</h3>
          <p className="text-pink-900 mb-4">
            Have questions? Find quick answers to common questions about DDPC!
          </p>
          <DDLCButton 
            label="View FAQ" 
            onClick={() => router.push('/faqs')}
          />
        </div>

        <div className="bg-pink-50/50 p-4 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl text-pink-800 mb-2">Found a Bug?</h3>
          <p className="text-pink-900 mb-4">
            Help us improve DDPC by reporting issues or contributing to our open source project!
          </p>
          <div className="space-y-2">
            <DDLCButton 
              label="Report Issue" 
              onClick={() => window.open(`${repoUrl}/issues/new`, '_blank')}
            />
            <p className="text-sm text-pink-600 mt-2">
              Visit our{' '}
              <a 
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 underline"
              >
                GitHub Repository
              </a>
              {' '}to learn more about contributing.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-pink-600 italic">
            Thank you for helping make DDPC better! 💕
          </p>
        </div>
      </div>
    </>
  );
} 