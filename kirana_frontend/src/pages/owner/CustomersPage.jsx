import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Package, Users, ShoppingBag } from 'lucide-react';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import OwnerSidebar from '../../components/OwnerSidebar';

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
      <OwnerSidebar />

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
