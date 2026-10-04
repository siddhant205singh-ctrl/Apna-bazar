import React from 'react';

const CATEGORIES = [
  { id: 'All',        emoji: '🏠', label: 'All' },
  { id: 'Fruits & Veg', emoji: '🥦', label: 'Fruits & Veg' },
  { id: 'Dairy & Bakery', emoji: '🥛', label: 'Dairy' },
  { id: 'Atta/Rice/Dals', emoji: '🌾', label: 'Staples' },
  { id: 'Snacks',     emoji: '🍿', label: 'Snacks' },
  { id: 'Beverages',  emoji: '🥤', label: 'Drinks' },
  { id: 'Household',  emoji: '🧹', label: 'Household' },
];

const CategoryTabs = ({ selected, onSelect }) => {
  return (
    <div className="category-scroll">
      {CATEGORIES.map(cat => (
        <button
          key={cat.id}
          className={`category-pill ${selected === cat.id ? 'active' : ''}`}
          onClick={() => onSelect(cat.id)}
        >
          <span className="pill-emoji">{cat.emoji}</span>
          <span className="pill-label">{cat.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
