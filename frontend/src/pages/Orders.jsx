import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../utils/apiCalls';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import ProtectedRoute from '../components/ProtectedRoute';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getUserOrders();
      setOrders(response.data.orders || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-noir-950 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-noir-50">My Orders</h1>

          {error && <ErrorMessage message={error} onClose={() => setError('')} />}

          {orders.length === 0 ? (
            <div className="text-center py-12 bg-noir-900 rounded-xl border border-noir-800">
              <p className="text-noir-400 text-lg mb-4">You haven't placed any orders yet</p>
              <Link
                to="/"
                className="bg-neon-cyan text-noir-950 px-6 py-2 rounded-lg hover:bg-noir-50 font-medium transition-all duration-300 hover:scale-105"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  key={order._id}
                  to={`/orders/${order._id}`}
                  className="bg-noir-900 p-6 rounded-xl border border-noir-800 hover:border-neon-cyan hover:shadow-lg hover:shadow-neon-cyan/20 transition-all duration-300 block"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-noir-400 text-sm">Order ID: {order._id}</p>
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
                      <p className="text-lg font-semibold text-noir-50">{order.items?.length || 0}</p>
                    </div>
                    <div>
                      <p className="text-noir-400 text-sm">Total</p>
                      <p className="text-lg font-semibold text-neon-cyan">
                        {formatPrice(order.totalPrice || 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-noir-400 text-sm">Payment</p>
                      <p className="text-lg font-semibold text-noir-50">{order.paymentStatus || 'Pending'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-neon-cyan font-semibold">View Details →</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Orders;
