import React from 'react';
import { format } from 'date-fns';

/**
 * A simple receipt component for orders that can be emailed to customers
 * @param {Object} props
 * @param {Object} props.order - Order details
 */
const OrderReceipt = ({ order }) => {
  if (!order) {
    return null;
  }
  
  const {
    id,
    orderNumber,
    date,
    customer,
    items = [],
    subtotal,
    tax,
    shipping,
    discount,
    total,
    paymentMethod,
    status
  } = order;
  
  // Calculate totals if not provided
  const calculatedSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const calculatedTotal = (subtotal || calculatedSubtotal) + (tax || 0) + (shipping || 0) - (discount || 0);
  
  // Format date
  const formattedDate = date ? format(new Date(date), 'dd MMM yyyy') : 'N/A';
  
  return (
    <div className="max-w-2xl mx-auto bg-white p-6">
      {/* Header with logo */}
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-gray-800 mb-1">Blossom Boutique</div>
        <div className="text-sm text-gray-600">Your Order Receipt</div>
      </div>
      
      {/* Order info */}
      <div className="border-t border-b border-gray-200 py-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Order Number:</div>
            <div className="font-medium">#{orderNumber || id}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Order Date:</div>
            <div className="font-medium">{formattedDate}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Order Status:</div>
            <div className="font-medium">{status ? status.charAt(0).toUpperCase() + status.slice(1) : 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Payment Method:</div>
            <div className="font-medium">{paymentMethod || 'N/A'}</div>
          </div>
        </div>
      </div>
      
      {/* Customer info */}
      <div className="mb-6">
        <div className="font-medium text-gray-800 mb-2">Customer Information</div>
        <div className="text-sm text-gray-600">
          <div>{customer?.name || 'N/A'}</div>
          <div>{customer?.email || 'N/A'}</div>
          <div>{customer?.phone || 'N/A'}</div>
        </div>
      </div>
      
      {/* Items */}
      <div className="mb-6">
        <div className="font-medium text-gray-800 mb-2">Order Items</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 font-medium text-gray-700">Item</th>
              <th className="text-center py-2 font-medium text-gray-700">Qty</th>
              <th className="text-right py-2 font-medium text-gray-700">Price</th>
              <th className="text-right py-2 font-medium text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-2 text-gray-800">
                  {item.name}
                  {item.variationName && (
                    <span className="text-gray-500"> ({item.variationName})</span>
                  )}
                </td>
                <td className="py-2 text-center text-gray-800">{item.quantity}</td>
                <td className="py-2 text-right text-gray-800">${item.price.toFixed(2)}</td>
                <td className="py-2 text-right text-gray-800">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Order summary */}
      <div className="mb-6">
        <div className="font-medium text-gray-800 mb-2">Order Summary</div>
        <div className="border-t border-gray-100">
          <div className="flex justify-between py-2 text-sm">
            <div className="text-gray-600">Subtotal:</div>
            <div className="text-gray-800">${(subtotal || calculatedSubtotal).toFixed(2)}</div>
          </div>
          
          {shipping !== undefined && (
            <div className="flex justify-between py-2 text-sm">
              <div className="text-gray-600">Shipping:</div>
              <div className="text-gray-800">${shipping.toFixed(2)}</div>
            </div>
          )}
          
          {tax !== undefined && (
            <div className="flex justify-between py-2 text-sm">
              <div className="text-gray-600">Tax:</div>
              <div className="text-gray-800">${tax.toFixed(2)}</div>
            </div>
          )}
          
          {discount !== undefined && discount > 0 && (
            <div className="flex justify-between py-2 text-sm">
              <div className="text-gray-600">Discount:</div>
              <div className="text-gray-800">-${discount.toFixed(2)}</div>
            </div>
          )}
          
          <div className="flex justify-between py-2 border-t border-gray-200 font-medium">
            <div>Total:</div>
            <div>${(total || calculatedTotal).toFixed(2)}</div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center text-sm text-gray-600 mt-8 pt-4 border-t border-gray-200">
        <p>Thank you for shopping with Blossom Boutique!</p>
        <p className="mt-1">If you have any questions about your order, please contact us at:</p>
        <p className="mt-1">contact@blossomboutique.com | +1 (555) 123-4567</p>
      </div>
    </div>
  );
};

export default OrderReceipt; 