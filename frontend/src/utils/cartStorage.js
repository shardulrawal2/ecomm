// PROTOTYPE DEMO - localStorage ONLY cart storage
// NO React state, NO context, NO re-renders

export const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (err) {
    console.error('Cart read error:', err);
    return [];
  }
};

export const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (err) {
    console.error('Cart save error:', err);
  }
};

export const addItemToStorage = (product) => {
  const cart = getCartFromStorage();
  const existingItem = cart.find(item => item._id === product._id);
  
  let updatedCart;
  if (existingItem) {
    // Increment quantity
    updatedCart = cart.map(item =>
      item._id === product._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    // Add new item
    updatedCart = [...cart, { ...product, quantity: 1 }];
  }
  
  saveCartToStorage(updatedCart);
  return updatedCart;
};

export const removeItemFromStorage = (productId) => {
  const cart = getCartFromStorage();
  const updatedCart = cart.filter(item => item._id !== productId);
  saveCartToStorage(updatedCart);
  return updatedCart;
};

export const getCartCount = () => {
  const cart = getCartFromStorage();
  return cart.reduce((total, item) => total + (item.quantity || 0), 0);
};
