import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../utils/apiCalls';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ErrorMessage from '../components/ErrorMessage';

const Cart = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      const updatedCart = cartItems.map(item =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate('/login');
      return;
    }

    if (!shippingAddress) {
      setError('Please enter shipping address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Send complete order data to backend
      const orderData = {
        items: cartItems,
        totalPrice: totalPrice,
        shippingAddress: shippingAddress
      };

      const response = await createOrder(orderData);
      addToast('Order placed successfully!', 'success');
      
      // Clear cart
      setCartItems([]);
      localStorage.removeItem('cart');
      
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-noir-950 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-noir-50">ACMazon Shopping Cart</h1>
          <div className="text-center py-16 bg-noir-900 rounded-xl border border-noir-800">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-noir-800 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-noir-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <p className="text-noir-400 text-xl mb-6">Your cart is empty</p>
            <p className="text-noir-500 mb-8">Add some products to get started!</p>
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
        <h1 className="text-3xl font-bold mb-8 text-noir-50">ACMazon Shopping Cart</h1>

        {error && <ErrorMessage message={error} onClose={() => setError('')} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-noir-900 rounded-xl border border-noir-800">
              {(cartItems && Array.isArray(cartItems)) ? cartItems.map((item) => (
                <div
                  key={item?._id || Math.random()}
                  className="flex gap-4 p-4 border-b border-noir-800 last:border-b-0 hover:bg-noir-800/50 transition-colors duration-300"
                >
                  <img
                    src={item?.image || 'https://via.placeholder.com/100x100?text=Product'}
                    alt={item?.name || 'Product'}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={handleImageError}
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-noir-50">{item?.name || 'Product'}</h3>
                    <p className="text-noir-400 text-sm mb-2">{item?.category || 'Unknown'}</p>
                    <p className="text-neon-cyan font-semibold">{formatPrice(item?.price || 0)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item?._id, (item?.quantity || 1) - 1)
                      }
                      className="bg-noir-800 text-noir-300 px-3 py-1 rounded-lg hover:bg-noir-700 transition-colors duration-300"
                    >
                      -
                    </button>
                    <span className="px-3 font-semibold text-noir-50">{item?.quantity || 1}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item?._id, (item?.quantity || 1) + 1)
                      }
                      className="bg-noir-800 text-noir-300 px-3 py-1 rounded-lg hover:bg-noir-700 transition-colors duration-300"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-noir-50">
                      {formatPrice((item?.price || 0) * (item?.quantity || 1))}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item?._id)}
                      className="text-red-400 hover:text-red-300 text-sm mt-2 transition-colors duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-noir-400">
                  <p>Your cart is empty or loading...</p>
                </div>
              )}
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
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-noir-50">
                  <span>Total:</span>
                  <span className="text-neon-cyan">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <form onSubmit={handleCheckout}>
                <div className="mb-4">
                  <label className="block text-noir-300 font-semibold mb-2">
                    Shipping Address
                  </label>
                  <textarea
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Enter your full address"
                    className="w-full px-3 py-2 bg-noir-800 border border-noir-700 rounded-lg text-noir-50 placeholder-noir-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all duration-300"
                    rows="4"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-neon-cyan text-noir-950 py-3 rounded-lg font-semibold hover:bg-noir-50 disabled:bg-noir-800 disabled:text-noir-600 transition-all duration-300 hover:scale-105"
                >
                  {loading ? 'Processing...' : 'Checkout'}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full mt-3 bg-noir-800 text-noir-300 py-2 rounded-lg hover:bg-noir-700 transition-colors duration-300"
                >
                  Continue Shopping
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
