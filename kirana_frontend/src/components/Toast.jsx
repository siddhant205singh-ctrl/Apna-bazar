import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const icons = {
  success: <CheckCircle size={18} />,
  error:   <XCircle size={18} />,
  warning: <AlertCircle size={18} />,
  info:    <Info size={18} />,
};

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`} onClick={onClose} style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
      {icons[type]}
      <span style={{ flex: 1 }}>{message}</span>
      <X size={16} style={{ opacity: 0.7 }} />
    </div>
  );
};

export default Toast;
