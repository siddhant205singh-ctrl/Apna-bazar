import React from 'react';

const CATEGORIES = [
  'All',
  'Fruits & Veg',
  'Dairy & Bakery',
  'Atta/Rice/Dals',
  'Snacks',
  'Beverages',
  'Household'
];

const CategoryTabs = ({ selected, onSelect }) => {
  return (
    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '16px 0', scrollbarWidth: 'none' }}>
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          className={`btn ${selected === cat ? 'btn-primary' : ''}`}
          style={{ 
            whiteSpace: 'nowrap', 
            borderRadius: '24px', 
            padding: '8px 20px',
            background: selected === cat ? 'var(--primary)' : 'var(--card-bg)',
            color: selected === cat ? '#fff' : 'var(--text-main)',
            border: `1px solid ${selected === cat ? 'var(--primary)' : 'var(--border-color)'}`,
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.3s ease'
          }}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
