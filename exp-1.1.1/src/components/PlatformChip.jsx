import React from 'react';
import { X, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';
import { PLATFORM_RULES } from '../utils/constants';

const ICON_MAP = {
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
  instagram: Instagram
};

export const PlatformChip = ({ platformId, onRemove }) => {
  const platform = PLATFORM_RULES[platformId];
  if (!platform) return null;

  const Icon = ICON_MAP[platformId] || Twitter;

  return (
    <span
      className="chip"
      style={{
        backgroundColor: platform.bgBadge,
        color: platform.color,
        border: `1px solid ${platform.borderBadge}`
      }}
      aria-label={`Selected platform: ${platform.name}`}
    >
      <Icon size={13} />
      <span>{platform.name}</span>
      {onRemove && (
        <button
          className="chip-remove-btn"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(platformId);
          }}
          title={`Remove ${platform.name}`}
          aria-label={`Remove ${platform.name}`}
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
};
