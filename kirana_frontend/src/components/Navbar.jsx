import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenAuth }) => {
  const { totalItems, total, openCart } = useCart();
  const { user, logout } = useAuth();
  
  const toggleLang = () => {
    const curr = localStorage.getItem('apnabazar_lang') || 'en';
    localStorage.setItem('apnabazar_lang', curr === 'en' ? 'hi' : 'en');
    window.location.reload();
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
          <button className="btn btn-outline" onClick={toggleLang}>
            <Globe size={18} /> EN/HI
          </button>
          
          <Link to="/owner" className="btn btn-outline">Store Owner?</Link>
          
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
