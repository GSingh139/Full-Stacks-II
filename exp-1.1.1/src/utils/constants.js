/**
 * Platform validation rules as specified in the assignment.
 * Centralized configuration - DO NOT hardcode these values across the app.
 */
export const PLATFORM_RULES = {
  twitter: {
    id: 'twitter',
    name: 'Twitter (X)',
    handle: '@yourusername',
    maxChars: 280,
    maxHashtags: 5,
    color: '#1DA1F2',
    accentClass: 'platform-twitter',
    bgBadge: 'rgba(29, 161, 242, 0.12)',
    borderBadge: 'rgba(29, 161, 242, 0.3)',
    iconName: 'Twitter'
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Your Page',
    maxChars: 63206,
    color: '#1877F2',
    accentClass: 'platform-facebook',
    bgBadge: 'rgba(24, 119, 242, 0.12)',
    borderBadge: 'rgba(24, 119, 242, 0.3)',
    iconName: 'Facebook'
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Your Name • Full Stack Developer',
    maxChars: 3000,
    maxEmojis: 3,
    color: '#0A66C2',
    accentClass: 'platform-linkedin',
    bgBadge: 'rgba(10, 102, 194, 0.12)',
    borderBadge: 'rgba(10, 102, 194, 0.3)',
    iconName: 'Linkedin'
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    handle: 'your.insta.feed',
    maxChars: 2200,
    requireHashtag: true,
    color: '#E4405F',
    accentClass: 'platform-instagram',
    bgBadge: 'rgba(228, 64, 95, 0.12)',
    borderBadge: 'rgba(228, 64, 95, 0.3)',
    iconName: 'Instagram'
  }
};

/**
 * List of sample posts for quick demonstration and testing of validation rules.
 */
export const SAMPLE_POSTS = [
  {
    label: 'Valid Multi-Platform Post',
    text: 'Excited to announce the launch of our new open-source React application! 🚀 Built with modular architecture, live validation, and modern glassmorphism UI design. Check it out and let us know your feedback! #reactjs #webdev #tech'
  },
  {
    label: 'Too Many Hashtags (Triggers Twitter warning)',
    text: 'Exploring the latest web development trends for 2026! 💡 #javascript #reactjs #frontend #webdev #coding #software #tech #innovation'
  },
  {
    label: 'Too Many Emojis (Triggers LinkedIn warning)',
    text: 'Big news! 🎉🔥✨🚀 Celebrated a major milestone with the engineering team today! 🏆🥳🎈'
  },
  {
    label: 'No Hashtags (Triggers Instagram requirement)',
    text: 'Just finished a productive coding session. Loving how responsive and smooth this custom design system feels!'
  }
];

export const KEYBOARD_SHORTCUTS = [
  { keys: 'Ctrl + Enter', description: 'Publish post (when valid)' },
  { keys: 'Ctrl + Backspace', description: 'Clear composer text' }
];
