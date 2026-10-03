import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onClick }) => {
  const { items, addToCart, updateQty } = useCart();
  
  const cartItem = items.find(item => item.product._id === product._id);
  const qty = cartItem ? cartItem.qty : 0;

  const lang = localStorage.getItem('apnabazar_lang') || 'en';

  return (
    <div className="product-card" onClick={() => onClick && onClick(product)}>
      <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} className="product-image" />
      <div className="product-category">{product.category}</div>
      <h3 className="product-title">{lang === 'hi' && product.name_hi ? product.name_hi : product.name}</h3>
      <div className="product-unit">{lang === 'hi' && product.unit_hi ? product.unit_hi : product.unit}</div>
      
      <div className="product-price-row">
        <div>
          <div className="price">₹{product.price}</div>
          {product.originalPrice && (
            <div style={{ textDecoration: 'line-through', color: '#64748b', fontSize: '12px' }}>
              ₹{product.originalPrice}
            </div>
          )}
        </div>
        
        {qty === 0 ? (
          <button 
            className="btn btn-primary" 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add' : 'Out of Stock'}
          </button>
        ) : (
          <div className="qty-controls" onClick={e => e.stopPropagation()}>
            <button className="qty-btn" onClick={() => updateQty(product._id, -1)}><Minus size={16} /></button>
            <span>{qty}</span>
            <button className="qty-btn" onClick={() => updateQty(product._id, 1)}><Plus size={16} /></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
