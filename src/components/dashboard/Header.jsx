import React from 'react';
import { FaBars, FaSearch, FaBell, FaUser } from 'react-icons/fa';

const Header = ({ 
  darkMode, 
  toggleSidebar, 
  searchQuery, 
  setSearchQuery,
  title,
  notifications = [] 
}) => {
  return (
    <header className={`flex items-center justify-between px-4 py-4 ${darkMode ? 'bg-gray-900' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className={`mr-4 p-2 rounded-md md:hidden ${darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          <FaBars />
        </button>
        <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className={`relative ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none ${
              darkMode
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-700'
                : 'bg-gray-100 border-transparent text-gray-900 placeholder-gray-500 focus:bg-gray-200'
            }`}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="w-4 h-4" />
          </div>
        </div>

        <div className="relative">
          <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <FaBell className={darkMode ? 'text-gray-200' : 'text-gray-500'} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                {notifications.length > 9 ? '9+' : notifications.length}
              </span>
            )}
          </button>
        </div>

        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <FaUser className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
        </div>
      </div>
    </header>
  );
};

export default Header; 