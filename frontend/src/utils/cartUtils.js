// PLAIN LOCALSTORAGE CART UTILITIES - NO CONTEXT
// For demo stability - bypass all React context issues

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (err) {
    console.error('Cart read error:', err);
    return [];
  }
};

export const saveCart = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (err) {
    console.error('Cart save error:', err);
  }
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existingItem = cart.find(item => item._id === product._id);
  
  let updatedCart;
  if (existingItem) {
    // Increment quantity if exists
    updatedCart = cart.map(item =>
      item._id === product._id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  } else {
    // Add new product
    updatedCart = [...cart, { ...product, quantity }];
  }
  
  saveCart(updatedCart);
  return updatedCart;
};

export const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item._id !== productId);
  saveCart(updatedCart);
  return updatedCart;
};

export const updateQuantity = (productId, quantity) => {
  const cart = getCart();
  const updatedCart = cart.map(item =>
    item._id === productId ? { ...item, quantity } : item
  );
  saveCart(updatedCart);
  return updatedCart;
};

export const clearCart = () => {
  localStorage.removeItem('cart');
};

export const getCartTotal = (cart = null) => {
  const cartToUse = cart || getCart();
  return cartToUse.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
};

export const getCartCount = (cart = null) => {
  const cartToUse = cart || getCart();
  return cartToUse.reduce((total, item) => total + (item.quantity || 0), 0);
};
