import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Package, Users, ShoppingBag, LogOut } from 'lucide-react';
import api from '../../api/api';
import StatusBadge from '../../components/StatusBadge';
import Toast from '../../components/Toast';
import OwnerSidebar from '../../components/OwnerSidebar';
import { useSocket } from '../../hooks/useSocket';
import { useAuth } from '../../context/AuthContext';

const OwnerOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState(null);
  const { logout } = useAuth();
  
  useSocket('new_order', (order) => {
    setOrders(prev => [order, ...prev]);
    setToast({ message: `🔔 New order from ${order.customer?.name || 'Customer'}!`, type: 'success' });
  });

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const params = filter === 'today' ? { date: 'today' } : {};
      const res = await api.get('/orders', { params });
      setOrders(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error(err);
    }
  };

  const STATUS_OPTIONS = ['Pending', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered', 'Rejected'];

  return (
    <div className="owner-layout">
      <OwnerSidebar />

      <main className="owner-main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1>All Orders</h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'today'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`btn ${filter === f ? 'btn-primary' : 'btn-outline'}`} style={{ textTransform: 'capitalize' }}>{f === 'today' ? "Today's" : 'All'} Orders</button>
            ))}
          </div>
        </div>
        
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Time</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>
                    <div style={{ fontWeight: '600' }}>#{order._id.slice(-6).toUpperCase()}</div>
                    <div style={{fontSize:'11px', color:'var(--text-muted)', marginTop: '2px'}}>
                      {order.deliveryType === 'home' ? '🚚 Delivery' : '🏪 Pickup'}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: '500' }}>{order.customer?.name || 'N/A'}</div>
                    <div style={{fontSize:'12px', color:'var(--text-muted)'}}>{order.customer?.phone}</div>
                    {order.address && <div style={{fontSize:'11px', color:'var(--text-muted)', marginTop:'2px'}}>{order.address}</div>}
                  </td>
                  <td>
                    <div>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</div>
                    <div style={{fontSize:'11px', color:'var(--text-muted)'}}>
                      {order.items.slice(0,2).map(i => i.name).join(', ')}{order.items.length > 2 ? '...' : ''}
                    </div>
                  </td>
                  <td style={{ fontWeight: 'bold', color: 'var(--primary)' }}>₹{(order.total || 0).toFixed(2)}</td>
                  <td style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>{order.paymentMethod}</td>
                  <td style={{fontSize:'12px', color:'var(--text-muted)'}}>{new Date(order.createdAt).toLocaleString()}</td>
                  <td><StatusBadge status={order.status} /></td>
                  <td>
                    <select 
                      value={order.status} 
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '13px', cursor: 'pointer' }}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No orders found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default OwnerOrdersPage;
