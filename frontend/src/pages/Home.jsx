import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getAllProducts } from '../utils/apiCalls';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Store all products for client-side filtering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []); // Only fetch on initial mount

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (selectedCategory && selectedCategory !== '') params.category = selectedCategory;
      if (searchTerm && searchTerm.trim() !== '') params.search = searchTerm;

      console.log('Fetching products with params:', params);
      const response = await getAllProducts(params);
      console.log('API response:', response);
      console.log('Products array:', response.data.products);
      const fetchedProducts = response.data.products || [];
      setAllProducts(fetchedProducts);
      setProducts(fetchedProducts);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Client-side filtering
  useEffect(() => {
    let filteredProducts = allProducts;

    // Filter by category
    if (selectedCategory && selectedCategory.trim() !== '') {
      filteredProducts = filteredProducts.filter(product => 
        product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm && searchTerm.trim() !== '') {
      filteredProducts = filteredProducts.filter(product =>
        (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setProducts(filteredProducts);
  }, [selectedCategory, searchTerm, allProducts]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is already handled by useEffect above
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const categories = [...new Set(allProducts.map((p) => p.category).filter(Boolean))];

  if (loading) return <Loading type="skeleton" />;

  return (
    <div className="min-h-screen bg-noir-950">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-noir-50 bg-gradient-to-r from-noir-50 to-neon-cyan bg-clip-text text-transparent">
          Welcome to ACMazon
        </h1>

        {error && <ErrorMessage message={error} onClose={() => setError('')} />}

        <div className="mb-8 flex gap-4 flex-col md:flex-row">
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-noir-900 border border-noir-700 rounded-lg text-noir-50 placeholder-noir-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all duration-300"
            />
          </form>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-noir-900 border border-noir-700 rounded-lg text-noir-50 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all duration-300"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-noir-400 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
