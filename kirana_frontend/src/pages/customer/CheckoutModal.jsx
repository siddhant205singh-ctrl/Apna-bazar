import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import api from '../../api/api';

const CheckoutModal = ({ onClose, showToast }) => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deliveryType: 'home',
    address: '',
    paymentMethod: 'cod',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.deliveryType === 'home' && !formData.address.trim()) {
      showToast('Delivery address is required', 'error');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: items.map(i => ({ product: i.product._id, quantity: i.qty })),
        deliveryType: formData.deliveryType,
        address: formData.deliveryType === 'home' ? formData.address : 'Self Pickup',
        paymentMethod: formData.paymentMethod,
        notes: formData.notes
      };

      await api.post('/orders', orderData);
      clearCart();
      showToast('🎉 Order placed successfully!', 'success');
      onClose();
      navigate('/orders');
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Failed to place order', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', position: 'sticky', top: 0, background: 'white', padding: '4px 0', zIndex: 10 }}>
          <h2>Checkout</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Delivery Type */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Order Type *</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[{ val: 'home', label: '🏠 Home Delivery', sub: 'Deliver in 30 mins' }, { val: 'pickup', label: '🏪 Self Pickup', sub: 'Ready in 15 mins' }].map(opt => (
                <label key={opt.val} style={{ flex: 1, padding: '12px', border: `2px solid ${formData.deliveryType === opt.val ? 'var(--primary)' : 'var(--border-color)'}`, borderRadius: '8px', cursor: 'pointer', background: formData.deliveryType === opt.val ? '#f0fdf4' : 'white' }}>
                  <input type="radio" name="deliveryType" value={opt.val} checked={formData.deliveryType === opt.val} onChange={e => setFormData({...formData, deliveryType: e.target.value})} style={{ marginRight: '8px' }} />
                  <strong>{opt.label}</strong><br />
                  <small style={{ color: 'var(--text-muted)' }}>{opt.sub}</small>
                </label>
              ))}
            </div>
          </div>

          {/* Delivery Address (conditional) */}
          {formData.deliveryType === 'home' && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Delivery Address *</label>
              <textarea 
                required={formData.deliveryType === 'home'}
                rows={3}
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', resize: 'none', fontFamily: 'inherit' }}
                placeholder="Flat/House No., Street Name, Landmark, Locality"
              />
            </div>
          )}

          {/* Payment Method */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Payment Method *</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[{ val: 'cod', label: '💵 Cash on Delivery' }, { val: 'upi', label: '📱 UPI on Delivery' }].map(opt => (
                <label key={opt.val} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', border: `2px solid ${formData.paymentMethod === opt.val ? 'var(--primary)' : 'var(--border-color)'}`, borderRadius: '8px', cursor: 'pointer', background: formData.paymentMethod === opt.val ? '#f0fdf4' : 'white' }}>
                  <input type="radio" name="payment" checked={formData.paymentMethod === opt.val} onChange={() => setFormData({...formData, paymentMethod: opt.val})} />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Special Instructions (Optional)</label>
            <input
              type="text"
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontFamily: 'inherit' }}
              placeholder="e.g., Leave at gate, call before arriving"
            />
          </div>

          {/* Order Summary */}
          <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px' }}>
              <span>Total to Pay:</span>
              <span style={{ color: 'var(--primary)' }}>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '16px', fontSize: '16px' }} disabled={loading}>
            {loading ? 'Placing Order...' : '🛒 Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
