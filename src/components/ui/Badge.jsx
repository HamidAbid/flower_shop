import React from 'react';

/**
 * Badge component for displaying status or labels
 * @param {Object} props
 * @param {string} props.variant - 'primary', 'success', 'warning', 'error', 'info'
 * @param {React.ReactNode} props.children - Badge content
 * @param {string} props.className - Additional classes
 */
const Badge = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const variantStyles = {
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };
  
  return (
    <span 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge; 