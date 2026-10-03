import React, { useState, useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getColors = () => {
    switch(type) {
      case 'success': return { bg: '#10b981', color: '#fff' };
      case 'error': return { bg: '#ef4444', color: '#fff' };
      case 'warning': return { bg: '#f59e0b', color: '#fff' };
      default: return { bg: '#3b82f6', color: '#fff' };
    }
  };

  const { bg, color } = getColors();

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: bg,
      color: color,
      padding: '12px 24px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      animation: 'slideIn 0.3s ease-out'
    }}>
      {message}
      <button onClick={onClose} style={{ color: '#fff', marginLeft: 'auto', background:'none', border:'none', cursor:'pointer' }}>✕</button>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Toast;
