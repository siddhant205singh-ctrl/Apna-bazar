import React from 'react';
import { X, Star, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProductDetailModal = ({ product, onClose }) => {
  const { items, addToCart, updateQty } = useCart();
  const cartItem = items.find(item => item.product._id === product._id);
  const qty = cartItem ? cartItem.qty : 0;
  const lang = localStorage.getItem('apnabazar_lang') || 'en';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: 0, overflow: 'hidden' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'white', borderRadius: '50%', padding: '4px', zIndex: 10 }}>
          <X size={20} />
        </button>
        
        <img 
          src={product.image || 'https://via.placeholder.com/400'} 
          alt={product.name} 
          style={{ width: '100%', height: '250px', objectFit: 'cover' }} 
        />
        
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '4px' }}>{product.category}</div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{lang === 'hi' && product.name_hi ? product.name_hi : product.name}</h2>
              <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{lang === 'hi' && product.unit_hi ? product.unit_hi : product.unit}</div>
            </div>
            {product.rating && (
              <div style={{ display: 'flex', alignItems: 'center', background: '#fef08a', padding: '4px 8px', borderRadius: '4px', gap: '4px', fontSize: '14px', fontWeight: '600' }}>
                {product.rating} <Star size={14} fill="black" />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
            <span style={{ fontSize: '28px', fontWeight: 'bold' }}>₹{product.price}</span>
            {product.originalPrice && (
              <span style={{ fontSize: '18px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <p style={{ color: '#334155', lineHeight: '1.5', marginBottom: '24px' }}>
            {lang === 'hi' && product.description_hi ? product.description_hi : (product.description || 'Premium quality product, locally sourced and carefully packed for freshness.')}
          </p>

          <div style={{ display: 'flex', gap: '16px' }}>
            {qty === 0 ? (
              <button 
                className="btn btn-primary" 
                style={{ flexGrow: 1, padding: '16px', fontSize: '16px' }}
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Basket' : 'Out of Stock'}
              </button>
            ) : (
              <div className="qty-controls" style={{ flexGrow: 1, justifyContent: 'space-between', padding: '8px 16px', fontSize: '18px' }}>
                <button className="qty-btn" onClick={() => updateQty(product._id, -1)}><Minus size={24} /></button>
                <span style={{ fontWeight: 'bold' }}>{qty}</span>
                <button className="qty-btn" onClick={() => updateQty(product._id, 1)}><Plus size={24} /></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
