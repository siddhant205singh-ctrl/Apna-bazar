import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Package, Users, ShoppingBag, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../hooks/useSocket';
import api from '../../api/api';
import Toast from '../../components/Toast';
import StatusBadge from '../../components/StatusBadge';

const DashboardPage = () => {
  const { logout } = useAuth();
  const [stats, setStats] = useState({ orders: 0, revenue: 0, pending: 0, products: 0, customers: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [toast, setToast] = useState(null);

  const socket = useSocket('new_order', (order) => {
    setToast({ message: '🔔 New Order Received!', type: 'success' });
    fetchDashboardData();
  });

  useEffect(() => {
    socket.emit('join_owner_room');
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/orders')
      ]);
      const sd = statsRes.data.data;
      setStats({
        orders: sd.todayOrders,
        revenue: sd.todayRevenue,
        pending: sd.pendingOrders,
        products: sd.totalProducts,
        customers: sd.totalCustomers,
      });
      setRecentOrders(sd.recentOrders || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="owner-layout">
      <aside className="owner-sidebar">
        <div className="sidebar-logo">Apna Bazar <span style={{fontSize:'14px', color:'var(--text-muted)'}}>Owner</span></div>
        <nav className="sidebar-nav" style={{ flexGrow: 1 }}>
          <Link to="/owner/dashboard" className="sidebar-link active"><Home size={20} /> Dashboard</Link>
          <Link to="/owner/orders" className="sidebar-link"><ShoppingBag size={20} /> Orders</Link>
          <Link to="/owner/products" className="sidebar-link"><Package size={20} /> Products</Link>
          <Link to="/owner/customers" className="sidebar-link"><Users size={20} /> Customers</Link>
        </nav>
        <div className="sidebar-nav">
          <Link to="/" className="sidebar-link"><ExternalLink size={20} /> View Store</Link>
          <button onClick={logout} className="sidebar-link" style={{ width: '100%', textAlign: 'left' }}><LogOut size={20} /> Logout</button>
        </div>
      </aside>

      <main className="owner-main">
        <h1 style={{ marginBottom: '24px' }}>Dashboard Overview</h1>
        
        <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '32px' }}>
          <div className="stat-card">
            <div style={{ color: 'var(--text-muted)' }}>Today's Orders</div>
            <div className="stat-value">{stats.orders}</div>
          </div>
          <div className="stat-card">
            <div style={{ color: 'var(--text-muted)' }}>Today's Revenue</div>
            <div className="stat-value text-primary">₹{stats.revenue.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div style={{ color: 'var(--text-muted)' }}>Pending Orders</div>
            <div className="stat-value" style={{ color: '#f59e0b' }}>{stats.pending}</div>
          </div>
          <div className="stat-card">
            <div style={{ color: 'var(--text-muted)' }}>Total Customers</div>
            <div className="stat-value">{stats.customers}</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2>Recent Orders</h2>
          <Link to="/owner/orders" className="btn btn-outline">View All</Link>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order._id}>
                  <td>#{order._id.slice(-6).toUpperCase()}</td>
                  <td>{order.customer?.name || 'N/A'}</td>
                  <td>₹{(order.total || 0).toFixed(2)}</td>
                  <td>{new Date(order.createdAt).toLocaleTimeString()}</td>
                  <td><StatusBadge status={order.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default DashboardPage;
