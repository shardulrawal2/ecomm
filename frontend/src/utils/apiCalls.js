import api from './api';

/* ================= AUTH ================= */
export const register = (userData) =>
  api.post('/api/auth/register', userData);

export const login = (credentials) =>
  api.post('/api/auth/login', credentials);

export const getProfile = () =>
  api.get('/api/auth/profile');

/* ================= PRODUCTS ================= */
export const getAllProducts = (params) =>
  api.get('/api/products', { params });

export const getProductById = (id) =>
  api.get(`/api/products/${id}`);

export const createProduct = (productData) =>
  api.post('/api/products', productData);

export const updateProduct = (id, productData) =>
  api.put(`/api/products/${id}`, productData);

export const deleteProduct = (id) =>
  api.delete(`/api/products/${id}`);

/* ================= CART ================= */
export const addToCart = (cartData) =>
  api.post('/api/cart/add', cartData);

export const removeFromCart = (productId) =>
  api.post('/api/cart/remove', { productId });

export const updateCartQuantity = (productId, quantity) =>
  api.put('/api/cart/update', { productId, quantity });

export const getCart = () =>
  api.get('/api/cart');

export const clearCart = () =>
  api.delete('/api/cart/clear');

/* ================= ORDERS ================= */
export const createOrder = (orderData) =>
  api.post('/api/orders', orderData);

export const getUserOrders = () =>
  api.get('/api/orders');

export const getOrderById = (id) =>
  api.get(`/api/orders/${id}`);

export const updateOrderStatus = (id, status) =>
  api.put(`/api/orders/${id}`, { status });

export const getAllOrders = () =>
  api.get('/api/orders/all');
