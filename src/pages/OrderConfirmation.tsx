import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const OrderConfirmation: React.FC = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="mb-6 text-emerald-500">
          <CheckCircle className="w-20 h-20 mx-auto" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Thank You for Your Order!
        </h1>
        
        <p className="text-xl text-gray-600 mb-6">
          Your order has been received and is being processed.
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-600 mb-2">Order Number:</p>
          <p className="text-2xl font-bold text-indigo-900 mb-4">{orderNumber}</p>
          
          <p className="text-gray-600 mb-2">A confirmation email has been sent to your email address.</p>
          
          <div className="border-t border-gray-200 mt-6 pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">What's Next?</h2>
            <p className="text-gray-600">
              We're preparing your order for shipment. You will receive an email when your order has been shipped, with tracking information.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-medium rounded-md transition-colors flex items-center justify-center"
          >
            Continue Shopping
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link 
            to="/products" 
            className="px-6 py-3 border border-indigo-700 text-indigo-700 hover:bg-indigo-50 font-medium rounded-md transition-colors flex items-center justify-center"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};