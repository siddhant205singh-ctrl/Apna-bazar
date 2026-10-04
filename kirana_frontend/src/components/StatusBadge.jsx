import React from 'react';

const STATUS_MAP = {
  'pending':          { cls: 'status-pending',  emoji: '🕐' },
  'accepted':         { cls: 'status-accepted', emoji: '✅' },
  'preparing':        { cls: 'status-preparing',emoji: '👨‍🍳' },
  'out for delivery': { cls: 'status-delivery', emoji: '🛵' },
  'delivered':        { cls: 'status-delivered',emoji: '🎉' },
  'rejected':         { cls: 'status-rejected', emoji: '❌' },
};

const StatusBadge = ({ status }) => {
  const key = status?.toLowerCase() || '';
  const { cls = 'status-pending', emoji = '' } = STATUS_MAP[key] || {};
  return (
    <span className={`status-badge ${cls}`}>
      {emoji} {status}
    </span>
  );
};

export default StatusBadge;
