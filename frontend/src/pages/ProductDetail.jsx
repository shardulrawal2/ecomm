import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../utils/apiCalls';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getProductById(id);
      setProduct(response.data.product);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:underline mb-6"
        >
          ← Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.category}</p>

            <div className="mb-4">
              <span className="text-4xl font-bold text-blue-600">${product.price}</span>
              <p className="text-sm text-gray-500 mt-2">Stock: {product.stock}</p>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Quantity:
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                >
                  -
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-green-500 text-white py-3 rounded font-semibold hover:bg-green-600 disabled:bg-gray-400 mb-4"
            >
              Add to Cart
            </button>

            <div className="bg-blue-50 p-4 rounded text-sm text-gray-700">
              <p className="font-semibold mb-2">Product Details:</p>
              <p>Rating: {product.rating} / 5</p>
              <p>Reviews: {product.reviews}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
