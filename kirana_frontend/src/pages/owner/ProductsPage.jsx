import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Package, Users, ShoppingBag } from 'lucide-react';
import api from '../../api/api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
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
      </aside>

      <main className="owner-main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Products</h1>
          <button className="btn btn-primary">Add Product</button>
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
                    <div>{product.name}</div>
                    <div style={{fontSize:'12px', color:'var(--text-muted)'}}>{product.unit}</div>
                  </td>
                  <td>{product.category}</td>
                  <td>₹{product.price}</td>
                  <td>
                    <span style={{ color: product.inStock ? '#16a34a' : '#dc2626', fontWeight: '500' }}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '12px' }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
