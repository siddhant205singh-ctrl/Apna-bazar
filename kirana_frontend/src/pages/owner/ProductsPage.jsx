import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Package, Users, ShoppingBag } from 'lucide-react';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import Toast from '../../components/Toast';
import OwnerProductModal from './OwnerProductModal';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { logout } = useAuth();
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleSave = () => {
    setModalOpen(false);
    fetchProducts();
  };

  return (
    <div className="owner-layout">
      <aside className="owner-sidebar">
        <div className="sidebar-logo">Apna Bazar</div>
        <nav className="sidebar-nav">
          <Link to="/owner/dashboard" className="sidebar-link"><Home size={20} /> Dashboard</Link>
          <Link to="/owner/orders" className="sidebar-link"><ShoppingBag size={20} /> Orders</Link>
          <Link to="/owner/products" className="sidebar-link active"><Package size={20} /> Products</Link>
          <Link to="/owner/customers" className="sidebar-link"><Users size={20} /> Customers</Link>
        </nav>
        <div className="sidebar-nav" style={{ marginTop: 'auto', padding: '16px' }}>
          <Link to="/" className="sidebar-link" style={{ marginBottom: '8px' }}>View Store</Link>
          <button onClick={logout} className="sidebar-link" style={{ width: '100%', textAlign: 'left' }}>Logout</button>
        </div>
      </aside>

      <main className="owner-main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Products</h1>
          <button onClick={handleAdd} className="btn btn-primary">Add Product</button>
        </div>
        
        <div className="table-wrapper" style={{ marginTop: '24px' }}>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>
                    <img src={product.image || 'https://via.placeholder.com/40'} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                  </td>
                  <td>
                    <div style={{fontWeight: '500'}}>{product.name}</div>
                    <div style={{fontSize:'12px', color:'var(--text-muted)'}}>{product.unit}</div>
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>{product.category.replace('-', ' & ')}</td>
                  <td>₹{product.price}</td>
                  <td>
                    <span style={{ color: product.inStock ? '#16a34a' : '#dc2626', fontWeight: '500' }}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(product)} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '12px' }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {modalOpen && (
        <OwnerProductModal 
          product={selectedProduct} 
          onClose={() => setModalOpen(false)} 
          onSave={handleSave} 
          showToast={(msg, type) => setToast({ message: msg, type })}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default ProductsPage;
