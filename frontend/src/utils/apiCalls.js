import api from './api';

// Auth
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const getProfile = () => api.get('/auth/profile');

// Products
export const getAllProducts = (params) => api.get('/products', { params });
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (productData) => api.post('/products', productData);
export const updateProduct = (id, productData) => api.put(`/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Cart
export const addToCart = (cartData) => api.post('/cart/add', cartData);
export const removeFromCart = (productId) => api.post('/cart/remove', { productId });
export const updateCartQuantity = (productId, quantity) =>
  api.put('/cart/update', { productId, quantity });
export const getCart = () => api.get('/cart');
export const clearCart = () => api.delete('/cart/clear');

// Orders
export const createOrder = (shippingAddress) => api.post('/orders', { shippingAddress });
export const getUserOrders = () => api.get('/orders');
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}`, { status });
export const getAllOrders = () => api.get('/orders/all');
