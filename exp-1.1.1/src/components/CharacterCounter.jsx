import React from 'react';
import { AlertTriangle, CheckCircle, AlertOctagon } from 'lucide-react';

export const CharacterCounter = ({ validation }) => {
  const { charCount, effectiveLimit, remainingChars, percentUsed, statusColor } = validation;

  const boundedPercent = Math.min(100, Math.max(0, percentUsed));

  const StatusIcon =
    statusColor === 'red' ? AlertOctagon : statusColor === 'orange' ? AlertTriangle : CheckCircle;

  return (
    <div className="counter-box">
      <div className="counter-stats-header">
        <div>
          <div className="counter-main-val">
            <span>{charCount.toLocaleString()}</span>
            <span className="counter-limit-label">/ {effectiveLimit.toLocaleString()}</span>
          </div>
          <span className="counter-limit-label">Effective Character Limit</span>
        </div>

        <div className={`counter-remaining-badge ${statusColor}`}>
          <StatusIcon size={15} />
          <span>
            {remainingChars < 0
              ? `${Math.abs(remainingChars).toLocaleString()} over limit`
              : `${remainingChars.toLocaleString()} remaining`}
          </span>
        </div>
      </div>

      <div className="progress-track" aria-label="Character limit progress bar">
        <div
          className={`progress-fill ${statusColor}`}
          style={{ width: `${boundedPercent}%` }}
        />
      </div>
    </div>
  );
};
