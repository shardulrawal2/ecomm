import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import SimpleCart from './components/SimpleCart';
import OrdersPage from './components/OrdersPage';
import OrderDetailPage from './components/OrderDetailPage';
import AdminProducts from './pages/AdminProducts';
console.log("API:", import.meta.env.VITE_API_BASE_URL);


function App() {
  return (
    <div className="app-dark">
      <ErrorBoundary>
        <Router>
          <ToastProvider>
            <AuthProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<SimpleCart />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/:id" element={<OrderDetailPage />} />
                <Route path="/admin/products" element={<AdminProducts />} />
              </Routes>
            </AuthProvider>
          </ToastProvider>
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
