import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Package, Users, ShoppingBag } from 'lucide-react';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const { logout } = useAuth();
  
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await api.get('/dashboard/customers');
      setCustomers(res.data.data || []);
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
          <Link to="/owner/products" className="sidebar-link"><Package size={20} /> Products</Link>
          <Link to="/owner/customers" className="sidebar-link active"><Users size={20} /> Customers</Link>
        </nav>
        <div className="sidebar-nav" style={{ marginTop: 'auto', padding: '16px' }}>
          <Link to="/" className="sidebar-link" style={{ marginBottom: '8px' }}>View Store</Link>
          <button onClick={logout} className="sidebar-link" style={{ width: '100%', textAlign: 'left' }}>Logout</button>
        </div>
      </aside>

      <main className="owner-main">
        <h1>Customers</h1>
        
        <div className="table-wrapper" style={{ marginTop: '24px' }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer._id}>
                  <td style={{fontWeight: '500'}}>{customer.name}</td>
                  <td>
                    <div>{customer.phone}</div>
                    <div style={{fontSize:'12px', color:'var(--text-muted)'}}>{customer.email}</div>
                  </td>
                  <td style={{maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {customer.address || 'N/A'}
                  </td>
                  <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default CustomersPage;
