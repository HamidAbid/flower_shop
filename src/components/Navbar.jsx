import { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, CartContext } from '../App';
import { FaUser, FaSignOutAlt, FaClipboardList, FaHeart, FaCog } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    // Use the logout function from AuthContext
    logout();
    setIsDropdownOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-secondary font-bold text-xl">The Floral Artistry</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-secondary hover:text-white">Home</Link>
              <Link to="/events" className="px-3 py-2 rounded-md text-sm font-medium text-secondary hover:text-white">Event Organizer</Link>
              <Link to="/custom-bouquet" className="px-3 py-2 rounded-md text-sm font-medium text-secondary hover:text-white">Custom Bouquet</Link>
              <Link to="/quiz" className="px-3 py-2 rounded-md text-sm font-medium text-secondary hover:text-white">Flower Quiz</Link>
              <Link to="/blog" className="px-3 py-2 rounded-md text-sm font-medium text-secondary hover:text-white">Blog</Link>
              <Link to="/track-order" className="px-3 py-2 rounded-md text-sm font-medium text-secondary hover:text-white">Track Order</Link>
              {user && user.role === 'admin' && (
                <Link to="/admin/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-secondary hover:bg-opacity-80">Admin Dashboard</Link>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <Link to="/cart" className="px-3 py-2 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-secondary rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {user ? (
              <div className="ml-3 relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center focus:outline-none"
                >
                  <span className="text-sm font-medium text-secondary mr-2">{user.name}</span>
                  <div className="bg-white p-1 rounded-full text-secondary hover:text-white hover:bg-secondary">
                    <FaUser className="h-5 w-5" />
                  </div>
                </button>
                
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <Link 
                        to="/account" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaUser className="mr-2" /> My Account
                      </Link>
                      <Link 
                        to="/account" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaClipboardList className="mr-2" /> My Orders
                      </Link>
                      <Link 
                        to="/account" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaHeart className="mr-2" /> My Wishlist
                      </Link>
                      <Link 
                        to="/account" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaCog className="mr-2" /> Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="mr-2" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/register" className="ml-3 bg-secondary hover:bg-opacity-80 text-white font-medium py-2 px-4 rounded transition-all duration-300 text-sm">Sign In / Register</Link>
            )}
          </div>
          <div className="flex md:hidden items-center">
            <Link to="/cart" className="px-3 py-2 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-secondary rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-primary">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-white">Home</Link>
            <Link to="/events" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-white">Event Organizer</Link>
            <Link to="/custom-bouquet" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-white">Custom Bouquet</Link>
            <Link to="/quiz" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-white">Flower Quiz</Link>
            <Link to="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-white">Blog</Link>
            <Link to="/track-order" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-white">Track Order</Link>
            {user && user.role === 'admin' && (
              <Link to="/admin/dashboard" className="block px-3 py-2 rounded-md text-base font-medium bg-secondary text-white hover:bg-opacity-80">Admin Dashboard</Link>
            )}
            {!user && (
              <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-white">Sign In / Register</Link>
            )}
          </div>
          {user && (
            <div className="pt-4 pb-3 border-t border-white border-opacity-20">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <FaUser className="h-8 w-8 text-secondary" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-secondary">{user.name}</div>
                  <div className="text-sm font-medium text-secondary opacity-80">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link to="/account" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-white">
                  <div className="flex items-center">
                    <FaUser className="mr-2" /> Your Account
                  </div>
                </Link>
                <Link to="/account" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-white">
                  <div className="flex items-center">
                    <FaClipboardList className="mr-2" /> Orders
                  </div>
                </Link>
                <Link to="/account" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-white">
                  <div className="flex items-center">
                    <FaHeart className="mr-2" /> Wishlist
                  </div>
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-white">
                  <div className="flex items-center">
                    <FaSignOutAlt className="mr-2" /> Sign out
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 