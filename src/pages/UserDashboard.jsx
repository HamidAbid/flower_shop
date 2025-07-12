import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
// import { userAPI, authAPI } from '../utils/api';

// Components
import UserSidebar from '../components/dashboard/UserSidebar';
import ProfileSection from '../components/user/ProfileSection';
import OrdersSection from '../components/user/OrdersSection';
import WishlistSection from '../components/user/WishlistSection';
import PasswordSection from '../components/user/PasswordSection';

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [userProfile, setUserProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/register');
    }
  }, [user, navigate]);
  
  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const { data } = await authAPI.getProfile();
        setUserProfile(data);
        setError(null);
      } catch (err) {
        setError('Failed to load profile. Please try again later.');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchUserProfile();
    }
  }, [user]);
  
  // Fetch orders when orders section is active
  useEffect(() => {
    const fetchOrders = async () => {
      if (activeSection === 'orders') {
        try {
          setLoading(true);
          const { data } = await userAPI.getOrders();
          setOrders(data);
          setError(null);
        } catch (err) {
          setError('Failed to load orders. Please try again later.');
          console.error('Error fetching orders:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    
    if (user) {
      fetchOrders();
    }
  }, [activeSection, user]);
  
  // Fetch wishlist when wishlist section is active
  useEffect(() => {
    const fetchWishlist = async () => {
      if (activeSection === 'wishlist') {
        try {
          setLoading(true);
          const { data } = await userAPI.getWishlist();
          setWishlist(data);
          setError(null);
        } catch (err) {
          setError('Failed to load wishlist. Please try again later.');
          console.error('Error fetching wishlist:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    
    if (user) {
      fetchWishlist();
    }
  }, [activeSection, user]);
  
  // Handle profile update
  const handleProfileUpdate = async (profileData) => {
    try {
      setLoading(true);
      const { data } = await authAPI.updateProfile(profileData);
      setUserProfile(data);
      setError(null);
      return { success: true, message: 'Profile updated successfully' };
    } catch (err) {
      setError('Failed to update profile. Please try again later.');
      console.error('Error updating profile:', err);
      return { success: false, message: err.response?.data?.message || 'Update failed' };
    } finally {
      setLoading(false);
    }
  };
  
  // Handle password change
  const handlePasswordChange = async (passwordData) => {
    try {
      setLoading(true);
      await userAPI.changePassword(passwordData);
      setError(null);
      return { success: true, message: 'Password changed successfully' };
    } catch (err) {
      setError('Failed to change password. Please try again later.');
      console.error('Error changing password:', err);
      return { success: false, message: err.response?.data?.message || 'Password change failed' };
    } finally {
      setLoading(false);
    }
  };
  
  // Handle wishlist actions
  const handleRemoveFromWishlist = async (productId) => {
    try {
      setLoading(true);
      const { data } = await userAPI.removeFromWishlist(productId);
      setWishlist(data);
      setError(null);
      return { success: true };
    } catch (err) {
      setError('Failed to update wishlist. Please try again later.');
      console.error('Error updating wishlist:', err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };
  
  // Render active section content
  const renderSection = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            className="mt-2 text-sm underline"
            onClick={() => setError(null)}
          >
            Try Again
          </button>
        </div>
      );
    }
    
    switch (activeSection) {
      case 'profile':
        return <ProfileSection profile={userProfile} onUpdate={handleProfileUpdate} />;
      case 'orders':
        return <OrdersSection orders={orders} />;
      case 'wishlist':
        return <WishlistSection wishlist={wishlist} onRemove={handleRemoveFromWishlist} />;
      case 'password':
        return <PasswordSection onChangePassword={handlePasswordChange} />;
      default:
        return <ProfileSection profile={userProfile} onUpdate={handleProfileUpdate} />;
    }
  };
  
  if (!user) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <UserSidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection}
            onLogout={logout}
          />
        </div>
        
        {/* Main Content */}
        <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 