import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Users, ShoppingBag, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const OwnerSidebar = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => pathname === path ? 'active' : '';

  return (
    <aside className="owner-sidebar">
      <div className="sidebar-logo">
        Apna Bazar <span style={{fontSize:'12px', color:'var(--text-muted)'}}>Owner</span>
      </div>
      <nav className="sidebar-nav" style={{ flexGrow: 1 }}>
        <Link to="/owner/dashboard" className={`sidebar-link ${isActive('/owner/dashboard')}`}>
          <Home size={18} /> Dashboard
        </Link>
        <Link to="/owner/orders" className={`sidebar-link ${isActive('/owner/orders')}`}>
          <ShoppingBag size={18} /> Orders
        </Link>
        <Link to="/owner/products" className={`sidebar-link ${isActive('/owner/products')}`}>
          <Package size={18} /> Products
        </Link>
        <Link to="/owner/customers" className={`sidebar-link ${isActive('/owner/customers')}`}>
          <Users size={18} /> Customers
        </Link>
      </nav>
      <div className="sidebar-nav">
        <Link to="/" className="sidebar-link" style={{ color: 'var(--primary)' }}>
          <ExternalLink size={18} /> Go to Storefront
        </Link>
        <button onClick={logout} className="sidebar-link" style={{ width: '100%', textAlign: 'left', color: 'var(--danger)' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default OwnerSidebar;
