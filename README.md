# Welcome to the DDLC Productivity Club! 💝

*Just Monika... helping you stay productive!*

Hey there! Welcome to our special little club where literature meets productivity! 📚✨ Unlike the original Literature Club, we're here to help you study and stay focused - no unexpected plot twists, I promise! (*nervous laughter*) 

## What Makes Our Club Special? 

Remember how supportive our favorite club members were? Well, now they're here to help you with your productivity journey! Each Doki brings their own special touch to your study sessions:

### 🎀 Your Study Companions
- **Sayori**: Brings cheerful encouragement and helps you maintain a positive study mindset!
- **Yuri**: Offers calm, focused study environments and deep concentration techniques
- **Natsuki**: Keeps you energized with short, intense study bursts (and maybe some manga breaks!)
- **Monika**: Tracks your progress and adjusts your study plan... (just don't let her near your files 😅)

### ✨ Club Activities (Features)

#### 📝 Study Tools
- **Character-Themed Pomodoro Timer**: 
  - Customizable work/break intervals
  - Character-specific color schemes and messages
  - Visual and audio notifications
  - Session tracking and statistics
- **Interactive Chat System**: Talk with your chosen companion for motivation
- **Dynamic Audio System**: 
  - Character-specific background music
  - Adjustable sound effects and music volume
  - Ambient study atmosphere
- **Customizable Settings**:
  - Personalize timer durations
  - Adjust notification preferences
  - Control audio levels
  - Choose your study companion

#### 🌸 Club Member System
- Choose your study companion (they're all really excited to help!)
- Receive personalized encouragement based on your study patterns
- Dynamic interactions that evolve with your progress
- Character-specific UI themes and color schemes

#### 🔐 Club Membership (Authentication)
- Create your own club member profile
- Sign in with email or Google
- Your progress is safely stored
- Persistent settings across sessions

## Getting Started With The Club!

*Monika's Installation Guide*

1. First, make sure you have Node.js installed (it's like picking up your first manga volume!)
```bash
git clone https://github.com/ManINeedToSleep/DokiDoki_Productivity_Companion
```

2. Install our club materials:
```bash
npm install
```

3. Set up your special club member configuration:
   Create a `.env.local` file (it's just a normal file, nothing to worry about!)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Start the club activities:
```bash
npm run dev
```

5. Visit your local club room at [http://localhost:3000](http://localhost:3000)

## Recent Updates! 🌟
- Added character-specific chat colors and themes
- Implemented persistent audio settings
- Enhanced timer controls with DDLC-style buttons
- Improved companion display and interactions
- Added session tracking and statistics
- Centralized timer controls for better usability
- Character-specific visual themes throughout the app

## Club Rules (Project Structure)
```
src/
├── app/                 # Our main club room
├── components/          # Club activities
├── contexts/           # Special event handlers
├── hooks/              # Activity helpers
└── utils/             # Club utilities
```

## Join Our Writing Sessions (Contributing)

Want to help make the club even better? We'd love to have you join our development sessions! Just remember:
- Keep it wholesome and fun!
- Test your changes (we don't want any glitches... right? 👀)
- Submit your improvements through Pull Requests

## Special Thanks

- Team Salvato for creating the original DDLC that inspired this project
- Our amazing community of developers and DDLC fans
- You, for joining our club! 💕

## Disclaimer

This is a fan project made with love for DDLC. We're not affiliated with Team Salvato, but we hope they'd be proud of how we're helping students stay productive! Just remember - no breaking the fourth wall here... probably.

*Happy Studying!*
~ Your Club President 💚

## Known Issues & Future Plans 🔧

### Current Issues 🐛
- **Menu Animation**: Landing page menu transitions need smoother arc-based animations
- **Audio Transitions**: Background music transitions could be smoother between pages
- **Mobile Responsiveness**: Some UI elements need better mobile adaptation
- **Loading States**: Need more consistent loading indicators across the app

### Future Features 🌟
#### Advanced Chat System
- **AI-Powered Character Interactions**:
  - Individual personality models for each Doki
  - Context-aware responses based on study habits
  - Memory of past conversations and progress
  - Character-specific writing styles and quirks

#### Enhanced Privacy & Security
- **Message Encryption**: End-to-end encryption for chat messages
- **Data Privacy**: Advanced anonymization of user study data
- **Customizable Privacy Settings**: Granular control over data sharing

#### UI/UX Improvements
- **Dynamic Backgrounds**: Character-specific animated backgrounds
- **Improved Menu Animations**: Smooth, arc-based menu transitions
- **Advanced Statistics**: Detailed visual analytics of study patterns
- **Achievement System**: Unlock special character interactions and themes

#### Companion Features
- **Study Recommendations**: Personalized study tips from each character
- **Mood Detection**: Adaptive responses based on user interaction patterns
- **Custom Study Plans**: Character-guided study scheduling
- **Social Features**: Optional study group formation with shared stats

### In Development 🚧
- AI chat integration with character-specific personalities
- Enhanced animation system for menu transitions
- Improved data security measures
- Mobile-first responsive design updates

*Want to help with any of these? Check out our Contributing guidelines!*