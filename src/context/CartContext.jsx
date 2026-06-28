import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Load initial cart state from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('auracart_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Toast state
  const [toast, setToast] = useState(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('auracart_cart', JSON.stringify(cart));
  }, [cart]);

  // Show a toast message
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
  };

  // Clear toast after timeout
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        triggerToast(`Increased quantity of ${product.title} in cart!`, 'info');
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        triggerToast(`${product.title} added to cart!`, 'success');
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === id);
      if (item) {
        triggerToast(`Removed ${item.title} from cart.`, 'warning');
      }
      return prevCart.filter((item) => item.id !== id);
    });
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          if (item.quantity <= 1) {
            triggerToast(`Removed ${item.title} from cart.`, 'warning');
            return null;
          }
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(Boolean)
    );
  };

  const clearCart = () => {
    if (cart.length > 0) {
      setCart([]);
      triggerToast('Cart cleared.', 'warning');
    }
  };

  // Calculate totals
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        toast,
        triggerToast,
        setToast,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
