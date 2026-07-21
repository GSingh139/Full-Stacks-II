import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PostComposer } from './components/PostComposer';
import { PreviewCard } from './components/PreviewCard';
import { Toast } from './components/Toast';
import { useValidation } from './hooks/useValidation';
import { KEYBOARD_SHORTCUTS } from './utils/constants';
import { X, Keyboard } from 'lucide-react';
import './styles/index.css';
import './styles/App.css';

export function App() {
  const {
    text,
    setText,
    selectedPlatforms,
    togglePlatform,
    selectAllPlatforms,
    clearPlatforms,
    darkMode,
    toggleDarkMode,
    toast,
    hideToast,
    clearText,
    handleSamplePost,
    copyToClipboard,
    publishPost,
    validation
  } = useValidation('', ['twitter', 'linkedin']);

  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  // Keyboard shortcut handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + Enter -> Publish
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        publishPost();
      }
      // Ctrl + Backspace -> Clear composer
      if ((e.ctrlKey || e.metaKey) && e.key === 'Backspace') {
        e.preventDefault();
        clearText();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [publishPost, clearText]);

  return (
    <div className="app-container">
      <Header
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenShortcuts={() => setShowShortcutsModal(true)}
      />

      <main className="app-main">
        <div className="composer-grid">
          {/* Left Column: Post Composer */}
          <PostComposer
            text={text}
            setText={setText}
            selectedPlatforms={selectedPlatforms}
            onTogglePlatform={togglePlatform}
            onSelectAll={selectAllPlatforms}
            onClearAll={clearPlatforms}
            onClearText={clearText}
            onSamplePost={handleSamplePost}
            onCopy={copyToClipboard}
            onPublish={publishPost}
            validation={validation}
          />

          {/* Right Column: Live Feed Preview */}
          <div className="preview-column">
            <PreviewCard
              text={text}
              selectedPlatforms={selectedPlatforms}
              validation={validation}
            />
          </div>
        </div>
      </main>

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={hideToast} />

      {/* Keyboard Shortcuts Modal */}
      {showShortcutsModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowShortcutsModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard Shortcuts"
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Keyboard size={20} color="var(--primary-500)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Keyboard Shortcuts</h3>
              </div>
              <button
                className="action-btn-sm"
                onClick={() => setShowShortcutsModal(false)}
                aria-label="Close shortcuts modal"
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {KEYBOARD_SHORTCUTS.map((sc, idx) => (
                <div key={idx} className="shortcut-row">
                  <span>{sc.description}</span>
                  <span className="kbd-badge">{sc.keys}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
