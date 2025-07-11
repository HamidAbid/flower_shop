import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, createContext, useContext, useEffect } from 'react'
import { authAPI } from './utils/api'

// Pages
import Home from './pages/Home'
import Register from './pages/Register'
import EventOrganizer from './pages/EventOrganizer'
import CustomBouquet from './pages/CustomBouquet'
import QuickQuiz from './pages/QuickQuiz'
import Cart from './pages/Cart'
import ProductView from './pages/ProductView'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import Blog from './pages/Blog'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import Products from './pages/Products'
import Services from './pages/Services'
import OccasionPage from './pages/OccasionPage'
import BlogDetail from './pages/BlogDetail'
import QuizProductDetail from './pages/QuizProductDetail'
import TrackOrder from './pages/TrackOrder'
import UserDashboard from './pages/UserDashboard'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'

// Context
export const CartContext = createContext(null)
export const AuthContext = createContext(null)

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/register" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to home if not authorized
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  // State for cart items
  const [cartItems, setCartItems] = useState([])
  
  // State for user authentication
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)
  
  // Get current location to determine if we're on an admin page
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  // Check for existing token and load user data
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token ? 'exists' : 'not found');
      
      if (token) {
        try {
          console.log('Attempting to load user profile with token');
          const { data } = await authAPI.getProfile();
          console.log('User profile loaded successfully:', data);
          
          setUser({
            id: data._id,
            name: data.name,
            email: data.email,
            role: data.role
          });
          setAuthError(null);
        } catch (error) {
          console.error('Failed to load user profile:', error);
          localStorage.removeItem('token');
          setAuthError('Session expired. Please login again.');
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    </div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, authError, setAuthError }}>
      <CartContext.Provider value={{ cartItems, setCartItems }}>
        <div className="min-h-screen flex flex-col">
          {/* Only render Navbar on non-admin pages */}
          {!isAdminPage && <Navbar />}
          
          <main className={`flex-grow ${isAdminPage ? 'w-full' : ''}`}>
            {authError && !isAdminPage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{authError}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setAuthError(null)}>
                  <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                  </svg>
                </span>
              </div>
            )}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/events" element={<EventOrganizer />} />
              <Route path="/custom-bouquet" element={<CustomBouquet />} />
              <Route path="/quiz" element={<QuickQuiz />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductView />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/account/*" 
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:category" element={<Products />} />
              <Route path="/services/:service" element={<Services />} />
              <Route path="/occasions/:occasion" element={<OccasionPage />} />
              <Route path="/quiz/product/:id" element={<QuizProductDetail />} />
              <Route path="/track-order" element={<TrackOrder />} />
              <Route path="/track-order/:id" element={<TrackOrder />} />
            </Routes>
          </main>
          
          {/* Only render ChatBot and Footer on non-admin pages */}
          {!isAdminPage && (
            <>
              <ChatBot />
              <Footer />
            </>
          )}
        </div>
      </CartContext.Provider>
    </AuthContext.Provider>
  )
}

export default App 