import React from 'react';
import { format } from 'date-fns';
import { FaDownload, FaPrint, FaTag, FaCreditCard, FaShippingFast, FaMapMarkerAlt } from 'react-icons/fa';

/**
 * A component for displaying detailed order information
 * @param {Object} props
 * @param {Object} props.order - Complete order information
 * @param {boolean} props.isAdmin - Whether viewing as admin (shows more details)
 * @param {Function} props.onPrintLabel - Optional callback for printing shipping label
 */
const OrderSummary = ({ order, isAdmin = false, onPrintLabel }) => {
  if (!order) {
    return (
      <div className="text-center p-8 text-gray-500">
        No order selected or information unavailable
      </div>
    );
  }

  // Format currency helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Format date helper
  const formatDate = (date) => {
    return date ? format(new Date(date), 'dd MMM yyyy') : '';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Order header */}
      <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Order #{order.orderNumber || order.id}</h2>
          <p className="text-sm text-gray-600 mt-1">Placed on {formatDate(order.date)}</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <div className={`px-3 py-1 text-sm rounded-full ${
            order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {order.status === 'delivered' ? 'Delivered' :
             order.status === 'shipped' ? 'Shipped' :
             order.status === 'processing' ? 'Processing' :
             order.status === 'cancelled' ? 'Cancelled' :
             'Pending'}
          </div>
          
          {isAdmin && onPrintLabel && (
            <button 
              onClick={onPrintLabel}
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
            >
              <FaPrint className="mr-1" /> Print Label
            </button>
          )}
          
          {isAdmin && (
            <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
              <FaDownload className="mr-1" /> Invoice
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order items */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">Items</h3>
            <div className="space-y-4">
              {order.items && order.items.map((item, index) => (
                <div key={index} className="flex border-b border-gray-100 pb-4 last:border-0">
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <FaTag size={24} />
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(item.price)} x {item.quantity}
                    </p>
                    {item.options && item.options.length > 0 && (
                      <div className="mt-1 text-xs text-gray-500">
                        {item.options.map((option, i) => (
                          <span key={i} className="inline-block mr-2">
                            {option.name}: {option.value}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Delivery notes */}
            {order.deliveryNote && (
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h4 className="font-medium mb-2">Delivery Notes</h4>
                <p className="text-sm text-gray-600">{order.deliveryNote}</p>
              </div>
            )}
            
            {/* Gift message */}
            {order.giftMessage && (
              <div className="mt-4 p-4 bg-pink-50 rounded-md border border-pink-100">
                <h4 className="font-medium mb-2 text-pink-700">Gift Message</h4>
                <p className="text-sm italic">"{order.giftMessage}"</p>
                {order.giftFrom && (
                  <p className="text-sm mt-2">From: {order.giftFrom}</p>
                )}
              </div>
            )}
          </div>
          
          {/* Order summary, shipping and payment info */}
          <div className="space-y-6">
            {/* Order summary */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCurrency(order.subtotal || 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{formatCurrency(order.shippingCost || 0)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(order.discount || 0)}</span>
                  </div>
                )}
                {order.tax > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span>{formatCurrency(order.tax || 0)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(order.total || 0)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Shipping info */}
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex items-center mb-3">
                <FaShippingFast className="text-gray-400 mr-2" />
                <h3 className="text-md font-medium">Shipping Information</h3>
              </div>
              <div className="text-sm">
                <p className="font-medium">{order.shipping?.name}</p>
                <p>{order.shipping?.address1}</p>
                {order.shipping?.address2 && <p>{order.shipping?.address2}</p>}
                <p>{order.shipping?.city}, {order.shipping?.state} {order.shipping?.zipCode}</p>
                {order.shipping?.country && <p>{order.shipping?.country}</p>}
                {order.shipping?.phone && <p className="mt-1">{order.shipping?.phone}</p>}
              </div>
              
              <div className="mt-3 text-sm">
                <p className="font-medium">Shipping Method</p>
                <p>{order.shippingMethod || 'Standard Shipping'}</p>
              </div>

              {order.tracking && (
                <div className="mt-3 text-sm">
                  <p className="font-medium">Tracking Number</p>
                  <a href={order.trackingUrl || '#'} className="text-blue-600 hover:underline">
                    {order.tracking}
                  </a>
                </div>
              )}
            </div>
            
            {/* Payment info */}
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex items-center mb-3">
                <FaCreditCard className="text-gray-400 mr-2" />
                <h3 className="text-md font-medium">Payment Information</h3>
              </div>
              <div className="text-sm">
                <p>{order.paymentMethod || 'Credit Card'}</p>
                {order.payment?.cardLast4 && (
                  <p className="mt-1">
                    {order.payment.cardBrand} •••• {order.payment.cardLast4}
                  </p>
                )}
              </div>
              {isAdmin && order.payment?.transactionId && (
                <div className="mt-3 text-xs text-gray-500">
                  <p>Transaction ID: {order.payment.transactionId}</p>
                </div>
              )}
            </div>
            
            {/* Customer info (admin only) */}
            {isAdmin && order.customer && (
              <div className="p-4 border border-gray-200 rounded-md">
                <div className="flex items-center mb-3">
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  <h3 className="text-md font-medium">Customer Information</h3>
                </div>
                <div className="text-sm">
                  <p className="font-medium">{order.customer.name}</p>
                  <p>{order.customer.email}</p>
                  {order.customer.phone && <p>{order.customer.phone}</p>}
                  {order.customer.id && (
                    <p className="mt-1 text-xs text-gray-500">
                      Customer ID: {order.customer.id}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary; 