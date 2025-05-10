import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

export const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(product.id, quantity - 1);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200 animate-fadeIn">
      <div className="flex-shrink-0 w-full sm:w-20 h-20 mb-3 sm:mb-0 mr-0 sm:mr-4">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover rounded-md"
          />
        </Link>
      </div>
      
      <div className="flex-grow mb-3 sm:mb-0">
        <Link 
          to={`/product/${product.id}`}
          className="text-lg font-medium text-gray-800 hover:text-indigo-700 transition-colors"
        >
          {product.name}
        </Link>
        <p className="text-sm text-gray-600">Category: {product.category}</p>
        <p className="text-indigo-900 font-bold">{formatPrice(product.price)}</p>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center border border-gray-300 rounded-md mr-4">
          <button 
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="px-2 py-1 text-gray-600 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button 
            onClick={handleIncrement}
            className="px-2 py-1 text-gray-600 hover:text-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <button 
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};