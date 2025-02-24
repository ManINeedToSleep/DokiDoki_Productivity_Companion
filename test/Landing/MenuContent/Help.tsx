"use client";

import { useRouter } from "next/navigation";
import DDLCButton from "@/components/Common/Buttons/Button";
import { motion } from "framer-motion";

interface HelpSection {
  id: string;
  title: string;
  description: string;
  action: {
    label: string;
    path: string;
    isExternal?: boolean;
  };
}

const HELP_SECTIONS: HelpSection[] = [
  {
    id: 'faq',
    title: "FAQ",
    description: "Have questions? Find quick answers to common questions about DDPC!",
    action: {
      label: "View FAQ",
      path: '/faqs',
      isExternal: false
    }
  },
  {
    id: 'bugs',
    title: "Found a Bug?",
    description: "Help us improve DDPC by reporting issues or contributing to our open source project!",
    action: {
      label: "Report Issue",
      path: "https://github.com/ManINeedToSleep/DokiDoki_Productivity_Companion/issues/new",
      isExternal: true
    }
  }
];

export default function Help() {
  const router = useRouter();

  return (
    <>
      <h2 className="text-3xl font-[Riffic] text-pink-700 mb-4">Help & Support</h2>
      <div className="space-y-4">
        {HELP_SECTIONS.map((section) => (
          <motion.div
            key={section.id}
            className="bg-pink-50/50 p-6 rounded-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-xl text-pink-800 mb-2">{section.title}</h3>
            <p className="text-pink-900 mb-4">{section.description}</p>
            <DDLCButton 
              label={section.action.label}
              onClick={() => {
                if (section.action.isExternal) {
                  window.open(section.action.path, '_blank');
                } else {
                  router.push(section.action.path);
                }
              }}
            />
          </motion.div>
        ))}

        <div className="text-center mt-8">
          <p className="text-sm text-pink-600 italic">
            Thank you for helping make DDPC better! 💕
          </p>
        </div>
      </div>
    </>
  );
} 