import React from 'react';
import { PlatformSelector } from './PlatformSelector';
import { PostTextarea } from './PostTextarea';
import { CharacterCounter } from './CharacterCounter';
import { CountersBar } from './CountersBar';
import { ValidationPanel } from './ValidationPanel';
import { PublishButton } from './PublishButton';

export const PostComposer = ({
  text,
  setText,
  selectedPlatforms,
  onTogglePlatform,
  onSelectAll,
  onClearAll,
  onClearText,
  onSamplePost,
  onCopy,
  onPublish,
  validation
}) => {
  return (
    <div className="card-glass composer-card">
      {/* Target Platforms Selection */}
      <PlatformSelector
        selectedPlatforms={selectedPlatforms}
        onTogglePlatform={onTogglePlatform}
        onSelectAll={onSelectAll}
        onClearAll={onClearAll}
      />

      {/* Main Post Text Area */}
      <PostTextarea
        text={text}
        onChange={setText}
        onClear={onClearText}
        onCopy={onCopy}
        onSelectSample={onSamplePost}
      />

      {/* Live Character Limit Counter & Progress Bar */}
      <CharacterCounter validation={validation} />

      {/* Word, Hashtag, Emoji Counters */}
      <CountersBar validation={validation} />

      {/* Live Validation Alerts & Status Messages */}
      <ValidationPanel validation={validation} />

      {/* Primary Action Button */}
      <PublishButton
        isPublishable={validation.isPublishable}
        onPublish={onPublish}
      />
    </div>
  );
};
