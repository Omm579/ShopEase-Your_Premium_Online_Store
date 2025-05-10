import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">ShopEase</h3>
            <p className="text-indigo-200 mb-4">
              Discover quality products for every need. Our mission is to provide exceptional shopping experience with premium products at competitive prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-indigo-300 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-indigo-300 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-indigo-300 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-indigo-300 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-indigo-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-indigo-200 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/products?category=electronics" className="text-indigo-200 hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=clothing" className="text-indigo-200 hover:text-white transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/products?category=books" className="text-indigo-200 hover:text-white transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/products?category=home" className="text-indigo-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 flex-shrink-0 text-emerald-400" />
                <span className="text-indigo-200">
                  123 Commerce St, Shopping District, City, 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 flex-shrink-0 text-emerald-400" />
                <span className="text-indigo-200">
                  (555) 123-4567
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 flex-shrink-0 text-emerald-400" />
                <span className="text-indigo-200">
                  support@shopease.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-indigo-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-indigo-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="Apple Pay" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};