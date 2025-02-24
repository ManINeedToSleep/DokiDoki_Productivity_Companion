"use client";

import { motion } from "framer-motion";
import DDLCButton from "@/components/Common/Buttons/Button";
import { useRouter } from "next/navigation";

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
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

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  item: {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1
      }
    })
  }
};

export default function FAQsPage() {
  const router = useRouter();
  
  return (
    <div 
      className="min-h-screen py-12 px-4"
      style={{ 
        backgroundImage: "url('/images/backgrounds/Menu-Background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <motion.div 
        className="max-w-3xl mx-auto"
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl font-[Riffic] text-pink-700 mb-8 text-center">
          Frequently Asked Questions
        </h1>
        
        <div className="space-y-6">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm
                hover:bg-white/90 transition-colors duration-200"
              variants={ANIMATION_VARIANTS.item}
              custom={index}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-xl font-[Riffic] text-pink-800 mb-3">
                {faq.question}
              </h2>
              <p className="text-pink-900 leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <DDLCButton 
            label="Back to Menu" 
            onClick={() => router.push('/')}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
