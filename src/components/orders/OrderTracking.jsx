import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FaTruck, FaCheckCircle, FaBox, FaBoxOpen, FaClipboardCheck, FaSpinner } from 'react-icons/fa';
import { ordersAPI } from '../../utils/api';

/**
 * A component for displaying order tracking and status information
 * @param {Object} props
 * @param {Object|string} props.order - Order object or order ID/tracking number
 * @param {boolean} props.showDetails - Whether to show detailed tracking information
 * @param {boolean} props.hideForm - Whether to hide the tracking form
 */
const OrderTracking = ({ order: initialOrder, showDetails = true, hideForm = false }) => {
  const [order, setOrder] = useState(initialOrder);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  // If initialOrder is a string (ID or tracking number), fetch the order
  useEffect(() => {
    const fetchOrder = async (identifier) => {
      try {
        setLoading(true);
        const response = await ordersAPI.trackOrder(identifier);
        setOrder(response.data);
        setError(null);
      } catch (err) {
        setError('Unable to find order. Please check your order ID or tracking number.');
      } finally {
        setLoading(false);
      }
    };

    if (typeof initialOrder === 'string' && initialOrder) {
      fetchOrder(initialOrder);
    } else if (!initialOrder && isTracking && trackingId) {
      fetchOrder(trackingId);
    }
  }, [initialOrder, isTracking, trackingId]);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (trackingId) {
      setIsTracking(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <FaSpinner className="animate-spin text-2xl text-secondary mr-2" />
        <span>Loading tracking information...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
        <div className="text-center p-4 text-red-500">
          <p>{error}</p>
        </div>
        {!hideForm && (
          <form onSubmit={handleTrackOrder} className="mt-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Enter Order ID or Tracking Number"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
              <button
                type="submit"
                className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark"
              >
                Track Order
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  if (!order && !isTracking) {
    // If hideForm is true, don't render anything when there's no order
    if (hideForm) {
      return null;
    }
    
    return (
      <div className="max-w-lg mx-auto bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
        <form onSubmit={handleTrackOrder}>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Enter Order ID or Tracking Number"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark"
            >
              Track Order
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Define tracking statuses and their details
  const statuses = [
    { 
      id: 'pending',
      label: 'Order Placed',
      description: 'Your order has been received',
      icon: FaClipboardCheck,
      date: order.createdAt 
    },
    { 
      id: 'processing',
      label: 'Processing',
      description: 'We\'re preparing your flowers',
      icon: FaSpinner,
      date: order.processingDate 
    },
    { 
      id: 'shipped',
      label: 'Shipped',
      description: 'Your order is on its way',
      icon: FaTruck,
      date: order.shippedDate 
    },
    { 
      id: 'delivered',
      label: 'Delivered',
      description: 'Your order has been delivered',
      icon: FaCheckCircle,
      date: order.deliveredAt || order.isDelivered ? new Date() : null
    }
  ];

  // Determine current status based on order info
  let currentStatusIndex = 0;
  if (order.status === 'processing' || order.processingDate) {
    currentStatusIndex = 1;
  }
  if (order.status === 'shipped' || order.shippedDate) {
    currentStatusIndex = 2;
  }
  if (order.status === 'delivered' || order.deliveredAt || order.isDelivered) {
    currentStatusIndex = 3;
  }

  // Format date helper
  const formatDate = (date) => {
    return date ? format(new Date(date), 'dd MMM yyyy h:mm a') : 'Pending';
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Order Tracking</h2>
      
      {/* Order info */}
      <div className="mb-6 flex flex-wrap justify-between items-start gap-2">
        <div>
          <p className="text-sm text-gray-600">Order Number</p>
          <p className="font-medium">{order.orderNumber || order.orderId || order._id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Order Date</p>
          <p className="font-medium">{formatDate(order.createdAt)}</p>
        </div>
        {order.trackingNumber && (
          <div>
            <p className="text-sm text-gray-600">Tracking Number</p>
            <p className="font-medium">{order.trackingNumber}</p>
          </div>
        )}
      </div>
      
      {/* Status timeline */}
      <div className="mb-6">
        <div className="relative">
          {/* Progress bar */}
          <div className="absolute left-6 top-0 ml-px h-full w-1 bg-gray-200"></div>
          <div 
            className="absolute left-6 top-0 ml-px h-full w-1 bg-secondary transition-all duration-500"
            style={{ height: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
          ></div>
          
          {/* Status steps */}
          {statuses.map((status, index) => {
            const isActive = index <= currentStatusIndex;
            const isPast = index < currentStatusIndex;
            
            return (
              <div key={status.id} className="relative flex items-start mb-8 last:mb-0">
                <div className="flex items-center justify-center">
                  <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center z-10 text-white transition-all
                    ${isActive ? 'bg-secondary' : 'bg-gray-300'}`}>
                    <status.icon size={20} />
                  </div>
                </div>
                
                <div className="ml-4 flex-grow">
                  <div className="flex flex-col">
                    <h3 className={`font-medium ${isActive ? 'text-secondary' : 'text-gray-500'}`}>
                      {status.label}
                    </h3>
                    <p className="text-sm text-gray-500">{status.description}</p>
                    <p className={`text-sm ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                      {status.date ? formatDate(status.date) : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Tracking details */}
      {showDetails && order.trackingEvents && order.trackingEvents.length > 0 && (
        <div className="border-t pt-4">
          <h3 className="text-md font-medium mb-3">Tracking Details</h3>
          <div className="space-y-3">
            {order.trackingEvents.map((event, index) => (
              <div key={index} className="flex">
                <div className="mr-3 text-gray-400">
                  <FaBox />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{event.description}</p>
                  <p className="text-xs text-gray-500">{formatDate(event.date)}</p>
                  {event.location && (
                    <p className="text-xs text-gray-500">{event.location}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Estimated delivery */}
      {order.estimatedDelivery && (
        <div className="mt-6 p-3 bg-gray-50 rounded border border-gray-200 text-center">
          <p className="text-sm text-gray-600">Estimated Delivery</p>
          <p className="font-medium">{formatDate(order.estimatedDelivery)}</p>
        </div>
      )}

      {/* Track another order - only show if not hidden by parent */}
      {!initialOrder && !hideForm && (
        <div className="mt-6 pt-4 border-t">
          <form onSubmit={handleTrackOrder}>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Enter Order ID or Tracking Number"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
              <button
                type="submit"
                className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark"
              >
                Track Order
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default OrderTracking; 