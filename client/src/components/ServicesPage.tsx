import React from 'react';
import { Shirt, Watch, Glasses, Sparkles, Users, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => (
  <motion.div 
    className="bg-gray-700 rounded-lg p-6 border border-gray-600 hover:border-emerald-400 transition-colors"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="mb-4 text-emerald-400">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-gray-200">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const ServicesPage: React.FC = () => {
  const services = [
    {
      icon: <Shirt size={32} />,
      title: "Premium Clothing",
      description: "Discover the latest collections from top fashion brands, featuring both casual and formal wear for all occasions."
    },
    {
      icon: <Watch size={32} />,
      title: "Luxury Watches",
      description: "Explore our curated selection of prestigious timepieces from world-renowned watchmakers."
    },
    {
      icon: <Sparkles size={32} />,
      title: "Designer Perfumes",
      description: "Experience a wide range of exclusive fragrances from leading luxury brands worldwide."
    },
    {
      icon: <Glasses size={32} />,
      title: "Fashion Eyewear",
      description: "Browse our collection of designer sunglasses and optical frames from premium brands."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <motion.h1 
          className="mb-4 text-4xl font-bold text-emerald-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h1>
        <motion.p 
          className="mx-auto max-w-2xl text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore our premium selection of fashion items and luxury accessories, 
          backed by exceptional customer service and expertise.
        </motion.p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard 
            key={index} 
            {...service} 
            delay={0.2 + index * 0.1}
          />
        ))}
      </div>

      <div className="mt-16">
        <motion.h2 
          className="mb-8 text-center text-3xl font-bold text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Additional Services
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div 
            className="bg-gray-700 rounded-lg p-6 border border-gray-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Users className="text-emerald-400" size={32} />
              <h3 className="text-xl font-bold text-gray-200">Personal Shopping</h3>
            </div>
            <p className="text-gray-400">
              Get personalized assistance from our fashion experts who will help you 
              find the perfect items to match your style and preferences.
            </p>
          </motion.div>
          <motion.div 
            className="bg-gray-700 rounded-lg p-6 border border-gray-600"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Truck className="text-emerald-400" size={32} />
              <h3 className="text-xl font-bold text-gray-200">Express Delivery</h3>
            </div>
            <p className="text-gray-400">
              Enjoy fast and secure delivery services for all your purchases, 
              with tracking available every step of the way.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;