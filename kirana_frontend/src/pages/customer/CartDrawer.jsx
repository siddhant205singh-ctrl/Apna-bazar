import React from 'react';
import { X, Plus, Minus, ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const CartDrawer = ({ onCheckout, onAuth }) => {
  const { items, isOpen, closeCart, updateQty, subtotal, discount, deliveryFee, total } = useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    closeCart();
    if (user) onCheckout();
    else onAuth();
  };

  const progressPct = Math.min((subtotal / 299) * 100, 100);

  return (
    <>
      {isOpen && <div className="modal-overlay" onClick={closeCart} style={{ zIndex: 290 }} />}

      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title">
            <ShoppingCart size={22} color="var(--primary)" />
            My Basket
          </div>
          <button className="btn btn-ghost" onClick={closeCart}>
            <X size={22} />
          </button>
        </div>

        {/* Delivery ETA */}
        {items.length > 0 && (
          <div className="delivery-eta">
            <Zap size={15} />
            Delivery in <strong>15–20 mins</strong>
          </div>
        )}

        <div className="drawer-body">
          {items.length === 0 ? (
            /* Empty State */
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
                Your basket is empty
              </div>
              <div style={{ fontSize: '14px', marginBottom: '24px' }}>
                Add items from the store to get started
              </div>
              <button className="btn btn-primary" onClick={closeCart}>
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Delivery Progress */}
              {subtotal < 299 && (
                <div className="delivery-progress" style={{ marginTop: '8px' }}>
                  <div className="delivery-progress-text">
                    🎉 Add ₹{(299 - subtotal).toFixed(0)} more for FREE delivery!
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>
              )}
              {subtotal >= 299 && (
                <div className="delivery-progress">
                  <div className="delivery-progress-text">✅ You've unlocked FREE delivery!</div>
                </div>
              )}

              {/* Cart Items */}
              {items.map(({ product, qty }) => (
                <div key={product._id} className="cart-item">
                  <img
                    src={product.image || 'https://via.placeholder.com/60'}
                    alt={product.name}
                    className="cart-item-img"
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="cart-item-name">{product.name}</div>
                    <div className="cart-item-unit">{product.unit}</div>
                    <div className="cart-item-price">₹{product.price}</div>
                  </div>
                  <div className="qty-controls" onClick={e => e.stopPropagation()}>
                    <button className="qty-btn" onClick={() => updateQty(product._id, -1)}>
                      <Minus size={13} />
                    </button>
                    <span className="qty-count">{qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(product._id, 1)}>
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Bill Details */}
              <div className="bill-box">
                <div className="bill-title">Bill Details</div>
                <div className="bill-row">
                  <span>Item Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="bill-row discount">
                    <span>Product Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="bill-row">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'bill-row free' : ''}>
                    {deliveryFee === 0 ? 'FREE 🎉' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="bill-row total">
                  <span>Grand Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div style={{ height: '16px' }} />
            </>
          )}
        </div>

        {/* Checkout CTA */}
        {items.length > 0 && (
          <div className="drawer-footer">
            <button className="checkout-btn" onClick={handleCheckout}>
              <span>Proceed to Checkout</span>
              <span style={{ fontWeight: '900', fontSize: '17px' }}>₹{total.toFixed(0)} →</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
