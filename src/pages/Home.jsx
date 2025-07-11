import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Components
import Hero from '../components/home/Hero';
import QuickLinks from '../components/home/QuickLinks';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ShopByOccasion from '../components/home/ShopByOccasion';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

// Data
import { featuredProducts, occasions, testimonials } from '../utils/sampleData';

const Home = () => {
  const [favorites, setFavorites] = useState([]);
  const [isVisible, setIsVisible] = useState({
    quickLinks: false,
    featuredProducts: false,
    occasions: false,
    customBouquet: false,
    testimonials: false,
    newsletter: false
  });
  
  // Visibility observer effect
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe elements
    const sections = [
      'quickLinks', 'featuredProducts', 
      'occasions', 'customBouquet', 'testimonials', 'newsletter'
    ];
    
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });
    
    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, []);
  
  // Handle favorite toggle with animation
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <QuickLinks isVisible={isVisible.quickLinks} />
      <FeaturedProducts 
        products={featuredProducts} 
        favorites={favorites} 
        toggleFavorite={toggleFavorite} 
      />
      <ShopByOccasion occasions={occasions} />
      <Testimonials testimonials={testimonials} />
      <Newsletter />
    </div>
  );
};

export default Home; 