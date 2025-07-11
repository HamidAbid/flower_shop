import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../common/ProductCard';
import Button from '../ui/Button';

/**
 * Component for displaying quiz results and recommended products
 * @param {Object} props
 * @param {Array} props.results - Quiz results and analysis
 * @param {Array} props.recommendedProducts - Recommended products based on quiz
 * @param {Function} props.onRetakeQuiz - Function to retake the quiz
 */
const QuizResult = ({ 
  results, 
  recommendedProducts, 
  onRetakeQuiz,
  favorites = [],
  onToggleFavorite
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4"
    >
      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 text-primary-800 rounded-full mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Your Flower Quiz Results
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Based on your answers, we've analyzed your preferences and selected the perfect flowers for you.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Your Flower Profile
          </h3>
          
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">{result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <Button
            variant="outline"
            onClick={onRetakeQuiz}
          >
            Retake Quiz
          </Button>
        </div>
      </div>
      
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Recommended For You
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <ProductCard
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="text-center mb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Want to explore more options?
        </h3>
        <Link to="/products">
          <Button variant="primary">Browse All Products</Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default QuizResult; 