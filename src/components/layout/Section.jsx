import React from 'react';
import { motion } from 'framer-motion';

/**
 * Section component for consistent page sections with optional animations
 * @param {Object} props
 * @param {React.ReactNode} props.children - Section content
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {string} props.className - Additional classes
 * @param {string} props.id - Section ID for navigation/animation
 * @param {string} props.background - Background style ('white', 'light', 'primary', 'dark')
 * @param {boolean} props.animate - Whether to animate the section
 */
const Section = ({ 
  children, 
  title, 
  subtitle,
  className = '', 
  id,
  background = 'white',
  animate = true,
  ...props 
}) => {
  const bgStyles = {
    white: 'bg-white',
    light: 'bg-gray-50',
    primary: 'bg-primary-50',
    dark: 'bg-gray-900 text-white'
  };
  
  return (
    <section 
      id={id}
      className={`py-16 px-4 ${bgStyles[background]} ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto">
        {title && (
          <motion.h2
            initial={animate ? { opacity: 0, y: 20 } : { opacity: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-4"
          >
            {title}
          </motion.h2>
        )}
        
        {subtitle && (
          <motion.p
            initial={animate ? { opacity: 0, y: 20 } : { opacity: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-600 text-center mb-12 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
        
        {children}
      </div>
    </section>
  );
};

export default Section; 