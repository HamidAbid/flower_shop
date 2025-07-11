import React from 'react';
import { FaChartLine, FaBox, FaShoppingCart, FaUsers, FaPalette, FaQuestionCircle, FaCalendarAlt, FaStar, FaBlog, FaComments, FaCog, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Sidebar = ({ 
  darkMode, 
  isSidebarOpen, 
  toggleSidebar, 
  activeTab, 
  setActiveTab, 
  initiateLogout,
  toggleDarkMode 
}) => {
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`w-72 flex-shrink-0 fixed inset-y-0 left-0 z-20 md:relative md:translate-x-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg overflow-hidden`}
    >
      <div className="flex flex-col h-full p-5">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Admin Dashboard</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            <FaTimes />
          </button>
        </div>
        
        <nav className="space-y-2 flex-grow overflow-y-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'overview'
                ? 'bg-primary text-white'
                : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaChartLine className="mr-3" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'products'
                ? 'bg-primary text-white'
                : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaBox className="mr-3" />
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'orders'
                ? 'bg-primary text-white'
                : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaShoppingCart className="mr-3" />
            Orders
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'users'
                ? 'bg-primary text-white'
                : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaUsers className="mr-3" />
            Users
          </button>
          <button
            onClick={() => setActiveTab('customBouquets')}
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'customBouquets'
                ? 'bg-primary text-white'
                : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaPalette className="mr-3" />
            Custom Bouquets
          </button>
          <button
            onClick={() => setActiveTab('quizResponses')}
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'quizResponses'
                ? 'bg-primary text-white'
                : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaQuestionCircle className="mr-3" />
            Quiz Responses
          </button>
          <button
            onClick={() => setActiveTab('eventBookings')}
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'eventBookings'
                ? 'bg-primary text-white'
                : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaCalendarAlt className="mr-3" />
            Event Bookings
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'reviews'
                ? 'bg-primary text-white'
                : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaStar className="mr-3" />
            Reviews
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'blogs'
                ? 'bg-primary text-white'
                : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaBlog className="mr-3" />
            Blog Posts
          </button>
          <button
            onClick={() => setActiveTab('chatbot')}
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'chatbot'
                ? 'bg-primary text-white'
                : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaComments className="mr-3" />
            Chatbot Logs
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'settings'
                ? 'bg-primary text-white'
                : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaCog className="mr-3" />
            Settings
          </button>
        </nav>
        
        <div className="mt-auto pt-4">
          <button
            onClick={initiateLogout}
            className={`w-full flex items-center px-4 py-2 rounded-lg ${
              darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            } transition-colors`}
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
          <div className="flex items-center justify-between mt-4 px-4 py-2">
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Dark Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                darkMode ? 'bg-primary' : 'bg-gray-300'
              }`}></div>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar; 