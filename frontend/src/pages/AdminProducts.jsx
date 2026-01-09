import React, { useState, useEffect } from 'react';
import { getAllProducts, createProduct, deleteProduct } from '../utils/apiCalls';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import ProtectedRoute from '../components/ProtectedRoute';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getAllProducts({});
      setProducts(response.data.products);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };

      await createProduct(productData);
      alert('Product added successfully');
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: '',
      });
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await deleteProduct(id);
      alert('Product deleted successfully');
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
    }
  };

  if (loading) return <Loading />;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin - Product Management</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              {showForm ? 'Cancel' : '+ Add Product'}
            </button>
          </div>

          {error && <ErrorMessage message={error} onClose={() => setError('')} />}

          {showForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
              <form onSubmit={handleAddProduct}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="px-4 py-2 border border-gray-300 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="px-4 py-2 border border-gray-300 rounded"
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleFormChange}
                    className="px-4 py-2 border border-gray-300 rounded"
                    step="0.01"
                    required
                  />
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleFormChange}
                    className="px-4 py-2 border border-gray-300 rounded"
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleFormChange}
                    className="col-span-full px-4 py-2 border border-gray-300 rounded"
                    rows="3"
                    required
                  />
                  <input
                    type="url"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleFormChange}
                    className="col-span-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Add Product
                </button>
              </form>
            </div>
          )}

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Category</th>
                  <th className="px-6 py-3 text-left font-semibold">Price</th>
                  <th className="px-6 py-3 text-left font-semibold">Stock</th>
                  <th className="px-6 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{product.name}</td>
                    <td className="px-6 py-3">{product.category}</td>
                    <td className="px-6 py-3">${product.price}</td>
                    <td className="px-6 py-3">{product.stock}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminProducts;
