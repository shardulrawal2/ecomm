import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCartCount } from '../utils/cartStorage';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Static cart count - NO React state, NO re-renders
  const cartCount = getCartCount();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-noir-950 border-b border-noir-800 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-noir-50 hover:text-neon-cyan transition-colors duration-300">
            ACMzon
          </Link>

          <div className="flex items-center gap-8">
            <Link to="/" className="text-noir-200 hover:text-neon-cyan transition-colors duration-300">
              Home
            </Link>

            <Link to="/cart" className="relative text-noir-200 hover:text-neon-cyan transition-colors duration-300">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-neon-cyan text-noir-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-glow">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <Link to="/orders" className="text-noir-200 hover:text-neon-cyan transition-colors duration-300">
                  Orders
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin/products" className="text-noir-200 hover:text-neon-cyan transition-colors duration-300">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-noir-800 text-noir-200 px-4 py-2 rounded-lg hover:bg-noir-700 border border-noir-700 hover:border-neon-cyan transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-noir-200 hover:text-neon-cyan transition-colors duration-300">
                  Login
                </Link>
                <Link to="/register" className="bg-neon-cyan text-noir-950 px-4 py-2 rounded-lg hover:bg-noir-50 font-medium transition-all duration-300 hover:scale-105">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
