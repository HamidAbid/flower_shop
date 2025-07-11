import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProductGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="w-full md:w-1/2 mb-6 md:mb-0">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-4 h-96 rounded-lg overflow-hidden"
      >
        <img
          src={images[activeImage]}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border-2 ${
              activeImage === index ? 'border-primary' : 'border-transparent'
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery; 