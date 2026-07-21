import React, { useRef, useEffect } from 'react';
import { Copy, Trash2, Sparkles } from 'lucide-react';
import { SAMPLE_POSTS } from '../utils/constants';

export const PostTextarea = ({
  text,
  onChange,
  onClear,
  onCopy,
  onSelectSample
}) => {
  const textareaRef = useRef(null);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(160, textareaRef.current.scrollHeight)}px`;
    }
  }, [text]);

  return (
    <div className="textarea-wrapper">
      <div className="section-header">
        <h2 className="section-title">
          <span>Post Content</span>
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="action-btn-sm"
            onClick={onCopy}
            title="Copy to Clipboard"
            aria-label="Copy post text to clipboard"
          >
            <Copy size={14} />
            <span>Copy</span>
          </button>
          <button
            className="action-btn-sm action-btn-danger"
            onClick={onClear}
            title="Clear Text (Ctrl + Backspace)"
            aria-label="Clear composer text"
          >
            <Trash2 size={14} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        className="composer-textarea"
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What's happening? Compose your post here... Use hashtags #likeThis and emojis 😊"
        aria-label="Social media post content input"
      />

      <div className="textarea-actions-bar">
        <div className="samples-dropdown-row">
          <span className="chips-label" style={{ alignSelf: 'center' }}>
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            Try Sample:
          </span>
          {SAMPLE_POSTS.map((sample, idx) => (
            <button
              key={idx}
              className="action-btn-sm"
              onClick={() => onSelectSample(sample.text)}
              title={sample.label}
            >
              {sample.label.split(' ')[0]} {sample.label.includes('Hashtag') ? '#Hashtag' : sample.label.includes('Emoji') ? 'Emoji' : 'Sample'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
