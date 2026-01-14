import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getCartFromStorage, saveCartToStorage, removeItemFromStorage } from '../utils/cartStorage';

const SimpleCart = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount - NO re-renders
  useEffect(() => {
    const cart = getCartFromStorage();
    setCartItems(cart);
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItemFromStorage(productId);
      const updatedCart = getCartFromStorage();
      setCartItems(updatedCart);
    } else {
      const cart = getCartFromStorage();
      const updatedCart = cart.map(item =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      );
      saveCartToStorage(updatedCart);
      setCartItems(updatedCart);
    }
  };

  const handleRemoveItem = (productId) => {
    removeItemFromStorage(productId);
    const updatedCart = getCartFromStorage();
    setCartItems(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/100x100?text=Product';
  };

  const handleCheckout = () => {
    setLoading(true);

    try {
      // Read cart from localStorage
      const cart = getCartFromStorage();
      
      // Create FAKE order for demo
      const fakeOrder = {
        id: Date.now().toString(),
        items: cart,
        totalPrice: cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0),
        createdAt: new Date().toISOString(),
        status: 'pending'
      };

      // Save to localStorage orders
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(fakeOrder);
      localStorage.setItem('orders', JSON.stringify(existingOrders));
      
      // Clear cart
      saveCartToStorage([]);
      setCartItems([]);
      
      addToast('Order placed successfully!', 'success');
      navigate('/orders');
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-noir-950 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-noir-50">ACMzon Shopping Cart</h1>
          <div className="text-center py-16 bg-noir-900 rounded-xl border border-noir-800">
            <p className="text-noir-400 text-xl mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate('/')}
              className="bg-neon-cyan text-noir-950 px-8 py-3 rounded-lg font-medium hover:bg-noir-50 transition-all duration-300 hover:scale-105"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noir-950 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-noir-50">ACMzon Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-noir-900 rounded-xl border border-noir-800">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-4 border-b border-noir-800 last:border-b-0 hover:bg-noir-800/50 transition-colors duration-300"
                >
                  <img
                    src={item.image || 'https://via.placeholder.com/100x100?text=Product'}
                    alt={item.name || 'Product'}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={handleImageError}
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-noir-50">{item.name || 'Product'}</h3>
                    <p className="text-noir-400 text-sm mb-2">{item.category || 'Unknown'}</p>
                    <p className="text-neon-cyan font-semibold">{formatPrice(item.price || 0)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, (item.quantity || 1) - 1)
                      }
                      className="bg-noir-800 text-noir-300 px-3 py-1 rounded-lg hover:bg-noir-700 transition-colors duration-300"
                    >
                      -
                    </button>
                    <span className="px-3 font-semibold text-noir-50">{item.quantity || 1}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, (item.quantity || 1) + 1)
                      }
                      className="bg-noir-800 text-noir-300 px-3 py-1 rounded-lg hover:bg-noir-700 transition-colors duration-300"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-noir-50">
                      {formatPrice((item.price || 0) * (item.quantity || 1))}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-400 hover:text-red-300 text-sm mt-2 transition-colors duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-noir-900 rounded-xl border border-noir-800 p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4 text-noir-50">Order Summary</h2>

              <div className="mb-4 pb-4 border-b border-noir-800">
                <div className="flex justify-between mb-2 text-noir-300">
                  <span>Subtotal:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between mb-2 text-noir-300">
                  <span>Items:</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-noir-50">
                  <span>Total:</span>
                  <span className="text-neon-cyan">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading || cartItems.length === 0}
                className="w-full bg-neon-cyan text-noir-950 py-3 rounded-lg font-semibold hover:bg-noir-50 disabled:bg-noir-800 disabled:text-noir-600 transition-all duration-300 hover:scale-105"
              >
                {loading ? 'Processing...' : 'Checkout'}
              </button>

              <button
                onClick={() => navigate('/')}
                className="w-full mt-3 bg-noir-800 text-noir-300 py-2 rounded-lg hover:bg-noir-700 transition-colors duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCart;
