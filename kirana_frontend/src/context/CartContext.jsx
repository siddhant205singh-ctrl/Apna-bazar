import { createContext, useState, useEffect, useContext, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('apnabazar_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('apnabazar_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product._id === product._id);
      if (existing) {
        return prev.map(item => 
          item.product._id === product._id 
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { product, qty }];
    });
  };

  const removeFromCart = (productId) => {
    setItems(prev => prev.filter(item => item.product._id !== productId));
  };

  const updateQty = (productId, delta) => {
    setItems(prev => prev
      .map(item => {
        if (item.product._id === productId) {
          return { ...item, qty: item.qty + delta };
        }
        return item;
      })
      .filter(item => item.qty > 0)
    );
  };

  const clearCart = () => setItems([]);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const { totalItems, subtotal, discount, deliveryFee, total } = useMemo(() => {
    // Safely filter out any invalid items from old storage formats
    const validItems = items.filter(item => item && item.product && item.product.price);
    
    const totalItems = validItems.reduce((acc, item) => acc + (item.qty || 0), 0);
    const subtotal = validItems.reduce((acc, item) => acc + (item.product.price * (item.qty || 0)), 0);
    const discount = validItems.reduce((acc, item) => {
      const orig = item.product.originalPrice || item.product.price;
      return acc + ((orig - item.product.price) * (item.qty || 0));
    }, 0);
    const deliveryFee = subtotal >= 299 || subtotal === 0 ? 0 : 39;
    const total = subtotal + deliveryFee;
    
    return { totalItems, subtotal, discount, deliveryFee, total };
  }, [items]);

  return (
    <CartContext.Provider value={{
      items, isOpen,
      addToCart, removeFromCart, updateQty, clearCart, openCart, closeCart,
      totalItems, subtotal, discount, deliveryFee, total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
