import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Globe, ShoppingBag, Moon, Sun } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LocationSelector from './LocationSelector';

const Navbar = ({ onOpenAuth, onSearch }) => {
  const { totalItems, total, openCart } = useCart();
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('apnabazar_theme') || 'light');
  const [searchVal, setSearchVal] = useState('');
  const lang = localStorage.getItem('apnabazar_lang') || 'en';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('apnabazar_theme', next);
  };

  const toggleLang = () => {
    localStorage.setItem('apnabazar_lang', lang === 'en' ? 'hi' : 'en');
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchVal);
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        {/* Logo */}
        <Link to="/" className="logo">
          Apna<span>Bazar</span>
        </Link>

        {/* Location Selector */}
        <div className="hide-mobile">
          <LocationSelector />
        </div>

        {/* Search Bar */}
        <form className="search-bar" onSubmit={handleSearch} style={{ flex: 1, maxWidth: '480px' }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder={lang === 'hi' ? 'सब्ज़ी, दाल, दूध खोजें...' : 'Search for veggies, dal, milk...'}
            value={searchVal}
            onChange={e => { setSearchVal(e.target.value); if (onSearch) onSearch(e.target.value); }}
          />
        </form>

        {/* Actions */}
        <div className="nav-actions">
          {/* Dark Mode Toggle */}
          <button className="btn btn-ghost" onClick={toggleTheme} title="Toggle theme">
            {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
          </button>

          {/* Language Toggle */}
          <button className="btn btn-outline" onClick={toggleLang} style={{ fontSize: '13px', padding: '7px 12px' }}>
            <Globe size={15} /> {lang === 'en' ? 'हिं' : 'EN'}
          </button>

          {/* Owner Panel */}
          <Link to="/owner" className="btn btn-outline hide-mobile" style={{ fontSize: '13px', padding: '7px 12px' }}>
            Owner Panel
          </Link>

          {/* My Orders (logged in customers) */}
          {user && user.role !== 'owner' && (
            <Link to="/orders" className="btn btn-outline hide-mobile" style={{ fontSize: '13px', padding: '7px 12px' }}>
              <ShoppingBag size={15} /> Orders
            </Link>
          )}

          {/* Login / Logout */}
          {user ? (
            <button className="btn btn-ghost" onClick={logout} style={{ fontSize: '13px' }}>
              <User size={17} /> {user.name.split(' ')[0]}
            </button>
          ) : (
            <button className="btn btn-outline" onClick={onOpenAuth} style={{ fontSize: '13px', padding: '7px 14px' }}>
              <User size={15} /> Sign In
            </button>
          )}

          {/* Cart */}
          <button className="cart-btn" onClick={openCart}>
            <ShoppingCart size={19} />
            {totalItems > 0 ? (
              <>
                <span className="cart-badge">{totalItems}</span>
                <span className="hide-mobile" style={{ fontSize: '14px' }}>₹{total.toFixed(0)}</span>
              </>
            ) : (
              <span className="hide-mobile" style={{ fontSize: '14px' }}>Cart</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
