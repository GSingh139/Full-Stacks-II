import React from 'react';
import { Sun, Moon, Sparkles, Keyboard } from 'lucide-react';

export const Header = ({ darkMode, onToggleDarkMode, onOpenShortcuts }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-title-group">
          <div className="header-icon-badge" aria-hidden="true">
            <Sparkles size={26} color="#ffffff" />
          </div>
          <div>
            <h1 className="header-title">Social Media Composer</h1>
            <p className="header-subtitle">Dynamic Multi-Platform Real-Time Validator</p>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="shortcut-toggle-btn"
            onClick={onOpenShortcuts}
            title="Keyboard Shortcuts"
            aria-label="View Keyboard Shortcuts"
          >
            <Keyboard size={18} />
            <span className="hide-mobile">Shortcuts</span>
          </button>

          <button
            className="theme-toggle-btn"
            onClick={onToggleDarkMode}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#cbd5e1" />}
            <span className="hide-mobile">{darkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
