import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

/**
 * Cart summary component displayed in the cart page
 * @param {Object} props
 * @param {number} props.subtotal - Cart subtotal
 * @param {number} props.shipping - Shipping cost
 * @param {number} props.tax - Tax amount
 * @param {number} props.total - Total cost
 * @param {Function} props.onCheckout - Checkout function
 */
const CartSummary = ({ 
  subtotal, 
  shipping = 0, 
  tax = 0, 
  total, 
  onCheckout 
}) => {
  return (
    <div className="rounded-lg bg-gray-50 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between text-base text-gray-700">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between text-base text-gray-700">
          <p>Shipping</p>
          <p>
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </p>
        </div>
        
        {shipping > 0 && (
          <div className="text-xs text-gray-500 -mt-3 ml-1">
            Free shipping on orders over $100
          </div>
        )}
        
        <div className="flex justify-between text-base text-gray-700">
          <p>Tax</p>
          <p>${tax.toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between text-base font-medium text-gray-900 border-t border-gray-200 pt-4">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <Button
          variant="primary"
          fullWidth
          size="lg"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        Shipping charges are calculated at checkout based on your location and delivery preferences.
      </div>
    </div>
  );
};

export default CartSummary; 