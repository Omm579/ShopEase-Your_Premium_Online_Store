import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItemComponent } from '../components/CartItem';

export const CartPage: React.FC = () => {
  const { cartItems, totalPrice, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Calculate shipping, tax, and total
  const shipping = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08; // 8% tax rate
  const orderTotal = totalPrice + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-indigo-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet. Explore our products and find something you love!
          </p>
          <Link 
            to="/products" 
            className="inline-flex items-center px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-md transition-colors"
          >
            Start Shopping
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Cart Items ({cartItems.length})
                </h2>
                <button 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              <div>
                {cartItems.map((item) => (
                  <CartItemComponent key={item.product.id} item={item} />
                ))}
              </div>
            </div>

            <div className="bg-indigo-50 rounded-lg p-5">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-indigo-700 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="font-medium text-indigo-900 mb-1">Free Shipping!</h3>
                  <p className="text-indigo-800 text-sm">
                    Orders over $50 qualify for free shipping. Add ${Math.max(0, 50 - totalPrice).toFixed(2)} more to your cart to qualify.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 pb-4 border-b border-gray-200 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span className="font-medium">{formatPrice(shipping)}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-xl font-bold text-indigo-900">
                      {formatPrice(orderTotal)}
                    </span>
                  </div>
                </div>
              </div>

              <Link 
                to="/checkout" 
                className="block w-full py-3 bg-indigo-800 hover:bg-indigo-900 text-white font-medium rounded-md text-center transition-colors mb-4"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="block w-full py-3 border border-indigo-700 text-indigo-700 hover:bg-indigo-50 font-medium rounded-md text-center transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};