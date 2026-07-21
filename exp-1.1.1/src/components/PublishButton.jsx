import React from 'react';
import { Send } from 'lucide-react';

export const PublishButton = ({ isPublishable, onPublish }) => {
  return (
    <div className="action-area">
      <button
        type="button"
        className="publish-btn"
        disabled={!isPublishable}
        onClick={onPublish}
        title={isPublishable ? 'Publish post (Ctrl + Enter)' : 'Fix validation issues to enable publish'}
        aria-label="Publish Social Media Post"
      >
        <Send size={20} />
        <span>Publish Post</span>
      </button>
    </div>
  );
};
