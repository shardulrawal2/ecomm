import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
    alert('Added to cart!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          <Link to={`/product/${product._id}`} className="hover:text-blue-600">
            {product.name}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-center"
          >
            View
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
