import { CharacterId } from '@/types/character';

interface CompanionMessages {
  welcomeMessages: string[];
  newUserMessages: string[];
}

export const COMPANION_MESSAGES: Record<CharacterId, CompanionMessages> = {
  sayori: {
    welcomeMessages: [
      "Hi there! Ready to be productive together?",
      "I'm so excited to help you study!",
      "Let's make today super productive!"
    ],
    newUserMessages: [
      "Welcome to the club! I'll be your study buddy!",
      "I'm looking forward to our productive journey together!"
    ]
  },
  yuri: {
    welcomeMessages: [
      "Shall we begin our focused study session?",
      "I've prepared a calming atmosphere for us.",
      "Let's dive deep into productivity together."
    ],
    newUserMessages: [
      "Welcome... I hope we can study effectively together.",
      "I'll help you maintain deep concentration."
    ]
  },
  natsuki: {
    welcomeMessages: [
      "Ready to crush some tasks?",
      "Don't think I'll go easy on you!",
      "Let's show everyone what we can do!"
    ],
    newUserMessages: [
      "A new member? Fine, I'll help you out!",
      "Just don't waste my time, okay?"
    ]
  },
  monika: {
    welcomeMessages: [
      "Let's optimize your productivity together!",
      "I've been waiting to help you focus.",
      "Ready for another productive session?"
    ],
    newUserMessages: [
      "Welcome to our special study space!",
      "I'll guide you to your full potential."
    ]
  }
} as const; 