import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductList } from '../components/ProductList';
import { products } from '../data/products';
import { CategoryType } from '../types';

export const ProductsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category') as CategoryType | null;
  
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    categoryParam
  );

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Filter products by category if one is selected
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="pt-20 pb-16">
      <ProductList 
        products={filteredProducts} 
        title={selectedCategory 
          ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products` 
          : "All Products"
        } 
      />
    </div>
  );
};