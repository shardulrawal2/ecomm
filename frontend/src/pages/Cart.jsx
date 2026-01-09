import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getCart, createOrder } from '../utils/apiCalls';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
      const response = await createOrder(shippingAddress);
      alert('Order placed successfully!');
      clearCart();
      navigate(`/orders/${response.data.order._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {error && <ErrorMessage message={error} onClose={() => setError('')} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                    <p className="text-blue-600 font-semibold">${item.price}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                      className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="px-3 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                      className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-600 hover:text-red-800 text-sm mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="mb-4 pb-4 border-b">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handleCheckout}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Shipping Address
                  </label>
                  <textarea
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Enter your full address"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    rows="4"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 disabled:bg-gray-400"
                >
                  {loading ? 'Processing...' : 'Checkout'}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full mt-3 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
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
