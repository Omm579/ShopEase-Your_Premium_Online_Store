import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductList } from '../components/ProductList';
import { getFeaturedProducts } from '../data/products';

export const HomePage: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] bg-gradient-to-r from-indigo-900 to-blue-800 flex items-center">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight animate-fadeIn">
              Discover Quality Products for Every Need
            </h1>
            <p className="text-lg text-indigo-100 mb-8 animate-fadeIn animation-delay-100">
              Browse our carefully curated collection of premium products at competitive prices. Free shipping on orders over $50!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn animation-delay-200">
              <Link 
                to="/products" 
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md transition-colors duration-300 flex items-center justify-center"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/products" 
                className="px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-white/50 font-medium rounded-md transition-colors duration-300 flex items-center justify-center"
              >
                View Deals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <ProductList products={featuredProducts} title="Featured Products" />
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Electronics', image: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
              { name: 'Clothing', image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
              { name: 'Books', image: 'https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
              { name: 'Home', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
            ].map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="relative rounded-lg overflow-hidden group h-64"
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to upgrade your life?</h2>
          <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the perfect products for their needs. Sign up now for exclusive offers and updates!
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow py-3 px-4 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="bg-emerald-500 hover:bg-emerald-600 py-3 px-6 rounded-md font-medium transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};