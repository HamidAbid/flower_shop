import React from 'react';
import { motion } from 'framer-motion';

/**
 * Cart item component displayed in the cart page
 * @param {Object} props
 * @param {Object} props.item - The cart item
 * @param {Function} props.onUpdateQuantity - Function to update quantity
 * @param {Function} props.onRemove - Function to remove item from cart
 */
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center py-4 border-b border-gray-200"
    >
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.name}</h3>
            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            ${item.price.toFixed(2)} each
          </p>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center border rounded-md">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="p-2 text-gray-600 hover:text-gray-900"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="px-2">{item.quantity}</span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="font-medium text-primary hover:text-primary-dark"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem; 