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
          className={`btn ${selected === cat ? 'btn-primary' : 'btn-outline'}`}
          style={{ whiteSpace: 'nowrap', borderRadius: '20px' }}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
