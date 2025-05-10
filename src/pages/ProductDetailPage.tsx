import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, ArrowLeft, ChevronDown, ChevronUp, Check, Truck } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [expandedSection, setExpandedSection] = useState<string | null>('shipping');

  const product = id ? getProductById(id) : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <Link 
          to="/products" 
          className="inline-flex items-center text-indigo-700 hover:text-indigo-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-lg overflow-hidden shadow-md bg-white">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-96 object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-500 fill-yellow-500' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-gray-600">{product.rating} out of 5</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="text-3xl font-bold text-indigo-900 mb-2">
                {formatPrice(product.price)}
              </div>
              <div className="flex items-center">
                <div className={`w-3 h-3 mr-2 rounded-full ${
                  product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span>
                  {product.stock > 0 
                    ? `In Stock (${product.stock} available)` 
                    : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center">
                <button 
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  -
                </button>
                <input 
                  type="number" 
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 border-y border-gray-300 py-2 text-center focus:outline-none"
                />
                <button 
                  onClick={handleIncrement}
                  disabled={quantity >= product.stock}
                  className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-indigo-800 hover:bg-indigo-900 text-white rounded-md flex items-center justify-center transition-colors"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button
                className="flex-1 py-3 border border-indigo-800 text-indigo-800 hover:bg-indigo-50 rounded-md transition-colors"
              >
                Add to Wishlist
              </button>
            </div>

            <div className="space-y-3">
              <div 
                className="border border-gray-200 rounded-md overflow-hidden"
                onClick={() => toggleSection('shipping')}
              >
                <div className="flex justify-between items-center p-3 cursor-pointer bg-gray-50">
                  <div className="flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-indigo-700" />
                    <span className="font-medium">Shipping Information</span>
                  </div>
                  {expandedSection === 'shipping' ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                {expandedSection === 'shipping' && (
                  <div className="p-3 bg-white">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Free shipping on orders over $50</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Standard delivery: 3-5 business days</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Express delivery available at checkout</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div 
                className="border border-gray-200 rounded-md overflow-hidden"
                onClick={() => toggleSection('returns')}
              >
                <div className="flex justify-between items-center p-3 cursor-pointer bg-gray-50">
                  <div className="flex items-center">
                    <ArrowLeft className="w-5 h-5 mr-2 text-indigo-700" />
                    <span className="font-medium">Returns & Warranty</span>
                  </div>
                  {expandedSection === 'returns' ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                {expandedSection === 'returns' && (
                  <div className="p-3 bg-white">
                    <p className="text-gray-700 mb-2">
                      30-day money back guarantee. Return for any reason within 30 days for a full refund.
                    </p>
                    <p className="text-gray-700">
                      This product includes a 1-year manufacturer warranty.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-3 font-medium ${
                activeTab === 'description'
                  ? 'text-indigo-700 border-b-2 border-indigo-700'
                  : 'text-gray-600 hover:text-indigo-700'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`px-4 py-3 font-medium ${
                activeTab === 'specs'
                  ? 'text-indigo-700 border-b-2 border-indigo-700'
                  : 'text-gray-600 hover:text-indigo-700'
              }`}
              onClick={() => setActiveTab('specs')}
            >
              Specifications
            </button>
            <button
              className={`px-4 py-3 font-medium ${
                activeTab === 'reviews'
                  ? 'text-indigo-700 border-b-2 border-indigo-700'
                  : 'text-gray-600 hover:text-indigo-700'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="mb-4">
                  {product.description}
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
                  Sed euismod, nisl vel tincidunt luctus, nisl nisl aliquam nisl, vel 
                  aliquam nisl nisl vel nisl. Sed euismod, nisl vel tincidunt luctus, 
                  nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div>
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-3 py-3 w-1/4 text-sm font-medium text-gray-500 bg-gray-50">Category</td>
                      <td className="px-3 py-3 text-sm text-gray-900">{product.category}</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 w-1/4 text-sm font-medium text-gray-500 bg-gray-50">Dimensions</td>
                      <td className="px-3 py-3 text-sm text-gray-900">10 x 5 x 3 inches</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 w-1/4 text-sm font-medium text-gray-500 bg-gray-50">Weight</td>
                      <td className="px-3 py-3 text-sm text-gray-900">0.8 lbs</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 w-1/4 text-sm font-medium text-gray-500 bg-gray-50">Model Number</td>
                      <td className="px-3 py-3 text-sm text-gray-900">XYZ-123456</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 w-1/4 text-sm font-medium text-gray-500 bg-gray-50">Manufacturer</td>
                      <td className="px-3 py-3 text-sm text-gray-900">ShopEase Inc.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-3xl font-bold text-gray-800 mr-2">{product.rating}</span>
                  <span className="text-gray-600">out of 5</span>
                </div>

                <div className="mb-8">
                  <button className="px-6 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-md transition-colors">
                    Write a Review
                  </button>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-4 h-4 ${
                              i < 5 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="font-medium">John D.</span>
                      <span className="text-gray-500 text-sm ml-auto">2 weeks ago</span>
                    </div>
                    <h3 className="font-medium mb-2">Excellent product, highly recommended!</h3>
                    <p className="text-gray-700">
                      I've been using this for about two weeks now and it's exceeded my expectations. 
                      The quality is outstanding and it works exactly as described.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-4 h-4 ${
                              i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="font-medium">Sarah M.</span>
                      <span className="text-gray-500 text-sm ml-auto">1 month ago</span>
                    </div>
                    <h3 className="font-medium mb-2">Great value for the price</h3>
                    <p className="text-gray-700">
                      This product offers great value for the price. The shipping was fast and the 
                      packaging was excellent. Would buy from this company again.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Display 4 products from the same category */}
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <Link 
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">{relatedProduct.name}</h3>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">{relatedProduct.rating}</span>
                      </div>
                      <p className="font-bold text-indigo-900">
                        {formatPrice(relatedProduct.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};