import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../utils/apiCalls';
import { useToast } from '../context/ToastContext';
import { getCartFromStorage, saveCartToStorage } from '../utils/cartStorage';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToast } = useToast();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
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
    // Add item with correct quantity
    const cart = getCartFromStorage();
    const existingItem = cart.find(item => item._id === product._id);
    
    let updatedCart;
    if (existingItem) {
      // Update existing item quantity
      updatedCart = cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Add new item with quantity
      updatedCart = [...cart, { ...product, quantity }];
    }
    
    saveCartToStorage(updatedCart);
    addToast(`Added ${quantity} item(s) to cart!`, 'success');
    // NO page reload, NO navigation, NO React state update
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x300?text=Product';
  };

  const isInStock = !product.stock || product.stock > 0;

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="page-dark">
      <div className="product-detail-card">
        <button
          onClick={() => navigate('/')}
          className="text-neon-cyan hover:text-noir-50 mb-6 transition-colors duration-300"
        >
          ← Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.image || 'https://via.placeholder.com/300x300?text=Product'}
              alt={product.name || 'Product'}
              className="w-full h-96 object-cover rounded-lg"
              onError={handleImageError}
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2 text-noir-50">{product.name || 'Product'}</h1>
            <p className="text-noir-400 mb-4">{product.category || 'General'}</p>

            <div className="mb-4">
              <span className="text-4xl font-bold text-neon-cyan">{formatPrice(product.price || 0)}</span>
              <p className="text-sm text-noir-500 mt-2">
                {isInStock ? 'In Stock' : `Stock: ${product.stock || 0}`}
              </p>
            </div>

            <p className="text-noir-300 mb-6 leading-relaxed">{product.description || 'No description available'}</p>

            <div className="mb-6">
              <label className="block text-noir-50 font-semibold mb-2">
                Quantity:
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-noir-800 text-noir-50 px-3 py-1 rounded-lg hover:bg-noir-700 transition-colors duration-300"
                >
                  -
                </button>
                <span className="text-xl font-semibold text-noir-50">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock || 1, quantity + 1))
                  }
                  className="bg-noir-800 text-noir-50 px-3 py-1 rounded-lg hover:bg-noir-700 transition-colors duration-300"
                  disabled={quantity >= (product.stock || 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!isInStock}
              className="w-full bg-neon-cyan text-noir-950 py-3 rounded-lg font-semibold hover:bg-noir-50 disabled:bg-noir-800 disabled:text-noir-600 disabled:cursor-not-allowed transition-all duration-300 mb-4"
            >
              Add to Cart
            </button>

            <div className="bg-noir-800 p-4 rounded-lg border border-noir-700">
              <p className="font-semibold mb-2 text-noir-50">Product Details:</p>
              <p className="text-noir-300">Rating: {product.rating || 'N/A'} / 5</p>
              <p className="text-noir-300">Reviews: {product.reviews || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
