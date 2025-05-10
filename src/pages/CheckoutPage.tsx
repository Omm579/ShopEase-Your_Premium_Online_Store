import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Check, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

enum CheckoutStep {
  SHIPPING = 'shipping',
  PAYMENT = 'payment',
  REVIEW = 'review'
}

export const CheckoutPage: React.FC = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.SHIPPING);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phone: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });
  const [shippingMethod, setShippingMethod] = useState('standard');

  // Calculate order summary
  const shipping = shippingMethod === 'express' ? 15.99 : (totalPrice > 50 ? 0 : 5.99);
  const tax = totalPrice * 0.08; // 8% tax rate
  const orderTotal = totalPrice + shipping + tax;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutStep.PAYMENT);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutStep.REVIEW);
  };

  const handlePlaceOrder = () => {
    // Here we would typically send the order to a backend
    // For now, we'll just simulate a successful order
    clearCart();
    navigate('/order-confirmation');
  };

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        {/* Checkout Progress */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep === CheckoutStep.SHIPPING ? 'bg-indigo-700 text-white' : 'bg-indigo-200 text-indigo-700'
            }`}>
              1
            </div>
            <span className={`ml-2 ${
              currentStep === CheckoutStep.SHIPPING ? 'font-semibold text-indigo-700' : 'text-gray-500'
            }`}>Shipping</span>
          </div>
          <div className="w-16 h-1 mx-2 bg-gray-200">
            <div className={`h-full ${
              currentStep !== CheckoutStep.SHIPPING ? 'bg-indigo-700' : 'bg-gray-200'
            }`}></div>
          </div>
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep === CheckoutStep.PAYMENT ? 'bg-indigo-700 text-white' : 
              currentStep === CheckoutStep.REVIEW ? 'bg-indigo-200 text-indigo-700' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <span className={`ml-2 ${
              currentStep === CheckoutStep.PAYMENT ? 'font-semibold text-indigo-700' : 
              currentStep === CheckoutStep.REVIEW ? 'text-indigo-700' : 'text-gray-500'
            }`}>Payment</span>
          </div>
          <div className="w-16 h-1 mx-2 bg-gray-200">
            <div className={`h-full ${
              currentStep === CheckoutStep.REVIEW ? 'bg-indigo-700' : 'bg-gray-200'
            }`}></div>
          </div>
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep === CheckoutStep.REVIEW ? 'bg-indigo-700 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
            <span className={`ml-2 ${
              currentStep === CheckoutStep.REVIEW ? 'font-semibold text-indigo-700' : 'text-gray-500'
            }`}>Review</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              {/* Shipping Information */}
              {currentStep === CheckoutStep.SHIPPING && (
                <form onSubmit={handleShippingSubmit}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingInfoChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingInfoChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-gray-700 mb-1">
                        Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingInfoChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingInfoChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="state" className="block text-gray-700 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={shippingInfo.state}
                          onChange={handleShippingInfoChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="zip" className="block text-gray-700 mb-1">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          value={shippingInfo.zip}
                          onChange={handleShippingInfoChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleShippingInfoChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingInfoChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Shipping Method
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="standard"
                        name="shippingMethod"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="standard" className="ml-2 block">
                        <span className="text-gray-800 font-medium">Standard Shipping</span>
                        <span className="block text-sm text-gray-500">3-5 business days</span>
                        <span className="block text-sm font-medium">
                          {totalPrice > 50 ? 'Free' : formatPrice(5.99)}
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="express"
                        name="shippingMethod"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="express" className="ml-2 block">
                        <span className="text-gray-800 font-medium">Express Shipping</span>
                        <span className="block text-sm text-gray-500">1-2 business days</span>
                        <span className="block text-sm font-medium">{formatPrice(15.99)}</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-medium rounded-md transition-colors flex items-center"
                    >
                      Continue to Payment
                      <ChevronRight className="ml-1 w-5 h-5" />
                    </button>
                  </div>
                </form>
              )}

              {/* Payment Information */}
              {currentStep === CheckoutStep.PAYMENT && (
                <form onSubmit={handlePaymentSubmit}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Payment Information
                  </h2>

                  <div className="mb-6">
                    <div className="bg-indigo-50 p-4 rounded-md flex items-start mb-6">
                      <CreditCard className="w-5 h-5 text-indigo-700 mt-0.5 flex-shrink-0" />
                      <p className="ml-3 text-indigo-800 text-sm">
                        All transactions are secure and encrypted. Credit card information is never stored on our servers.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardName" className="block text-gray-700 mb-1">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={paymentInfo.cardName}
                          onChange={handlePaymentInfoChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="cardNumber" className="block text-gray-700 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentInfoChange}
                          placeholder="XXXX XXXX XXXX XXXX"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expDate" className="block text-gray-700 mb-1">
                            Expiration Date *
                          </label>
                          <input
                            type="text"
                            id="expDate"
                            name="expDate"
                            value={paymentInfo.expDate}
                            onChange={handlePaymentInfoChange}
                            placeholder="MM/YY"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-gray-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={paymentInfo.cvv}
                            onChange={handlePaymentInfoChange}
                            placeholder="XXX"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(CheckoutStep.SHIPPING)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-md transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-medium rounded-md transition-colors flex items-center"
                    >
                      Review Order
                      <ChevronRight className="ml-1 w-5 h-5" />
                    </button>
                  </div>
                </form>
              )}

              {/* Order Review */}
              {currentStep === CheckoutStep.REVIEW && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Review Your Order
                  </h2>

                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 className="font-medium text-gray-800 mb-2">Shipping Information</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p>
                          {shippingInfo.firstName} {shippingInfo.lastName}
                        </p>
                        <p>{shippingInfo.address}</p>
                        <p>
                          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
                        </p>
                        <p>{shippingInfo.email}</p>
                        <p>{shippingInfo.phone}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-800 mb-2">Payment Information</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p>{paymentInfo.cardName}</p>
                        <p>
                          Card ending in {paymentInfo.cardNumber.slice(-4)}
                        </p>
                        <p>Exp: {paymentInfo.expDate}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-800 mb-2">Shipping Method</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p>
                          {shippingMethod === 'standard' ? 'Standard Shipping (3-5 business days)' : 
                           'Express Shipping (1-2 business days)'}
                        </p>
                        <p>
                          {shippingMethod === 'standard' && totalPrice > 50 ? 
                            'Free' : 
                            formatPrice(shippingMethod === 'standard' ? 5.99 : 15.99)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-8">
                    <h3 className="font-medium text-gray-800 mb-2">Order Items</h3>
                    {cartItems.map(item => (
                      <div key={item.product.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="w-12 h-12 flex-shrink-0 mr-4">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{item.product.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(CheckoutStep.PAYMENT)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-md transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      className="px-6 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-medium rounded-md transition-colors flex items-center"
                    >
                      Place Order
                      <Check className="ml-1 w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 pb-4 border-b border-gray-200 mb-4">
                Order Summary
              </h2>

              <div className="mb-4">
                <p className="text-gray-600 mb-2">Items ({cartItems.length}):</p>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.product.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 mr-2">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <p className="text-sm truncate max-w-[120px]">{item.product.name}</p>
                      </div>
                      <p className="text-sm font-medium">
                        {item.quantity} × {formatPrice(item.product.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};