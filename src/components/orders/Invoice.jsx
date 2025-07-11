import React, { useRef } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

/**
 * Component to display a printable invoice for an order
 * @param {Object} props
 * @param {Object} props.order - Order details
 * @param {boolean} props.isPrinting - Whether the invoice is currently being printed
 * @param {Function} props.onPrint - Function to handle printing
 */
const Invoice = ({ order, isPrinting = false, onPrint = () => {} }) => {
  const invoiceRef = useRef(null);
  
  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500">No order selected</p>
      </div>
    );
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
    shippingAddress,
    billingAddress,
    status
  } = order;
  
  // Calculate totals if not provided
  const calculatedSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const calculatedTotal = (subtotal || calculatedSubtotal) + (tax || 0) + (shipping || 0) - (discount || 0);
  
  // Format date
  const formattedDate = date ? format(new Date(date), 'dd MMM yyyy') : 'N/A';
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${isPrinting ? 'print:shadow-none' : ''}`}
    >
      <div ref={invoiceRef} className="p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b pb-6">
          <div className="mb-4 sm:mb-0">
            <div className="text-2xl font-bold text-gray-800">INVOICE</div>
            <div className="text-gray-600">#{orderNumber || id}</div>
          </div>
          
          <div className="text-right">
            <div className="text-gray-600">
              <div>Date: {formattedDate}</div>
              <div className="mt-1">Status: <span className={`font-medium ${
                status === 'completed' ? 'text-green-600' :
                status === 'processing' ? 'text-blue-600' :
                status === 'cancelled' ? 'text-red-600' : 'text-gray-600'
              }`}>{status ? status.charAt(0).toUpperCase() + status.slice(1) : 'N/A'}</span></div>
            </div>
          </div>
        </div>
        
        {/* Company & Customer Info */}
        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <div className="font-bold text-gray-800 mb-1">From:</div>
            <div className="text-gray-600">
              <div>Blossom Boutique</div>
              <div>123 Floral Street</div>
              <div>Garden City, FL 33445</div>
              <div>contact@blossomboutique.com</div>
              <div>+1 (555) 123-4567</div>
            </div>
          </div>
          
          <div>
            <div className="font-bold text-gray-800 mb-1">Bill To:</div>
            <div className="text-gray-600">
              <div>{customer?.name || 'N/A'}</div>
              <div>{customer?.email || 'N/A'}</div>
              <div>{customer?.phone || 'N/A'}</div>
            </div>
          </div>
        </div>
        
        {/* Addresses */}
        <div className="flex flex-col sm:flex-row justify-between mb-8">
          {billingAddress && (
            <div className="mb-4 sm:mb-0">
              <div className="font-bold text-gray-800 mb-1">Billing Address:</div>
              <div className="text-gray-600">
                <div>{billingAddress.street}</div>
                <div>{billingAddress.city}, {billingAddress.state} {billingAddress.zip}</div>
                <div>{billingAddress.country}</div>
              </div>
            </div>
          )}
          
          {shippingAddress && (
            <div>
              <div className="font-bold text-gray-800 mb-1">Shipping Address:</div>
              <div className="text-gray-600">
                <div>{shippingAddress.street}</div>
                <div>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</div>
                <div>{shippingAddress.country}</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Items */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-800">Item</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-800">Quantity</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-800">Price</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-800">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-2 text-gray-800">
                    <div>{item.name}</div>
                    {item.variationName && (
                      <div className="text-sm text-gray-500">{item.variationName}</div>
                    )}
                  </td>
                  <td className="py-3 px-2 text-center text-gray-800">{item.quantity}</td>
                  <td className="py-3 px-2 text-right text-gray-800">${item.price.toFixed(2)}</td>
                  <td className="py-3 px-2 text-right text-gray-800">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Summary */}
        <div className="flex justify-end">
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="flex justify-between py-2 text-gray-600">
              <div>Subtotal:</div>
              <div>${(subtotal || calculatedSubtotal).toFixed(2)}</div>
            </div>
            
            {shipping !== undefined && (
              <div className="flex justify-between py-2 text-gray-600">
                <div>Shipping:</div>
                <div>${shipping.toFixed(2)}</div>
              </div>
            )}
            
            {tax !== undefined && (
              <div className="flex justify-between py-2 text-gray-600">
                <div>Tax:</div>
                <div>${tax.toFixed(2)}</div>
              </div>
            )}
            
            {discount !== undefined && discount > 0 && (
              <div className="flex justify-between py-2 text-gray-600">
                <div>Discount:</div>
                <div>-${discount.toFixed(2)}</div>
              </div>
            )}
            
            <div className="flex justify-between py-2 mt-2 border-t border-gray-200 font-bold text-gray-800">
              <div>Total:</div>
              <div>${(total || calculatedTotal).toFixed(2)}</div>
            </div>
          </div>
        </div>
        
        {/* Payment Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="mb-2 font-semibold text-gray-800">Payment Information:</div>
          <div className="text-gray-600">
            <div>Method: {paymentMethod || 'N/A'}</div>
            <div>Date: {formattedDate}</div>
            <div>Status: {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'N/A'}</div>
          </div>
        </div>
        
        {/* Notes */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="mb-2 font-semibold text-gray-800">Notes:</div>
          <div className="text-gray-600">
            <p>Thank you for your business! If you have any questions about this invoice, please contact our customer service.</p>
          </div>
        </div>
      </div>
      
      {/* Print Button - Hidden when printing */}
      {!isPrinting && (
        <div className="bg-gray-50 px-8 py-4 flex justify-end print:hidden">
          <button
            onClick={onPrint}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Print Invoice
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Invoice; 