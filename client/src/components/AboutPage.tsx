import React from 'react';
import { Building2, Award, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value }) => (
  <motion.div 
    className="bg-gray-700 rounded-lg p-6 border border-gray-600"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 text-emerald-400">{icon}</div>
      <h3 className="mb-2 font-semibold text-gray-300">{title}</h3>
      <p className="text-2xl font-bold text-emerald-400">{value}</p>
    </div>
  </motion.div>
);

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <motion.h1 
          className="mb-4 text-4xl font-bold text-emerald-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Our Store
        </motion.h1>
        <motion.p 
          className="mx-auto max-w-2xl text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome to your premier destination for luxury fashion. We curate the finest collection of clothing brands, 
          perfumes, watches, and glasses to bring you an unparalleled shopping experience.
        </motion.p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          icon={<Building2 size={32} />}
          title="Established"
          value="2020"
        />
        <StatsCard 
          icon={<Award size={32} />}
          title="Premium Brands"
          value="50+"
        />
        <StatsCard 
          icon={<Users size={32} />}
          title="Happy Customers"
          value="10,000+"
        />
        <StatsCard 
          icon={<Clock size={32} />}
          title="Years of Experience"
          value="4+"
        />
      </div>

      <motion.div 
        className="mt-16 grid gap-8 md:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <h2 className="mb-4 text-3xl font-bold text-gray-200">Our Mission</h2>
          <p className="text-gray-400">
            We strive to provide our customers with the finest selection of luxury goods while ensuring 
            an exceptional shopping experience. Our commitment to quality and authenticity sets us apart 
            in the fashion retail industry.
          </p>
        </div>
        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <h2 className="mb-4 text-3xl font-bold text-gray-200">Our Vision</h2>
          <p className="text-gray-400">
            To become the leading destination for luxury fashion and accessories, where customers can 
            discover and acquire the world's most prestigious brands with confidence and convenience.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;