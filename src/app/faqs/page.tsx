"use client";

import { motion } from "framer-motion";
import DDLCButton from "@/components/Common/Buttons/Button";
import { useRouter } from "next/navigation";

export default function FAQsPage() {
  const router = useRouter();
  
  const faqs = [
    {
      question: "How do I get started?",
      answer: "Choose 'New Game' from the main menu, select your companion, and create an account to begin your productivity journey!"
    },
    {
      question: "Can I change my companion later?",
      answer: "Yes! You can switch companions anytime from your profile settings once you're logged in."
    },
    {
      question: "How does the Pomodoro system work?",
      answer: "Our Pomodoro system uses customizable work/break intervals. Your companion will guide you through focused work sessions and remind you to take breaks."
    },
    {
      question: "Is my progress saved?",
      answer: "Yes! All your progress, achievements, and statistics are automatically saved to your cloud account."
    },
    {
      question: "Can I use DDPC offline?",
      answer: "While some features require internet connection, basic timer functionality works offline."
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4"
      style={{ 
        backgroundImage: "url('/images/backgrounds/polkadot-pink.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#FFF5F8"
      }}>
      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-[Riffic] text-pink-700 mb-8 text-center">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h2 className="text-xl font-[Riffic] text-pink-800 mb-3">{faq.question}</h2>
              <p className="text-pink-900">{faq.answer}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <DDLCButton 
            label="Back to Menu" 
            onClick={() => router.push('/')}
          />
        </div>
      </motion.div>
    </div>
  );
}
