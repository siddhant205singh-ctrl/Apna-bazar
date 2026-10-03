import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Toast from '../../components/Toast';

const OwnerLoginPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ phone, password });
      if (res.user.role === 'owner') {
        navigate('/owner/dashboard');
      } else {
        setToast({ message: 'Access denied. Owner only.', type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'Invalid credentials', type: 'error' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: 'var(--shadow-md)' }}>
        <h1 style={{ color: 'var(--primary)', textAlign: 'center', marginBottom: '8px' }}>Apna Bazar</h1>
        <h2 style={{ textAlign: 'center', marginBottom: '32px', color: 'var(--text-muted)' }}>Store Owner Portal</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="text" 
            placeholder="Phone Number" 
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '16px', fontSize: '16px', marginTop: '16px' }}>
            Login to Dashboard
          </button>
        </form>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default OwnerLoginPage;
