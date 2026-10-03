import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const CartDrawer = ({ onCheckout, onAuth }) => {
  const { 
    items, isOpen, closeCart, updateQty,
    subtotal, discount, deliveryFee, total 
  } = useCart();
  const { user } = useAuth();

  const handleCheckoutClick = () => {
    closeCart();
    if (user) {
      onCheckout();
    } else {
      onAuth();
    }
  };

  return (
    <>
      {isOpen && <div className="modal-overlay" onClick={closeCart} style={{ zIndex: 90 }} />}
      <div className={`drawer ${isOpen ? 'open' : ''}`} style={{ zIndex: 95 }}>
        <div className="drawer-header">
          <h2 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={24} /> My Basket
          </h2>
          <button onClick={closeCart}><X size={24} /></button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '60px', color: 'var(--text-muted)' }}>
              <ShoppingBag size={64} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
              <h3>Your basket is empty</h3>
              <p style={{ marginTop: '8px' }}>Add items to start shopping</p>
              <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={closeCart}>
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Delivery Progress */}
              {subtotal < 299 && (
                <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '8px', marginBottom: '24px' }}>
                  <div style={{ fontSize: '14px', color: '#166534', marginBottom: '8px', fontWeight: '500' }}>
                    Shop for ₹{(299 - subtotal).toFixed(2)} more to get Free Delivery
                  </div>
                  <div style={{ height: '6px', background: '#dcfce7', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'var(--primary)', width: `${(subtotal / 299) * 100}%` }} />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {items.map(({ product, qty }) => (
                  <div key={product._id} style={{ display: 'flex', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    <img src={product.image || 'https://via.placeholder.com/60'} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontWeight: '500' }}>{product.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{product.unit}</div>
                      <div style={{ fontWeight: '600', marginTop: '4px' }}>₹{product.price}</div>
                    </div>
                    <div className="qty-controls" style={{ height: 'fit-content' }}>
                      <button className="qty-btn" onClick={() => updateQty(product._id, -1)}><Minus size={16} /></button>
                      <span>{qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(product._id, 1)}><Plus size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '24px', background: 'var(--bg-color)', padding: '16px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Bill Details</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Item Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--primary)' }}>
                    <span>Product Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px dashed #cbd5e1' }}>
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <span style={{color: 'var(--primary)'}}>FREE</span> : `₹${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px' }}>
                  <span>Grand Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-footer">
            <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px' }} onClick={handleCheckoutClick}>
              Proceed to Checkout (₹{total.toFixed(2)})
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
