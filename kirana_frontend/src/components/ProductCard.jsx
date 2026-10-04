import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onClick }) => {
  const { items, addToCart, updateQty } = useCart();
  const lang = localStorage.getItem('apnabazar_lang') || 'en';

  const cartItem = items.find(item => item.product._id === product._id);
  const qty = cartItem ? cartItem.qty : 0;

  const name = lang === 'hi' && product.name_hi ? product.name_hi : product.name;
  const unit = lang === 'hi' && product.unit_hi ? product.unit_hi : product.unit;

  const discountPct = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="product-card" onClick={() => onClick && onClick(product)}>
      {/* Image */}
      <div className="product-img-wrap">
        <img
          src={product.image || 'https://via.placeholder.com/200'}
          alt={name}
          className="product-image"
        />
        {discountPct && (
          <span className="product-discount-badge">{discountPct}% OFF</span>
        )}
        {product.tag && (
          <span className="product-tag-badge">{lang === 'hi' && product.tag_hi ? product.tag_hi : product.tag}</span>
        )}
      </div>

      {/* Info */}
      <div className="product-info">
        <div className="product-unit">{unit}</div>
        <div className="product-title">{name}</div>

        <div className="product-price-row">
          <div className="price-wrap">
            <span className="price">₹{product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="price-original">₹{product.originalPrice}</span>
            )}
          </div>

          {/* ADD / QTY */}
          {qty === 0 ? (
            <button
              className="add-btn"
              onClick={e => { e.stopPropagation(); addToCart(product); }}
              disabled={!product.inStock}
            >
              {product.inStock ? 'ADD' : 'N/A'}
            </button>
          ) : (
            <div className="qty-controls" onClick={e => e.stopPropagation()}>
              <button className="qty-btn" onClick={() => updateQty(product._id, -1)}>
                <Minus size={14} />
              </button>
              <span className="qty-count">{qty}</span>
              <button className="qty-btn" onClick={() => updateQty(product._id, 1)}>
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
