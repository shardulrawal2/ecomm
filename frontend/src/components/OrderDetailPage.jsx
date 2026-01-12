import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  // Read order from localStorage
  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find(o => o.id === id);
    setOrder(foundOrder || null);
  }, [id]);

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-noir-950 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <p className="text-noir-400 text-xl mb-4">Order not found</p>
            <Link
              to="/orders"
              className="bg-neon-cyan text-noir-950 px-8 py-3 rounded-lg font-medium hover:bg-noir-50 transition-all duration-300 hover:scale-105"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noir-950 py-8">
      <div className="container mx-auto px-4">
        {/* ORDER HEADER */}
        <div className="bg-noir-900 rounded-xl border border-noir-800 p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-noir-50 mb-2">Order Details</h1>
              <p className="text-noir-400 text-sm">Order ID: {order.id}</p>
              <p className="text-noir-400">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className="px-4 py-2 rounded-full text-white text-sm font-medium bg-green-600"
            >
              {order.status || 'Confirmed'}
            </span>
          </div>
        </div>

        {/* ORDER ITEMS LIST */}
        <div className="bg-noir-900 rounded-xl border border-noir-800 p-6 mb-6">
          <h2 className="text-xl font-bold text-noir-50 mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-4 items-center p-4 bg-noir-800 rounded-lg">
                <img
                  src={item.image || 'https://via.placeholder.com/80x80?text=Product'}
                  alt={item.name || 'Product'}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-noir-50 mb-1">
                    {item.name || 'Product'}
                  </h3>
                  <p className="text-noir-400 text-sm mb-2">
                    Category: {item.category || 'General'}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-noir-400 text-sm">Quantity: {item.quantity || 1}</p>
                      <p className="text-neon-cyan font-semibold">
                        {formatPrice(item.price || 0)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-noir-50 font-bold">
                        {formatPrice((item.price || 0) * (item.quantity || 1))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRICE SUMMARY BOX */}
        <div className="bg-noir-900 rounded-xl border border-noir-800 p-6 mb-6">
          <h2 className="text-xl font-bold text-noir-50 mb-4">Price Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-noir-300">
              <span>Subtotal:</span>
              <span>{formatPrice(order.totalPrice)}</span>
            </div>
            <div className="flex justify-between text-noir-300">
              <span>Number of Items:</span>
              <span>{order.items.length}</span>
            </div>
            <div className="flex justify-between text-noir-300">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-noir-50 pt-3 border-t border-noir-800">
              <span>Total:</span>
              <span className="text-neon-cyan">{formatPrice(order.totalPrice)}</span>
            </div>
          </div>
        </div>

        {/* DELIVERY INFO */}
        <div className="bg-noir-900 rounded-xl border border-noir-800 p-6 mb-6">
          <h2 className="text-xl font-bold text-noir-50 mb-4">Delivery Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-noir-300">
              <span>Delivery Address:</span>
              <span className="text-noir-50">Saved Address</span>
            </div>
            <div className="flex justify-between text-noir-300">
              <span>Estimated Delivery:</span>
              <span className="text-noir-50">3–5 business days</span>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4">
          <Link
            to="/"
            className="flex-1 bg-neon-cyan text-noir-950 px-6 py-3 rounded-lg font-medium hover:bg-noir-50 transition-all duration-300 hover:scale-105 text-center"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="flex-1 bg-noir-800 text-noir-300 px-6 py-3 rounded-lg hover:bg-noir-700 transition-colors duration-300 text-center"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
