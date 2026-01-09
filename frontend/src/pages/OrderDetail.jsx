import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../utils/apiCalls';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import ProtectedRoute from '../components/ProtectedRoute';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getOrderById(id);
      setOrder(response.data.order);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch order');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!order) return <div className="text-center py-12">Order not found</div>;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Order Details</h1>

            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
              <div>
                <p className="text-gray-600 text-sm">Order ID</p>
                <p className="text-lg font-semibold">{order._id}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Order Date</p>
                <p className="text-lg font-semibold">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <p
                  className={`text-lg font-semibold ${
                    order.status === 'delivered'
                      ? 'text-green-600'
                      : order.status === 'cancelled'
                      ? 'text-red-600'
                      : 'text-blue-600'
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Payment Status</p>
                <p className="text-lg font-semibold">{order.paymentStatus}</p>
              </div>
            </div>

            <div className="mb-6 pb-6 border-b">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{order.shippingAddress}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <p className="font-semibold">{item.productName}</p>
                      <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-gray-600 text-sm">${item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default OrderDetail;
