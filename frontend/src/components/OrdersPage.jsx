import React from 'react';
import { Link } from 'react-router-dom';

const Orders = () => {
  // Read orders from localStorage
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-noir-950 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-noir-50">My Orders</h1>
          <div className="text-center py-16 bg-noir-900 rounded-xl border border-noir-800">
            <p className="text-noir-400 text-xl mb-4">No orders yet</p>
            <Link
              to="/"
              className="bg-neon-cyan text-noir-950 px-8 py-3 rounded-lg font-medium hover:bg-noir-50 transition-all duration-300 hover:scale-105"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noir-950 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-noir-50">My Orders</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-noir-900 p-6 rounded-xl border border-noir-800 hover:border-neon-cyan hover:shadow-lg hover:shadow-neon-cyan/20 transition-all duration-300 block"
            >
              <Link to={`/orders/${order.id}`} className="block">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-noir-400 text-sm">Order ID: {order.id}</p>
                    <p className="text-noir-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-white text-sm font-medium ${
                      order.status === 'delivered'
                        ? 'bg-green-600'
                        : order.status === 'cancelled'
                        ? 'bg-red-600'
                        : 'bg-blue-600'
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-noir-400 text-sm">Items</p>
                    <p className="text-lg font-semibold text-noir-50">{order.items.length}</p>
                  </div>
                  <div>
                    <p className="text-noir-400 text-sm">Total</p>
                    <p className="text-lg font-semibold text-neon-cyan">
                      {formatPrice(order.totalPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-noir-400 text-sm">Payment</p>
                    <p className="text-lg font-semibold text-noir-50">Cash on Delivery</p>
                  </div>
                  <div className="text-right">
                    <p className="text-neon-cyan font-semibold">View Details →</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-noir-800">
                  <h3 className="text-lg font-semibold text-noir-50 mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <img
                          src={item.image || 'https://via.placeholder.com/50x50?text=Product'}
                          alt={item.name || 'Product'}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-noir-50 font-medium">{item.name || 'Product'}</p>
                          <p className="text-noir-400 text-sm">Qty: {item.quantity || 1}</p>
                          <p className="text-neon-cyan font-semibold">{formatPrice(item.price || 0)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
