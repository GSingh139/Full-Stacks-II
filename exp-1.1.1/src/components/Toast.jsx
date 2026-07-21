import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const { message, type } = toast;

  const Icon =
    type === 'success'
      ? CheckCircle2
      : type === 'warning'
      ? AlertTriangle
      : type === 'error'
      ? AlertCircle
      : Info;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className={`toast-box ${type}`}>
        <Icon size={20} />
        <span>{message}</span>
        <button
          className="toast-close-btn"
          onClick={onClose}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
