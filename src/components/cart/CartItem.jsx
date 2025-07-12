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
  const itemId = item._id || item.id;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col sm:flex-row items-center py-4 border-b border-gray-200 gap-4"
    >
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.image || '/placeholder.jpg'}
          alt={item.name || 'Product'}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="flex-1 w-full sm:ml-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="truncate">{item.name || 'Unnamed Product'}</h3>
            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">${item.price?.toFixed(2)} each</p>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center border rounded-md">
            <button
              type="button"
              onClick={() => onUpdateQuantity(itemId, Math.max(1, item.quantity - 1))}
              className="px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <motion.span
              key={item.quantity}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="px-3"
            >
              {item.quantity}
            </motion.span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(itemId, item.quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:text-gray-900"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => onRemove(itemId)}
            className="ml-4 font-medium text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
