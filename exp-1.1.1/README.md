# Dynamic Multi-Platform Social Media Post Composer (`exp-1.1.1`)

A production-quality, responsive React.js web application designed to compose social media posts with dynamic, real-time validation across multiple platforms (Twitter/X, Facebook, LinkedIn, and Instagram).

Built for Full Stack Web Development assignments and practicals, emphasizing clean modular code, reusable functional components, custom hooks, and dynamic glassmorphism UI styling.

---

## 🌟 Key Features

1. **Multi-Platform Validation Engine**:
   - Supports **Twitter (X)**, **Facebook**, **LinkedIn**, and **Instagram**.
   - Calculates the **effective character limit** as the minimum limit among all currently selected platforms.
   - Centralized rule definitions in `src/utils/constants.js` — no hardcoded magic numbers.

2. **Live Character & Metric Counters**:
   - Dynamic progress bar with status color states:
     - 🟢 **Green**: Below 80% usage
     - 🟠 **Orange**: 80%–100% usage
     - 🔴 **Red**: Exceeded character limit
   - Real-time **Word Counter**, **Hashtag Counter**, and **Emoji Counter**.

3. **Real-Time Validation Alerts**:
   - **Twitter**: Warns if more than 5 hashtags are used.
   - **LinkedIn**: Warns if more than 3 emojis are used (for professional tone).
   - **Instagram**: Prompts user if no hashtags are included.
   - **General**: Character limit warnings & errors, empty text detection, and missing platform selection alerts.

4. **Live Social Feed Preview**:
   - Visual mock preview card showing post text with hashtag highlighting.
   - Allows switching tabs between target platforms.
   - Shows user handle, timestamp, character count, and real-time validation badge.

5. **Aesthetics & UI Components**:
   - Modern glassmorphism UI with gradient headers, rounded cards, and smooth hover micro-animations.
   - Dark/Light Theme toggle with persistence via `localStorage`.
   - Auto-resizing textarea for seamless input.
   - Copy to Clipboard button & Clear button.
   - Quick-load Sample Posts to easily test and demonstrate validation rules.

6. **Keyboard Shortcuts**:
   - `Ctrl + Enter`: Publish post (when valid)
   - `Ctrl + Backspace`: Clear post composer

---

## 📂 Project Structure

```
exp-1.1.1/
├── package.json
├── vite.config.js
├── index.html
├── README.md
└── src/
    ├── components/
    │   ├── Header.jsx              # App header with dark mode & shortcut modals
    │   ├── PlatformSelector.jsx    # Target platform checkboxes & chips
    │   ├── PlatformChip.jsx        # Selected platform badges
    │   ├── PostTextarea.jsx        # Auto-resizing text input & action buttons
    │   ├── CharacterCounter.jsx    # Dynamic character limit & progress bar
    │   ├── CountersBar.jsx         # Word, Hashtag, and Emoji counters
    │   ├── ValidationPanel.jsx     # Live error, warning, and success alerts
    │   ├── PreviewCard.jsx         # Interactive social feed preview card
    │   ├── PublishButton.jsx       # Validation-guarded publish button
    │   ├── PostComposer.jsx        # Main composer container component
    │   └── Toast.jsx               # Notification toast component
    ├── hooks/
    │   └── useValidation.js        # Custom hook managing state & validation
    ├── utils/
    │   ├── constants.js            # Platform rules, metadata & sample posts
    │   └── validation.js           # Text analysis & validation logic
    ├── styles/
    │   ├── index.css               # Global theme variables & resets
    │   └── App.css                 # Glassmorphism & component layouts
    ├── App.jsx                     # Main application layout
    └── main.jsx                    # React DOM entry point
```

---

## ⚙️ Platform Validation Rules Summary

| Platform | Max Characters | Special Validation Rule |
| :--- | :--- | :--- |
| **Twitter (X)** | 280 | ⚠️ Warning if hashtags > 5 |
| **Facebook** | 63,206 | Standard character limit check |
| **LinkedIn** | 3,000 | ⚠️ Warning if emojis > 3 |
| **Instagram** | 2,200 | ⚠️ Suggests at least 1 hashtag |

> **Note**: When multiple platforms are selected, the allowed limit equals `min(selected platforms maxChars)`.
> *Example*: Twitter (280) + LinkedIn (3000) = **Effective limit: 280 characters**.

---

## 🚀 Setup & Execution Instructions

1. **Navigate to project directory**:
   ```bash
   cd exp-1.1.1
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 💻 Tech Stack

- **Framework**: React.js 18
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Styling**: Modern Vanilla CSS with CSS Custom Properties (Variables)
