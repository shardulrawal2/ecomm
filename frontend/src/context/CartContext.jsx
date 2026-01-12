import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Global failsafe - ensure cart is always an array
  const safeCart = Array.isArray(cart) ? cart : [];
  if (cart !== safeCart) {
    setCart(safeCart);
  }

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        // Ensure we always set an array, never null
        const safeCart = Array.isArray(parsedCart) ? parsedCart : [];
        setCart(safeCart);
        updateCartCount(safeCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('cart');
        // Set empty array on error
        setCart([]);
        setCartCount(0);
      }
    }
  }, []); // Only run once on mount

  const updateCartCount = (cartItems) => {
    // Always ensure we have an array
    const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
    const count = safeCartItems.reduce((total, item) => total + (item?.quantity || 0), 0);
    setCartCount(count);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(currentCart => {
      // Ensure currentCart is always an array
      const safeCurrentCart = Array.isArray(currentCart) ? currentCart : [];
      const existingItem = safeCurrentCart.find((item) => item?._id === product?._id);
      let updatedCart;

      if (existingItem) {
        updatedCart = safeCurrentCart.map((item) =>
          item?._id === product?._id
            ? { ...item, quantity: (item?.quantity || 0) + quantity }
            : item
        );
      } else {
        updatedCart = [...safeCurrentCart, { ...product, quantity }];
      }

      // Always update localStorage with valid array
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      updateCartCount(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(currentCart => {
      const safeCurrentCart = Array.isArray(currentCart) ? currentCart : [];
      const updatedCart = safeCurrentCart.filter((item) => item?._id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      updateCartCount(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart(currentCart => {
      const safeCurrentCart = Array.isArray(currentCart) ? currentCart : [];
      const updatedCart = safeCurrentCart.map((item) =>
        item?._id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      updateCartCount(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setCartCount(0);
    localStorage.removeItem('cart');
  };

  // Context value NEVER changes shape - always same object structure
  const contextValue = {
    cart: safeCart, // Always an array, never null
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
