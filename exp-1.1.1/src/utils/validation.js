import { PLATFORM_RULES } from './constants';

/**
 * Counts the number of words in a text string.
 */
export const countWords = (text) => {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).length;
};

/**
 * Counts the number of hashtags (#tag) in a text string.
 */
export const countHashtags = (text) => {
  if (!text) return 0;
  // Match hashtag pattern: # followed by word characters or unicode letters
  const matches = text.match(/#[\w\u00C0-\u024F]+/g);
  return matches ? matches.length : 0;
};

/**
 * Counts the number of emojis in a text string using Unicode property escapes.
 */
export const countEmojis = (text) => {
  if (!text) return 0;
  try {
    const matches = text.match(/\p{Extended_Pictographic}/gu);
    return matches ? matches.length : 0;
  } catch (e) {
    // Fallback regex if Unicode property escapes are not supported
    const fallbackRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    const matches = text.match(fallbackRegex);
    return matches ? matches.length : 0;
  }
};

/**
 * Calculates the effective character limit based on selected platforms.
 * Effective limit is the minimum limit among all selected platforms.
 */
export const getEffectiveCharacterLimit = (selectedPlatformIds) => {
  if (!selectedPlatformIds || selectedPlatformIds.length === 0) {
    return 280; // Default fallback
  }

  const limits = selectedPlatformIds.map((id) => {
    const rule = PLATFORM_RULES[id];
    return rule ? rule.maxChars : Infinity;
  });

  return Math.min(...limits);
};

/**
 * Analyzes text against selected platform rules and returns comprehensive validation results.
 */
export const validatePost = (text = '', selectedPlatformIds = []) => {
  const charCount = text.length;
  const wordCount = countWords(text);
  const hashtagCount = countHashtags(text);
  const emojiCount = countEmojis(text);

  const effectiveLimit = getEffectiveCharacterLimit(selectedPlatformIds);
  const remainingChars = effectiveLimit - charCount;
  const percentUsed = effectiveLimit > 0 ? (charCount / effectiveLimit) * 100 : 0;

  // Color coding threshold: Green (<80%), Orange (80-100%), Red (>100%)
  let statusColor = 'green';
  if (percentUsed >= 100 || remainingChars < 0) {
    statusColor = 'red';
  } else if (percentUsed >= 80) {
    statusColor = 'orange';
  }

  const errors = [];
  const warnings = [];

  // General selection validation
  if (selectedPlatformIds.length === 0) {
    errors.push({
      id: 'no-platform',
      message: 'Select at least one social media platform to compose your post.',
      type: 'error'
    });
  }

  // Length limit validation
  if (charCount > effectiveLimit) {
    errors.push({
      id: 'char-limit-exceeded',
      message: `Character limit exceeded! (${charCount} / ${effectiveLimit})`,
      type: 'error'
    });
  }

  // Empty post check
  if (!text.trim() && selectedPlatformIds.length > 0) {
    warnings.push({
      id: 'empty-post',
      message: 'Post text is currently empty.',
      type: 'info'
    });
  }

  // Platform-specific validation rules
  selectedPlatformIds.forEach((platformId) => {
    const rule = PLATFORM_RULES[platformId];
    if (!rule) return;

    // Twitter Specific Rules
    if (platformId === 'twitter') {
      if (rule.maxHashtags && hashtagCount > rule.maxHashtags) {
        warnings.push({
          id: 'twitter-hashtags',
          message: `Too many hashtags for Twitter (X). Maximum ${rule.maxHashtags} recommended.`,
          type: 'warning',
          platform: 'twitter'
        });
      }
    }

    // LinkedIn Specific Rules
    if (platformId === 'linkedin') {
      if (rule.maxEmojis && emojiCount > rule.maxEmojis) {
        warnings.push({
          id: 'linkedin-emojis',
          message: `Too many emojis for LinkedIn. Maximum ${rule.maxEmojis} recommended for a professional tone.`,
          type: 'warning',
          platform: 'linkedin'
        });
      }
    }

    // Instagram Specific Rules
    if (platformId === 'instagram') {
      if (rule.requireHashtag && hashtagCount === 0 && text.trim().length > 0) {
        warnings.push({
          id: 'instagram-hashtag-req',
          message: 'Instagram post should include at least one hashtag for optimal reach.',
          type: 'warning',
          platform: 'instagram'
        });
      }
    }
  });

  const isPublishable =
    text.trim().length > 0 &&
    selectedPlatformIds.length > 0 &&
    charCount <= effectiveLimit &&
    errors.length === 0;

  return {
    charCount,
    wordCount,
    hashtagCount,
    emojiCount,
    effectiveLimit,
    remainingChars,
    percentUsed,
    statusColor,
    errors,
    warnings,
    isPublishable
  };
};
