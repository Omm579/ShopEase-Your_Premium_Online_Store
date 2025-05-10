import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold text-indigo-900 transition-colors"
          >
            ShopEase
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-800 hover:text-indigo-700 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-gray-800 hover:text-indigo-700 transition-colors"
            >
              Products
            </Link>
            <Link 
              to="/admin" 
              className="text-gray-800 hover:text-indigo-700 transition-colors"
            >
              Admin
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-8 pr-4 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-gray-800 hover:text-indigo-700 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative mr-4">
              <ShoppingCart className="text-gray-800" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              onClick={toggleMenu} 
              className="text-gray-800 focus:outline-none"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fadeIn">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-800 hover:text-indigo-700 transition-colors py-2"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-gray-800 hover:text-indigo-700 transition-colors py-2"
              >
                Products
              </Link>
              <Link 
                to="/admin" 
                className="text-gray-800 hover:text-indigo-700 transition-colors py-2"
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};