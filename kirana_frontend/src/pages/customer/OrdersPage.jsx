import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import StatusBadge from '../../components/StatusBadge';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../hooks/useSocket';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  const socket = useSocket('order_status_updated', (data) => {
    setOrders(prev => prev.map(o => o._id === data.orderId ? { ...o, status: data.status } : o));
  });

  useEffect(() => {
    if (user) {
      socket.emit('join_customer_room', { customerId: user._id });
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders/my');
      setOrders(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const STATUS_STEPS = ['Pending', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered'];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
      <Navbar />
      
      <main className="container" style={{ padding: '32px 16px' }}>
        <h1 style={{ marginBottom: '24px' }}>My Orders</h1>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading your orders...</div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px', background: 'white', borderRadius: '12px' }}>
            <h2>No orders yet</h2>
            <p style={{ color: 'var(--text-muted)' }}>Looks like you haven't placed any orders.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.map(order => {
              const currentStep = order.status === 'Rejected'
                ? -1
                : STATUS_STEPS.indexOf(order.status);
              return (
                <div key={order._id} style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Order #{order._id.slice(-8).toUpperCase()}</div>
                      <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{new Date(order.createdAt).toLocaleString()}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>₹{(order.total || 0).toFixed(2)}</div>
                      <StatusBadge status={order.status} />
                    </div>
                  </div>

                  {/* Status pipeline tracker */}
                  {order.status !== 'Rejected' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '14px', left: '5%', right: '5%', height: '2px', background: '#e2e8f0', zIndex: 0 }} />
                      <div style={{ position: 'absolute', top: '14px', left: '5%', width: `${(currentStep / (STATUS_STEPS.length - 1)) * 90}%`, height: '2px', background: 'var(--primary)', zIndex: 1, transition: 'width 0.5s ease' }} />
                      {STATUS_STEPS.map((step, i) => (
                        <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, flex: 1 }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: i <= currentStep ? 'var(--primary)' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 'bold', transition: 'background 0.3s ease' }}>
                            {i < currentStep ? '✓' : i + 1}
                          </div>
                          <div style={{ fontSize: '10px', marginTop: '4px', textAlign: 'center', color: i <= currentStep ? 'var(--primary)' : 'var(--text-muted)', fontWeight: i === currentStep ? '700' : '400' }}>{step}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div>
                    <h4 style={{ marginBottom: '12px' }}>Items</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {order.items.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                          <span>{item.quantity} x {item.name}</span>
                          <span>₹{(item.quantity * item.price).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrdersPage;
