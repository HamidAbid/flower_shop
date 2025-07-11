import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  FaSearch, 
  FaFilter, 
  FaChevronDown, 
  FaChevronRight
} from 'react-icons/fa';
import OrderCard from './OrderCard';

/**
 * Displays a list of orders with filtering and pagination capabilities
 * @param {Object} props
 * @param {Array} props.orders - Array of order objects
 * @param {Function} props.onViewOrder - Callback when an order is selected
 * @param {boolean} props.isAdmin - Whether viewing as admin (shows more details)
 * @param {Function} props.onLoadMore - Callback for pagination (if implemented)
 */
const OrderHistory = ({ 
  orders = [], 
  onViewOrder, 
  isAdmin = false, 
  onLoadMore 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Apply filters to orders
  const filteredOrders = orders.filter(order => {
    // Search filter
    const searchTerms = searchQuery.toLowerCase().trim();
    const matchesSearch = searchTerms === '' || 
      (order.orderNumber && order.orderNumber.toLowerCase().includes(searchTerms)) ||
      (order.id && order.id.toString().includes(searchTerms)) ||
      (isAdmin && order.customer && order.customer.name && 
        order.customer.name.toLowerCase().includes(searchTerms));
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    // Date filter
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const orderDate = new Date(order.date);
      const now = new Date();
      
      if (dateFilter === 'last30') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);
        matchesDate = orderDate >= thirtyDaysAgo;
      } else if (dateFilter === 'last90') {
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(now.getDate() - 90);
        matchesDate = orderDate >= ninetyDaysAgo;
      } else if (dateFilter === 'last365') {
        const yearAgo = new Date();
        yearAgo.setDate(now.getDate() - 365);
        matchesDate = orderDate >= yearAgo;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

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

  // No orders message
  if (orders.length === 0) {
    return (
      <div className="text-center p-10">
        <h3 className="text-lg font-medium text-gray-700 mb-2">No Orders Found</h3>
        <p className="text-gray-500">
          {isAdmin 
            ? "There are no orders to display." 
            : "You haven't placed any orders yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Filter and search */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={isAdmin ? "Search by order # or customer" : "Search orders"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FaFilter className="mr-2 text-gray-500" />
              Filters
              {isFilterOpen ? (
                <FaChevronDown className="ml-2 text-gray-500" />
              ) : (
                <FaChevronRight className="ml-2 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        
        {/* Filter options */}
        {isFilterOpen && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Order Status
              </label>
              <select
                id="statusFilter"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                id="dateFilter"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="last30">Last 30 Days</option>
                <option value="last90">Last 90 Days</option>
                <option value="last365">Last Year</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile view with cards */}
      {isMobile ? (
        <div className="px-4 py-2 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-6 text-sm text-gray-500">
              No orders match your filters
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewOrder={onViewOrder}
                isAdmin={isAdmin}
              />
            ))
          )}
        </div>
      ) : (
        /* Desktop view with table */
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                {isAdmin && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                )}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No orders match your filters
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onViewOrder && onViewOrder(order)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.orderNumber || order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.date)}
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer?.name || "N/A"}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                        {order.status === 'delivered' ? 'Delivered' :
                        order.status === 'shipped' ? 'Shipped' :
                        order.status === 'processing' ? 'Processing' :
                        order.status === 'cancelled' ? 'Cancelled' :
                        'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(order.total || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewOrder && onViewOrder(order);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Load more button */}
      {onLoadMore && (
        <div className="px-6 py-4 border-t border-gray-200 flex justify-center">
          <button
            onClick={onLoadMore}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Load More Orders
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory; 