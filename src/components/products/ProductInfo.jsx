import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';

const ProductInfo = ({ 
  product, 
  quantity, 
  setQuantity, 
  isFavorite,
  toggleFavorite,
  onAddToCart,
  averageRating
}) => {
  return (
    <div className="w-full md:w-1/2 md:pl-8">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <button
            onClick={() => toggleFavorite(product.id)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {isFavorite ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-gray-400 text-xl" />
            )}
          </button>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`${
                  i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600">
            {averageRating.toFixed(1)} ({product.reviews.length} reviews)
          </span>
        </div>
        
        <p className="text-2xl font-semibold text-primary mb-4">
          ${product.price.toFixed(2)}
        </p>
        
        <p className="text-gray-600 mb-6">{product.description}</p>
        
        <div className="mb-6">
          <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
            Quantity
          </label>
          <div className="flex items-center">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100"
            >
              -
            </button>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center border-t border-b border-gray-300 py-1"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <button
            onClick={onAddToCart}
            className="w-full py-3 px-6 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Add to Cart
          </button>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold mb-4">Details</h2>
          <p className="text-gray-600 mb-4">{product.details}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductInfo; 