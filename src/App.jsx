import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/authContext'; // useAuth instead of useContext(AuthContext)
import { CartProvider } from './context/cartContext';

// Pages and Components...
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import EventOrganizer from './pages/EventOrganizer';
import CustomBouquet from './pages/CustomBouquet';
import QuickQuiz from './pages/QuickQuiz';
import Cart from './pages/Cart';
import ProductView from './pages/ProductView';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Products from './pages/Products';
import Services from './pages/Services';
import OccasionPage from './pages/OccasionPage';
import QuizProductDetail from './pages/QuizProductDetail';
import TrackOrder from './pages/TrackOrder';
import { AuthProvider } from './context/authContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/register" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const { authError, setAuthError, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        {!isAdminPage && <Navbar />}

        <main className={`flex-grow ${isAdminPage ? 'w-full' : ''}`}>
          {authError && !isAdminPage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{authError}</span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setAuthError(null)}
              >
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
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

        {!isAdminPage && (
          <>
            <ChatBot />
            <Footer />
          </>
        )}
      </div>
    </CartProvider>
  );
}

const AppWithProviders = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithProviders;
