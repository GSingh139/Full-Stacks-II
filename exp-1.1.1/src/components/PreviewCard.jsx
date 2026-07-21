import React, { useState } from 'react';
import { Eye, Calendar, Twitter, Facebook, Linkedin, Instagram, CheckCircle2, AlertCircle } from 'lucide-react';
import { PLATFORM_RULES } from '../utils/constants';

const ICON_MAP = {
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
  instagram: Instagram
};

export const PreviewCard = ({ text, selectedPlatforms, validation }) => {
  const [activeTab, setActiveTab] = useState(selectedPlatforms[0] || 'twitter');

  // Sync active tab if selected platforms change
  const currentTab = selectedPlatforms.includes(activeTab)
    ? activeTab
    : selectedPlatforms[0] || 'twitter';

  const currentPlatform = PLATFORM_RULES[currentTab] || PLATFORM_RULES.twitter;
  const PlatformIcon = ICON_MAP[currentTab] || Twitter;

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Highlight hashtags in post text
  const renderFormattedText = (content) => {
    if (!content) {
      return <span className="empty-preview-placeholder">Your post preview will appear here in real time...</span>;
    }

    const parts = content.split(/(#[\w\u00C0-\u024F]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <span key={index} style={{ color: currentPlatform.color, fontWeight: 700 }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="card-glass preview-card">
      <div className="preview-header">
        <h2 className="preview-title">
          <Eye size={18} color="var(--primary-500)" />
          <span>Live Social Feed Preview</span>
        </h2>

        {selectedPlatforms.length > 0 && (
          <div className="preview-platform-tabs">
            {selectedPlatforms.map((id) => (
              <button
                key={id}
                className={`preview-tab-btn ${currentTab === id ? 'active' : ''}`}
                onClick={() => setActiveTab(id)}
              >
                {PLATFORM_RULES[id]?.name.split(' ')[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mock Social Media Post UI */}
      <div className="mock-post-card">
        <div className="mock-user-info">
          <div className="avatar-circle">
            <span>U</span>
          </div>
          <div className="mock-user-details">
            <span className="mock-display-name">{currentPlatform.handle.split('•')[0]}</span>
            <span className="mock-handle-date">
              {currentPlatform.name} • {currentDateFormatted}
            </span>
          </div>
          <div style={{ marginLeft: 'auto', color: currentPlatform.color }}>
            <PlatformIcon size={20} />
          </div>
        </div>

        <div className="mock-post-body">{renderFormattedText(text)}</div>

        <div className="mock-post-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={13} />
            <span>{currentDateFormatted}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span>Count: <strong>{validation.charCount}</strong> chars</span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                color: validation.isPublishable ? 'var(--color-green)' : 'var(--color-orange)',
                fontWeight: 700
              }}
            >
              {validation.isPublishable ? (
                <>
                  <CheckCircle2 size={13} /> Valid
                </>
              ) : (
                <>
                  <AlertCircle size={13} /> Reviewing
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
