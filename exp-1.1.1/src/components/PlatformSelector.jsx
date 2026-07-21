import React from 'react';
import { Check, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';
import { PLATFORM_RULES } from '../utils/constants';
import { PlatformChip } from './PlatformChip';

const ICON_MAP = {
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
  instagram: Instagram
};

export const PlatformSelector = ({
  selectedPlatforms,
  onTogglePlatform,
  onSelectAll,
  onClearAll
}) => {
  const allPlatformIds = Object.keys(PLATFORM_RULES);
  const isAllSelected = selectedPlatforms.length === allPlatformIds.length;

  return (
    <div className="platform-selector-section">
      <div className="section-header">
        <h2 className="section-title">
          <span>Target Platforms</span>
          <span className="counter-limit-label">({selectedPlatforms.length} selected)</span>
        </h2>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="section-action-link"
            onClick={() => (isAllSelected ? onClearAll() : onSelectAll(allPlatformIds))}
          >
            {isAllSelected ? 'Clear All' : 'Select All'}
          </button>
        </div>
      </div>

      <div className="platform-grid" role="group" aria-label="Select target social platforms">
        {Object.values(PLATFORM_RULES).map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          const Icon = ICON_MAP[platform.id] || Twitter;

          return (
            <button
              key={platform.id}
              type="button"
              className={`platform-card-btn ${isSelected ? 'selected' : ''}`}
              style={{ '--platform-color': platform.color }}
              onClick={() => onTogglePlatform(platform.id)}
              aria-pressed={isSelected}
              aria-label={`Toggle ${platform.name}`}
            >
              <div
                className="platform-icon-wrapper"
                style={{ backgroundColor: platform.color }}
              >
                <Icon size={18} />
              </div>
              <div className="platform-info">
                <span className="platform-name">{platform.name}</span>
                <span className="platform-limit">{platform.maxChars.toLocaleString()} chars</span>
              </div>
              <div className="platform-checkbox">
                {isSelected && <Check size={13} strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>

      {selectedPlatforms.length > 0 && (
        <div className="chips-container" style={{ marginTop: '1rem' }}>
          <span className="chips-label">Active:</span>
          {selectedPlatforms.map((id) => (
            <PlatformChip key={id} platformId={id} onRemove={onTogglePlatform} />
          ))}
        </div>
      )}
    </div>
  );
};
