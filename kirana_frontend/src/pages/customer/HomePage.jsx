import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import CategoryTabs from '../../components/CategoryTabs';
import ProductCard from '../../components/ProductCard';
import CartDrawer from './CartDrawer';
import AuthModal from './AuthModal';
import CheckoutModal from './CheckoutModal';
import ProductDetailModal from './ProductDetailModal';
import Toast from '../../components/Toast';
import Hero3D from '../../components/Hero3D';
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
        <Hero3D />

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
