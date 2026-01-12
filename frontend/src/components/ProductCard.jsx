import React from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { addItemToStorage } from '../utils/cartStorage';

const ProductCard = ({ product }) => {
  const { addToast } = useToast();

  const handleAddToCart = () => {
    addItemToStorage(product);
    addToast('Added to cart!', 'success');
    // NO page reload, NO navigation, NO React state update
  };

  // Generate random rating for display purposes
  const generateRating = () => {
    const ratings = [3.5, 4, 4.5, 5];
    return ratings[Math.floor(Math.random() * ratings.length)];
  };

  const displayRating = product.rating || generateRating();
  const isInStock = !product.stock || product.stock > 0;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x300?text=Product';
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar && fullStars < 5) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-noir-600">☆</span>);
    }
    
    return stars;
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="group bg-noir-900 rounded-xl border border-noir-800 overflow-hidden hover:border-neon-cyan hover:shadow-lg hover:shadow-neon-cyan/20 transition-all duration-300 transform hover:scale-105">
      <div className="relative overflow-hidden">
        <img
          src={product.image || 'https://via.placeholder.com/300x300?text=Product'}
          alt={product.name || 'Product'}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={handleImageError}
        />
        {!isInStock && (
          <div className="absolute inset-0 bg-noir-950/80 flex items-center justify-center">
            <span className="text-noir-300 font-medium">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-noir-50 group-hover:text-neon-cyan transition-colors duration-300">
          <Link to={`/product/${product._id}`} className="hover:text-neon-cyan">
            {product.name || 'Product'}
          </Link>
        </h3>
        <p className="text-noir-400 text-sm mb-3 line-clamp-2">{product.description || 'No description'}</p>
        
        {/* Rating Display */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {renderStars(displayRating)}
            <span className="ml-2 text-noir-400 text-sm">({displayRating})</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-neon-cyan">{formatPrice(product.price || 0)}</span>
          <span className="text-sm text-noir-500">
            {isInStock ? 'In Stock' : `Stock: ${product.stock || 0}`}
          </span>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 bg-noir-800 text-noir-50 py-2 rounded-lg hover:bg-noir-700 text-center border border-noir-700 hover:border-neon-cyan transition-all duration-300"
          >
            View
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={!isInStock}
            className="flex-1 bg-neon-cyan text-noir-950 py-2 rounded-lg hover:bg-noir-50 font-medium disabled:bg-noir-800 disabled:text-noir-600 disabled:border-noir-700 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
          >
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
