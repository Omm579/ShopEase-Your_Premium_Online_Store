import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 40 hours of battery life.',
    price: 299.99,
    category: 'electronics',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    stock: 25,
    featured: true
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Advanced smartwatch with health monitoring and notification features.',
    price: 249.99,
    category: 'electronics',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5,
    stock: 18
  },
  {
    id: '3',
    name: 'Premium Cotton T-Shirt',
    description: 'Ultra-soft cotton t-shirt that provides maximum comfort all day long.',
    price: 29.99,
    category: 'clothing',
    image: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.3,
    stock: 50
  },
  {
    id: '4',
    name: 'Designer Jeans',
    description: 'Stylish designer jeans with perfect fit and premium quality denim.',
    price: 89.99,
    category: 'clothing',
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.6,
    stock: 30,
    featured: true
  },
  {
    id: '5',
    name: 'Bestselling Novel',
    description: 'Award-winning novel that has topped charts worldwide.',
    price: 19.99,
    category: 'books',
    image: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    stock: 45
  },
  {
    id: '6',
    name: 'Coffee Table',
    description: 'Modern design coffee table made from sustainable wood.',
    price: 199.99,
    category: 'home',
    image: 'https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.4,
    stock: 10,
    featured: true
  },
  {
    id: '7',
    name: 'Professional Camera',
    description: 'High-resolution digital camera perfect for professional photography.',
    price: 1299.99,
    category: 'electronics',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    stock: 8
  },
  {
    id: '8',
    name: 'Decorative Lamp',
    description: 'Stylish lamp that adds elegance to any room.',
    price: 79.99,
    category: 'home',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.2,
    stock: 15
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};