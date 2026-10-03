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

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  
  const [authOpen, setAuthOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== 'All') {
        const catMap = {
          'Fruits & Veg': 'fruits-veg',
          'Dairy & Bakery': 'dairy',
          'Atta/Rice/Dals': 'staples',
          'Snacks': 'snacks',
          'Beverages': 'beverages',
          'Household': 'household'
        };
        params.category = catMap[category] || category.toLowerCase();
      }
      const res = await api.get('/products', { params });
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
      showToast('Failed to fetch products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type) => setToast({ message, type });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--primary-dark)', color: 'white', textAlign: 'center', padding: '8px', fontSize: '14px', fontWeight: '500' }}>
        🎉 Free Delivery on all orders above ₹299!
      </div>
      
      <Navbar onOpenAuth={() => setAuthOpen(true)} />
      
      <main className="container" style={{ flexGrow: 1, padding: '24px 16px' }}>
        {/* Live Video Hero Section */}
        <div style={{ 
          position: 'relative', 
          borderRadius: '16px', 
          overflow: 'hidden', 
          marginBottom: '32px',
          height: '300px',
          display: 'flex', 
          alignItems: 'center' 
        }}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0
            }}
          >
            <source src="https://cdn.pixabay.com/video/2020/05/17/40097-425266848_large.mp4" type="video/mp4" />
          </video>
          
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
            zIndex: 1
          }}></div>

          <div style={{ position: 'relative', zIndex: 2, padding: '40px', maxWidth: '600px' }}>
            <h1 style={{ fontSize: '36px', color: '#ffffff', marginBottom: '16px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              Fresh Groceries,<br/>Delivered in Minutes.
            </h1>
            <p style={{ color: '#e2e8f0', fontSize: '18px', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
              Your neighborhood Apna Bazar, now online!
            </p>
          </div>
        </div>

        <CategoryTabs selected={category} onSelect={setCategory} />
        
        <div style={{ margin: '16px 0', color: 'var(--text-muted)' }}>
          Showing {products.length} products
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading products...</div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {products.map(p => (
              <ProductCard key={p._id} product={p} onClick={setSelectedProduct} />
            ))}
          </div>
        )}
      </main>

      <CartDrawer 
        onCheckout={() => setCheckoutOpen(true)} 
        onAuth={() => setAuthOpen(true)}
      />

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} showToast={showToast} />}
      
      {checkoutOpen && (
        <CheckoutModal 
          onClose={() => setCheckoutOpen(false)} 
          showToast={showToast} 
        />
      )}

      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default HomePage;
