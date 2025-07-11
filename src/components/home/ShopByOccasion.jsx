import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ShopByOccasion = ({ occasions }) => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-12"
      >
        Shop by Occasion
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {occasions.map((occasion, index) => (
          <motion.div
            key={occasion.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="relative h-64 rounded-lg overflow-hidden"
          >
            <Link to={occasion.url}>
              <img
                src={occasion.image}
                alt={occasion.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <motion.h3 
                  whileHover={{ scale: 1.1 }}
                  className="text-white text-2xl font-bold"
                >
                  {occasion.name}
                </motion.h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ShopByOccasion; 