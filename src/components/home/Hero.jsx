import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative h-[600px] bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519683109079-d5f539e1542f?q=80&w=1470&auto=format&fit=crop')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-white"
        >
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Flower Shop</h1>
          <p className="text-xl mb-8">Discover the perfect flowers for every occasion</p>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold"
            >
              Shop Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero; 