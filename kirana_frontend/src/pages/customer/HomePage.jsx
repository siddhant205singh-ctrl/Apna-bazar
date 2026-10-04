import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import CategoryTabs from '../../components/CategoryTabs';
import ProductCard from '../../components/ProductCard';
import CartDrawer from './CartDrawer';
import AuthModal from './AuthModal';
import CheckoutModal from './CheckoutModal';
import ProductDetailModal from './ProductDetailModal';
import Toast from '../../components/Toast';
import api from '../../api/api';
import { useCart } from '../../context/CartContext';

const catMap = {
  'Fruits & Veg': 'fruits-veg',
  'Dairy & Bakery': 'dairy',
  'Atta/Rice/Dals': 'staples',
  'Snacks': 'snacks',
  'Beverages': 'beverages',
  'Household': 'household',
};

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { totalItems } = useCart();

  useEffect(() => { fetchProducts(); }, [category, search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== 'All') params.category = catMap[category] || category.toLowerCase();
      if (search) params.search = search;
      const res = await api.get('/products', { params });
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
      showToast('Could not load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type) => setToast({ message, type });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-color)' }}>

      {/* Announcement Bar */}
      <div className="announcement-bar">
        ⚡ Delivered in 15 Minutes — Free delivery on orders above ₹299!
      </div>

      <Navbar onOpenAuth={() => setAuthOpen(true)} onSearch={setSearch} />

      <main className="container" style={{ flexGrow: 1, padding: '24px 20px 48px' }}>

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-bg-pattern" />
          <div className="hero-content">
            <div className="hero-badge">⚡ 15-min delivery</div>
            <h1 className="hero-title">
              Fresh Groceries,<br />Apni Dukan Se.
            </h1>
            <p className="hero-subtitle">
              From your neighbourhood kirana to your doorstep — faster than ever.
            </p>
            <button
              className="btn btn-accent"
              style={{ padding: '12px 28px', fontSize: '16px', borderRadius: '12px' }}
              onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}
            >
              Shop Now →
            </button>
          </div>
          <div className="hero-emoji hide-mobile">🛒</div>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: '8px' }}>
          <div className="section-header">
            <div>
              <div className="section-title">Shop by Category</div>
            </div>
          </div>
          <CategoryTabs selected={category} onSelect={setCategory} />
        </div>

        {/* Products Section */}
        <div id="products-section">
          <div className="section-header" style={{ marginBottom: '16px' }}>
            <div>
              <div className="section-title">
                {category === 'All' ? 'All Products' : category}
              </div>
              <div className="section-subtitle">{loading ? 'Loading...' : `${products.length} items`}</div>
            </div>
          </div>

          {loading ? (
            /* Skeleton Loading */
            <div className="products-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{
                  background: 'var(--card-bg)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}>
                  <div style={{ height: '180px', background: 'var(--input-bg)' }} />
                  <div style={{ padding: '14px' }}>
                    <div style={{ height: '12px', background: 'var(--input-bg)', borderRadius: '6px', marginBottom: '8px', width: '60%' }} />
                    <div style={{ height: '16px', background: 'var(--input-bg)', borderRadius: '6px', marginBottom: '12px' }} />
                    <div style={{ height: '32px', background: 'var(--input-bg)', borderRadius: '8px' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🔍</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
                No products found
              </div>
              <div style={{ fontSize: '14px' }}>
                {search ? `No results for "${search}"` : 'No products in this category yet'}
              </div>
            </div>
          ) : (
            <div className="products-grid">
              {products.map(p => (
                <ProductCard key={p._id} product={p} onClick={setSelectedProduct} />
              ))}
            </div>
          )}
        </div>

      </main>

      {/* Modals & Drawers */}
      <CartDrawer onCheckout={() => setCheckoutOpen(true)} onAuth={() => setAuthOpen(true)} />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} showToast={showToast} />}
      {checkoutOpen && <CheckoutModal onClose={() => setCheckoutOpen(false)} showToast={showToast} />}
      {selectedProduct && <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default HomePage;
