import React from 'react';
import { Type, Hash, Smile } from 'lucide-react';

export const CountersBar = ({ validation }) => {
  const { wordCount, hashtagCount, emojiCount } = validation;

  return (
    <div className="counters-bar">
      <div className="counter-mini-card">
        <div className="counter-mini-icon">
          <Type size={16} />
        </div>
        <div className="counter-mini-details">
          <span className="counter-mini-val">{wordCount.toLocaleString()}</span>
          <span className="counter-mini-title">Words</span>
        </div>
      </div>

      <div className="counter-mini-card">
        <div className="counter-mini-icon">
          <Hash size={16} />
        </div>
        <div className="counter-mini-details">
          <span className="counter-mini-val">{hashtagCount.toLocaleString()}</span>
          <span className="counter-mini-title">Hashtags</span>
        </div>
      </div>

      <div className="counter-mini-card">
        <div className="counter-mini-icon">
          <Smile size={16} />
        </div>
        <div className="counter-mini-details">
          <span className="counter-mini-val">{emojiCount.toLocaleString()}</span>
          <span className="counter-mini-title">Emojis</span>
        </div>
      </div>
    </div>
  );
};
