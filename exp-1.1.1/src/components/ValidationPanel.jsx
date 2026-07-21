import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export const ValidationPanel = ({ validation }) => {
  const { errors, warnings, isPublishable } = validation;

  return (
    <div className="validation-panel" role="region" aria-label="Live Validation Feedback">
      {/* Ready to publish badge */}
      {isPublishable && (
        <div className="validation-item success">
          <CheckCircle2 size={18} className="validation-icon" />
          <div>
            <strong>Ready to publish!</strong> All platform validation checks passed cleanly.
          </div>
        </div>
      )}

      {/* Errors list */}
      {errors.map((item, index) => (
        <div key={`err-${index}`} className="validation-item error">
          <AlertCircle size={18} className="validation-icon" />
          <div>{item.message}</div>
        </div>
      ))}

      {/* Warnings list */}
      {warnings.map((item, index) => (
        <div
          key={`warn-${index}`}
          className={`validation-item ${item.type === 'info' ? 'info' : 'warning'}`}
        >
          {item.type === 'info' ? (
            <Info size={18} className="validation-icon" />
          ) : (
            <AlertTriangle size={18} className="validation-icon" />
          )}
          <div>{item.message}</div>
        </div>
      ))}
    </div>
  );
};
