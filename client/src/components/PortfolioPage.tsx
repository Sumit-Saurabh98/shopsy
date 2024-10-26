import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  brand: string;
  image: string;
}

const PortfolioPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'clothing', 'watches', 'perfumes', 'glasses'];

  const products: Product[] = [
    {
      id: 1,
      name: "Designer Suit",
      category: "clothing",
      price: 999.99,
      brand: "Hugo Boss",
      image: "https://res.cloudinary.com/sumitsaurabh/image/upload/v1729210643/products/sd2rfhvo7ra2mpao3tso.jpg"
    },
    {
      id: 2,
      name: "Chronograph Watch",
      category: "watches",
      price: 1499.99,
      brand: "Tag Heuer",
      image: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      name: "Luxury Perfume",
      category: "perfumes",
      price: 199.99,
      brand: "Tom Ford",
      image: "https://res.cloudinary.com/sumitsaurabh/image/upload/v1729209872/products/ktl2xwlgsplg63ehe7wc.jpg"
    },
    {
      id: 4,
      name: "Designer Sunglasses",
      category: "glasses",
      price: 299.99,
      brand: "Ray-Ban",
      image: "https://res.cloudinary.com/sumitsaurabh/image/upload/v1729192486/products/pf6dur1hmxgxgexude5n.jpg"
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <motion.h1 
          className="mb-4 text-4xl font-bold text-emerald-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Collection
        </motion.h1>
        <motion.p 
          className="mx-auto max-w-2xl text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore our carefully curated selection of premium fashion items and accessories.
        </motion.p>
      </div>

      <motion.div 
        className="mb-8 flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-6 py-2 text-sm font-medium capitalize transition-colors
              ${selectedCategory === category 
                ? 'bg-emerald-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
              }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600 hover:border-emerald-400 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-64 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-200">{product.name}</h3>
              <p className="text-sm text-gray-400">{product.brand}</p>
              <p className="mt-2 text-lg font-bold text-emerald-400">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;