import React from 'react';
import PropTypes from 'prop-types';
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
  subtotal = 0, 
  shipping = 0, 
  tax = 0, 
  total = 0, 
  onCheckout 
}) => {
  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600 font-medium">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        {shipping > 0 && (
          <p className="text-xs text-gray-500 -mt-3 ml-1">
            Free shipping on orders over $100
          </p>
        )}

        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 pt-4 flex justify-between text-base font-semibold text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="primary"
          fullWidth
          size="lg"
          onClick={onCheckout}
          aria-label="Proceed to checkout"
        >
          Proceed to Checkout
        </Button>
      </div>

      <p className="mt-4 text-xs text-center text-gray-500 leading-relaxed">
        Shipping charges are calculated at checkout based on your location and delivery preferences.
      </p>
    </div>
  );
};

CartSummary.propTypes = {
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  tax: PropTypes.number,
  total: PropTypes.number,
  onCheckout: PropTypes.func.isRequired,
};

export default CartSummary;
