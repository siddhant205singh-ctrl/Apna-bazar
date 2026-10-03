import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Globe, ShoppingBag, Moon, Sun } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenAuth }) => {
  const { totalItems, total, openCart } = useCart();
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('apnabazar_theme') || 'light');
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleLang = () => {
    const curr = localStorage.getItem('apnabazar_lang') || 'en';
    localStorage.setItem('apnabazar_lang', curr === 'en' ? 'hi' : 'en');
    window.location.reload();
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('apnabazar_theme', nextTheme);
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">Apna Bazar</Link>
        
        <div className="search-bar hide-mobile">
          <Search size={20} color="#64748b" />
          <input type="text" placeholder="Search for groceries..." />
        </div>

        <div className="nav-actions">
          <button className="btn btn-outline" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <button className="btn btn-outline" onClick={toggleLang}>
            <Globe size={18} /> EN/HI
          </button>
          
          <Link to="/owner" className="btn btn-outline">Store Owner?</Link>
          
          {user && user.role !== 'owner' && (
            <Link to="/orders" className="btn btn-primary" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <ShoppingBag size={18} /> My Orders
            </Link>
          )}

          {user ? (
            <div className="dropdown relative">
              <button className="btn" onClick={logout}>
                <User size={20} /> Logout ({user.name})
              </button>
            </div>
          ) : (
            <button className="btn" onClick={onOpenAuth}>
              <User size={20} /> Login
            </button>
          )}

          <button className="cart-btn" onClick={openCart}>
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <>
                <span className="cart-badge">{totalItems}</span>
                <span>₹{total.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
