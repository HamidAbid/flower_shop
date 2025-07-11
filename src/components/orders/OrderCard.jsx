import React from 'react';
import { format } from 'date-fns';
import { FaChevronRight } from 'react-icons/fa';

/**
 * Card view for an order, optimized for mobile displays
 * @param {Object} props
 * @param {Object} props.order - The order object to display
 * @param {Function} props.onViewOrder - Callback when view details is clicked
 * @param {boolean} props.isAdmin - Whether viewing as admin (shows more details)
 */
const OrderCard = ({ order, onViewOrder, isAdmin = false }) => {
  // Format currency helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Format date helper
  const formatDate = (date) => {
    return date ? format(new Date(date), 'dd MMM yyyy') : '';
  };

  // Get order status badge color
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch(status) {
      case 'delivered': return 'Delivered';
      case 'shipped': return 'Shipped';
      case 'processing': return 'Processing';
      case 'cancelled': return 'Cancelled';
      default: return 'Pending';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 overflow-hidden"
      onClick={() => onViewOrder && onViewOrder(order)}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              #{order.orderNumber || order.id}
            </h3>
            <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
          </div>
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
            {getStatusText(order.status)}
          </span>
        </div>
        
        {/* Item summary */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700">
            {order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {order.items && order.items.length > 0
              ? order.items.map(item => item.name).join(', ')
              : 'No items'}
          </p>
        </div>
        
        {/* Customer info (admin only) */}
        {isAdmin && order.customer && (
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-700">Customer</p>
            <p className="text-sm text-gray-500">{order.customer.name || 'N/A'}</p>
            {order.customer.email && (
              <p className="text-sm text-gray-500 truncate">{order.customer.email}</p>
            )}
          </div>
        )}
        
        {/* Shipping address summary */}
        {order.shipping && (
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-700">Shipping</p>
            <p className="text-sm text-gray-500 truncate">
              {order.shipping.address1}, {order.shipping.city}
            </p>
          </div>
        )}

        {/* Total and view details */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
          <div className="text-gray-900 font-medium">
            {formatCurrency(order.total || 0)}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewOrder && onViewOrder(order);
            }}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            View Details
            <FaChevronRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard; 