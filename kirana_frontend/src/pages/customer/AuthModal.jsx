import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AuthModal = ({ onClose, showToast }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    address: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login({ phone: formData.phone, password: formData.password });
        showToast('Logged in successfully', 'success');
      } else {
        await register(formData);
        showToast('Registered successfully', 'success');
      }
      onClose();
    } catch (err) {
      showToast(err.response?.data?.message || 'Authentication failed', 'error');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px' }}><X size={24} /></button>
        
        <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <button 
            className={`btn ${isLogin ? 'btn-primary' : 'btn-outline'}`} 
            style={{ flex: 1 }}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={`btn ${!isLogin ? 'btn-primary' : 'btn-outline'}`} 
            style={{ flex: 1 }}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Full Name" 
              required 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
            />
          )}
          
          <input 
            type="text" 
            placeholder="Phone Number" 
            required 
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
          />
          
          {!isLogin && (
            <>
              <input 
                type="email" 
                placeholder="Email Address (Optional)" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
              />
              <textarea 
                placeholder="Delivery Address" 
                required 
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', resize: 'none' }}
              />
            </>
          )}

          <input 
            type="password" 
            placeholder="Password" 
            required 
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
          />

          <button type="submit" className="btn btn-primary" style={{ padding: '16px', fontSize: '16px', marginTop: '8px' }}>
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
