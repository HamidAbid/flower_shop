import React from 'react';
import { motion } from 'framer-motion';

/**
 * Button component with different variants and animations
 * @param {Object} props
 * @param {string} props.variant - 'primary', 'secondary', 'outline', 'text'
 * @param {string} props.size - 'sm', 'md', 'lg'
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {React.ReactNode} props.children - Button content
 * @param {function} props.onClick - Click handler
 * @param {string} props.type - Button type (button, submit)
 * @param {boolean} props.disabled - Whether button is disabled
 */
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  children, 
  onClick, 
  type = 'button',
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'font-medium rounded transition-colors focus:outline-none';
  
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark',
    outline: 'bg-transparent border border-primary text-primary hover:bg-primary hover:text-white',
    text: 'bg-transparent text-primary hover:text-primary-dark underline',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button; 