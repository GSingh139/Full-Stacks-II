import { useState, useMemo, useEffect, useCallback } from 'react';
import { validatePost } from '../utils/validation';

export const useValidation = (initialText = '', initialPlatforms = ['twitter']) => {
  const [text, setText] = useState(initialText);
  const [selectedPlatforms, setSelectedPlatforms] = useState(initialPlatforms);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('composer_dark_mode');
    return saved !== null ? JSON.parse(saved) : true; // Default to sleek dark mode
  });
  const [toast, setToast] = useState(null);

  // Sync dark mode class with document tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('composer_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const togglePlatform = useCallback((platformId) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(platformId)) {
        return prev.filter((id) => id !== platformId);
      } else {
        return [...prev, platformId];
      }
    });
  }, []);

  const selectAllPlatforms = useCallback((platformIds) => {
    setSelectedPlatforms(platformIds);
  }, []);

  const clearPlatforms = useCallback(() => {
    setSelectedPlatforms([]);
  }, []);

  const clearText = useCallback(() => {
    setText('');
    showToast('Composer cleared', 'info');
  }, [showToast]);

  const handleSamplePost = useCallback((sampleText) => {
    setText(sampleText);
    showToast('Loaded sample post template', 'info');
  }, [showToast]);

  const copyToClipboard = useCallback(async () => {
    if (!text.trim()) {
      showToast('Nothing to copy!', 'warning');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      showToast('Post content copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy text', 'error');
    }
  }, [text, showToast]);

  // Compute live validation metrics memoized
  const validation = useMemo(() => {
    return validatePost(text, selectedPlatforms);
  }, [text, selectedPlatforms]);

  const publishPost = useCallback(() => {
    if (!validation.isPublishable) {
      showToast('Cannot publish due to validation issues or missing selection', 'error');
      return false;
    }

    const platformNames = selectedPlatforms.map(
      (p) => p.charAt(0).toUpperCase() + p.slice(1)
    ).join(', ');

    showToast(`🎉 Post published successfully to ${platformNames}!`, 'success');
    setText('');
    return true;
  }, [validation.isPublishable, selectedPlatforms, showToast]);

  return {
    text,
    setText,
    selectedPlatforms,
    setSelectedPlatforms,
    togglePlatform,
    selectAllPlatforms,
    clearPlatforms,
    darkMode,
    toggleDarkMode,
    toast,
    showToast,
    hideToast,
    clearText,
    handleSamplePost,
    copyToClipboard,
    publishPost,
    validation
  };
};
