import React from 'react';

const StatusBadge = ({ status }) => {
  const getStyles = () => {
    switch(status?.toLowerCase()) {
      case 'pending': return { bg: '#fff7ed', color: '#c2410c' }; // orange
      case 'accepted': return { bg: '#eff6ff', color: '#1d4ed8' }; // blue
      case 'preparing': return { bg: '#f5f3ff', color: '#6d28d9' }; // purple
      case 'out for delivery': return { bg: '#ecfeff', color: '#0e7490' }; // cyan
      case 'delivered': return { bg: '#f0fdf4', color: '#15803d' }; // green
      case 'rejected': return { bg: '#fef2f2', color: '#b91c1c' }; // red
      default: return { bg: '#f1f5f9', color: '#475569' };
    }
  };

  const { bg, color } = getStyles();

  return (
    <span style={{
      backgroundColor: bg,
      color: color,
      padding: '4px 12px',
      borderRadius: '999px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'capitalize'
    }}>
      {status}
    </span>
  );
};

export default StatusBadge;
