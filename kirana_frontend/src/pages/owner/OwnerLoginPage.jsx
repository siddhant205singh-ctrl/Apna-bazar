import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import Toast from '../../components/Toast';

const OwnerLoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const isEmail = identifier.includes('@');
      const payload = { password };
      if (isEmail) payload.email = identifier;
      else payload.phone = identifier;

      const res = await login(payload);
      if (res.user.role === 'owner') {
        navigate('/owner/dashboard');
      } else {
        setToast({ message: 'Access denied. Owner only.', type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'Invalid credentials', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', padding: '20px', position: 'relative' }}>
      
      {/* Back to store floating button */}
      <Link to="/" style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontWeight: '700', zIndex: 100, textDecoration: 'none' }}>
        <div style={{ padding: '8px', background: 'var(--card-bg)', borderRadius: '50%', boxShadow: 'var(--shadow-md)', display: 'flex' }}>
          <ArrowLeft size={20} />
        </div>
        Back to Store
      </Link>

      <div style={{ background: 'var(--card-bg)', padding: '48px 40px', borderRadius: '24px', width: '100%', maxWidth: '440px', boxShadow: '0 24px 64px rgba(0,0,0,0.1)', border: '1px solid var(--border-color)', position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ color: 'var(--primary)', fontSize: '32px', fontWeight: '900', letterSpacing: '-1px' }}>
            Apna<span style={{ color: 'var(--accent)' }}>Bazar</span>
          </h1>
          <h2 style={{ fontSize: '15px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
            Store Owner Portal
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="form-group">
            <label className="form-label">Email or Phone Number</label>
            <input 
              type="text" 
              placeholder="e.g. 9876543210" 
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ padding: '16px', fontSize: '16px', marginTop: '8px', width: '100%', display: 'flex', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>

      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default OwnerLoginPage;
