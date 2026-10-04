import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Package, Users, ShoppingBag } from 'lucide-react';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import Toast from '../../components/Toast';
import OwnerSidebar from '../../components/OwnerSidebar';
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
      <OwnerSidebar />

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
