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

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getUserOrders();
      setOrders(response.data.orders);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>

          {error && <ErrorMessage message={error} onClose={() => setError('')} />}

          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600 text-lg mb-4">You haven't placed any orders yet</p>
              <Link
                to="/"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
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
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition block"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                      <p className="text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded text-white ${
                        order.status === 'delivered'
                          ? 'bg-green-500'
                          : order.status === 'cancelled'
                          ? 'bg-red-500'
                          : 'bg-blue-500'
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm">Items</p>
                      <p className="text-lg font-semibold">{order.items.length}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Total</p>
                      <p className="text-lg font-semibold text-blue-600">
                        ${order.totalPrice.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Payment</p>
                      <p className="text-lg font-semibold">{order.paymentStatus}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-600 font-semibold">View Details →</p>
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
