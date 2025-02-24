import { Character, CharacterId } from '@/types/character';

export const CHARACTERS = {
  "sayori": {
    id: "sayori",
    name: "Sayori",
    description: "Always ready to encourage you and celebrate your achievements!",
    spritePath: "/images/sprites/Sayori.png",
    chibiPath: "/images/chibi_sprites/Sayori-Chibi.png",
    style: {
      fontFamily: "s1",
      fontSize: "1.4rem",
      color: "rgb(255, 121, 153)",
      bgColor: "rgb(255, 246, 248)"
    }
  },
  "yuri": {
    id: "yuri",
    name: "Yuri",
    description: "Helps you maintain deep concentration and mindfulness.",
    spritePath: "/images/sprites/Yuri.png",
    chibiPath: "/images/chibi_sprites/Yuri-Chibi.png",
    style: {
      fontFamily: "y1",
      fontSize: "1.3rem",
      color: "rgb(87, 35, 100)",
      bgColor: "rgb(248, 246, 255)"
    }
  },
  "natsuki": {
    id: "natsuki",
    name: "Natsuki",
    description: "Keeps you motivated with her direct and spirited approach!",
    spritePath: "/images/sprites/Natsuki.png",
    chibiPath: "/images/chibi_sprites/Natsuki-Chibi.png",
    style: {
      fontFamily: "n1",
      fontSize: "1.5rem",
      color: "rgb(255, 102, 140)",
      bgColor: "rgb(255, 246, 250)"
    }
  },
  "monika": {
    id: "monika",
    name: "Monika",
    description: "Guides you through your productivity journey with expertise.",
    spritePath: "/images/sprites/Monika.png",
    chibiPath: "/images/chibi_sprites/Monika-Chibi.png",
    style: {
      fontFamily: "m1",
      fontSize: "1.3rem",
      color: "rgb(46, 125, 50)",
      bgColor: "rgb(246, 255, 247)"
    }
  }
} as const; 