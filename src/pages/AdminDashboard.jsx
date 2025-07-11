import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChartLine, FaBox, FaShoppingCart, FaUsers, FaStar, FaBars, FaTimes, FaSignOutAlt,
  FaPlus, FaEdit, FaTrash, FaSearch, FaImage, FaCalendarAlt, FaComments, FaNewspaper,
  FaRobot, FaCog, FaPalette, FaQuestionCircle, FaMoon, FaSun, FaArrowRight, FaFilter
} from 'react-icons/fa';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

// Sample data (in a real app, this would come from an API)
const sampleData = {
  stats: {
    totalSales: 12500,
    totalOrders: 156,
    pendingOrders: 24,
    completedOrders: 132,
    totalCustomers: 89,
    totalProducts: 24,
    newReviews: 12
  },
  recentOrders: [
    { id: 1, customer: 'John Doe', amount: 89.99, status: 'Delivered', date: '2024-03-15' },
    { id: 2, customer: 'Jane Smith', amount: 149.99, status: 'Processing', date: '2024-03-14' },
    { id: 3, customer: 'Mike Johnson', amount: 199.99, status: 'Shipped', date: '2024-03-13' },
    { id: 4, customer: 'Sarah Wilson', amount: 79.99, status: 'Pending', date: '2024-03-12' },
    { id: 5, customer: 'Hasher Abid', amount: 79.99, status: 'Pending', date: '2024-03-12' }
  ],
  recentReviews: [
    { id: 1, product: 'Spring Bouquet', customer: 'John Doe', rating: 5, comment: 'Beautiful flowers!', date: '2024-03-15' },
    { id: 2, product: 'Rose Collection', customer: 'Jane Smith', rating: 4, comment: 'Great quality', date: '2024-03-14' },
    { id: 3, product: 'Tulip Mix', customer: 'Mike Johnson', rating: 5, comment: 'Perfect for my wife', date: '2024-03-13' }
  ],
  products: [
    { id: 1, name: 'Red Roses Bouquet', category: 'Bouquets', price: 59.99, stock: 25, image: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    { id: 2, name: 'Chocolate Box', category: 'Gifts', price: 29.99, stock: 18, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    { id: 3, name: 'Tulip Arrangement', category: 'Bouquets', price: 49.99, stock: 12, image: 'https://images.unsplash.com/photo-1589123053646-4e8b5493f395?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    { id: 4, name: 'Gift Card', category: 'Gifts', price: 25.00, stock: 50, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }
  ],
  dailySalesData: [
    { day: 'Mon', sales: 2100 },
    { day: 'Tue', sales: 3200 },
    { day: 'Wed', sales: 2800 },
    { day: 'Thu', sales: 4300 },
    { day: 'Fri', sales: 5200 },
    { day: 'Sat', sales: 6100 },
    { day: 'Sun', sales: 4000 }
  ],
  popularProducts: [
    { name: 'Red Roses', value: 35 },
    { name: 'Tulips', value: 25 },
    { name: 'Lilies', value: 20 },
    { name: 'Orchids', value: 15 },
    { name: 'Sunflowers', value: 5 }
  ],
  customBouquets: [
    { 
      id: 1, 
      customer: 'Alice Cooper', 
      status: 'Pending', 
      flowerDetails: [
        { flower: 'Roses', color: 'Red', quantity: 12 },
        { flower: 'Lilies', color: 'White', quantity: 5 }
      ],
      wrapColor: 'Silver',
      wrapping: 'Premium Paper',
      ribbon: 'Satin White',
      card: 'Happy Anniversary',
      deliveryType: 'Same Day Delivery',
      date: '2024-03-15', 
      image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' 
    },
    { 
      id: 2, 
      customer: 'Bob Smith', 
      status: 'Approved', 
      flowerDetails: [
        { flower: 'Tulips', color: 'Pink', quantity: 8 },
        { flower: 'Daisies', color: 'Yellow', quantity: 10 }
      ],
      wrapColor: 'Kraft Brown',
      wrapping: 'Kraft Paper',
      ribbon: 'Jute String',
      card: 'Happy Birthday',
      deliveryType: 'Standard Delivery',
      date: '2024-03-14', 
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' 
    }
  ],
  quizResponses: [
    { id: 1, customer: 'Emma Johnson', occasion: 'Anniversary', colors: 'Red, Pink', budget: '$50-100', date: '2024-03-15', recommendation: 'Romantic Red Roses' },
    { id: 2, customer: 'Tom Wilson', occasion: 'Birthday', colors: 'Yellow, Orange', budget: '$25-50', date: '2024-03-14', recommendation: 'Cheerful Sunflower Mix' }
  ],
  eventBookings: [
    { id: 1, customer: 'Sarah Williams', event: 'Wedding', date: '2024-05-20', time: '15:00', requirements: 'Table arrangements, Bride bouquet, 10 corsages', status: 'Confirmed' },
    { id: 2, customer: 'David Thompson', event: 'Corporate Event', date: '2024-04-15', time: '09:00', requirements: '5 large arrangements for stage and entrance', status: 'Pending' }
  ],
  chatbotLogs: [
    { id: 1, customer: 'Anonymous User', query: 'Do you deliver on weekends?', response: 'Yes, we offer weekend delivery for an additional $5 fee.', date: '2024-03-15', time: '14:23' },
    { id: 2, customer: 'John Smith', query: 'What flowers are best for anniversaries?', response: 'Roses are traditional for anniversaries, especially red ones which symbolize love and passion.', date: '2024-03-14', time: '11:05' }
  ],
  blogs: [
    { id: 1, title: 'Top 10 Flowers for Spring', status: 'Published', author: 'Jane Flowers', date: '2024-03-10', excerpt: 'Discover the best blooms for the spring season...' },
    { id: 2, title: 'How to Care for Your Bouquet', status: 'Draft', author: 'Mike Green', date: '2024-03-08', excerpt: 'Simple tips to make your flowers last longer...' }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin');
    }
  }, [user, navigate]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [darkMode, setDarkMode] = useState(false);
  
  // Dashboard stats state
  const [dashboardStats, setDashboardStats] = useState(sampleData.stats);
  const [recentOrders, setRecentOrders] = useState(sampleData.recentOrders);
  const [dailySalesData, setDailySalesData] = useState(sampleData.dailySalesData);
  const [popularProducts, setPopularProducts] = useState(sampleData.popularProducts);
  
  // Modal states
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Bouquets',
    price: '',
    stock: '',
    image: ''
  });

  // Product list state
  const [products, setProducts] = useState(sampleData.products);

  // Order state
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Custom bouquet state
  const [bouquetFilter, setBouquetFilter] = useState('all');
  const [customBouquets, setCustomBouquets] = useState(sampleData.customBouquets);
  
  // Review state
  const [reviewFilter, setReviewFilter] = useState('all');
  const [reviews, setReviews] = useState(sampleData.recentReviews);
  
  // Event booking state
  const [bookingFilter, setBookingFilter] = useState('all');
  const [eventBookings, setEventBookings] = useState(sampleData.eventBookings);
  
  // Blog state
  const [blogFilter, setBlogFilter] = useState('all');
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState(null);
  const [showEditBlogModal, setShowEditBlogModal] = useState(false);
  const [blogs, setBlogs] = useState(sampleData.blogs);
  const [newBlog, setNewBlog] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Admin User'
  });
  
  // Quiz state
  const [quizFilter, setQuizFilter] = useState('all');
  const [quizResponses, setQuizResponses] = useState(sampleData.quizResponses);
  
  // Chatbot state
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [chatbotLogs, setChatbotLogs] = useState(sampleData.chatbotLogs);
  const [responseToImprove, setResponseToImprove] = useState(null);
  const [showImproveResponseModal, setShowImproveResponseModal] = useState(false);
  const [improvedResponse, setImprovedResponse] = useState("");
  
  // User management state
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', date: '2024-02-15', orders: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2024-02-20', orders: 3 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', date: '2024-03-01', orders: 1 }
  ]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Customer'
  });

  // Add settings state variables
  const [settingsData, setSettingsData] = useState({
    name: "Admin User",
    email: "admin@floralartistry.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: {
      email: true,
      orders: true,
      lowStock: true
    }
  });

  const [settingsChangesSaved, setSettingsChangesSaved] = useState(false);
  const [showSettingsConfirmation, setShowSettingsConfirmation] = useState(false);

  // Update the saveSettings function with password validation and confirmation dialog
  const saveSettings = () => {
    // First check if password fields are filled, verify they match
    if (settingsData.currentPassword || settingsData.newPassword || settingsData.confirmPassword) {
      if (!settingsData.currentPassword) {
        alert("Please enter your current password");
        return;
      }
      
      // In a real app, we would verify if the current password is correct
      // For demo purposes, let's simulate a check (current password should be "admin123")
      if (settingsData.currentPassword !== "admin123") {
        alert("Current password is incorrect");
        return;
      }
      
      if (settingsData.newPassword !== settingsData.confirmPassword) {
        alert("New password and confirm password do not match");
        return;
      }
    }
    
    // Show a confirmation dialog before saving
    setItemToDelete(null); // Ensure no other confirmation is showing
    setShowSettingsConfirmation(true);
  };

  // Add the applySettings function to be called after confirmation
  const applySettings = () => {
    // In a real app, this would send the settings to the server
    console.log("Saving settings:", settingsData);
    
    // Show a saved confirmation message briefly
    setSettingsChangesSaved(true);
    setTimeout(() => {
      setSettingsChangesSaved(false);
    }, 3000);
    
    // Reset password fields after saving
    setSettingsData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
    
    // Hide the confirmation dialog
    setShowSettingsConfirmation(false);
  };

  // Add toggleNotification function
  const toggleNotification = (type) => {
    setSettingsData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  // In the useState declarations section
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);

  // Add functions to handle quiz responses
  const [quizResponseToEdit, setQuizResponseToEdit] = useState(null);
  const [showEditQuizModal, setShowEditQuizModal] = useState(false);

  const handleEditQuizResponse = (response) => {
    setQuizResponseToEdit(response);
    setShowEditQuizModal(true);
  };

  const saveEditedQuizResponse = () => {
    // Update the quiz response in the array
    setQuizResponses(prevResponses => 
      prevResponses.map(response => 
        response.id === quizResponseToEdit.id ? { ...quizResponseToEdit } : response
      )
    );
    setShowEditQuizModal(false);
    setQuizResponseToEdit(null);
  };

  const handleDeleteQuizResponse = (response) => {
    handleDeleteClick(response, 'quiz response');
  };

  // Functions to update dashboard stats
  const updateRevenue = (amount) => {
    setDashboardStats(prev => ({
      ...prev,
      totalSales: prev.totalSales + amount
    }));
    
    // Update daily sales data for today
    const today = new Date().toLocaleString('en-us', { weekday: 'short' }).slice(0, 3);
    setDailySalesData(prev => {
      const newData = [...prev];
      const todayIndex = newData.findIndex(item => item.day === today);
      if (todayIndex !== -1) {
        newData[todayIndex] = {
          ...newData[todayIndex],
          sales: newData[todayIndex].sales + amount
        };
      }
      return newData;
    });
  };
  
  const addOrder = (order) => {
    // Add to recent orders
    setRecentOrders(prev => [order, ...prev].slice(0, 10));
    
    // Update order stats
    setDashboardStats(prev => ({
      ...prev,
      totalOrders: prev.totalOrders + 1,
      pendingOrders: prev.pendingOrders + 1
    }));
    
    // Update revenue
    updateRevenue(order.amount);
  };
  
  const updateOrderStatus = (orderId, newStatus) => {
    setRecentOrders(prev => {
      const newOrders = [...prev];
      const orderIndex = newOrders.findIndex(order => order.id === orderId);
      
      if (orderIndex === -1) return prev;
      
      // Update dashboard stats based on status change
      const oldStatus = newOrders[orderIndex].status.toLowerCase();
      if (oldStatus === 'pending' && newStatus.toLowerCase() !== 'pending') {
        setDashboardStats(prev => ({
          ...prev,
          pendingOrders: Math.max(0, prev.pendingOrders - 1)
        }));
      } else if (oldStatus !== 'pending' && newStatus.toLowerCase() === 'pending') {
        setDashboardStats(prev => ({
          ...prev,
          pendingOrders: prev.pendingOrders + 1
        }));
      }
      
      if (newStatus.toLowerCase() === 'delivered' || newStatus.toLowerCase() === 'completed') {
        setDashboardStats(prev => ({
          ...prev,
          completedOrders: prev.completedOrders + 1
        }));
      }
      
      // Update the order
      newOrders[orderIndex] = {
        ...newOrders[orderIndex],
        status: newStatus
      };
      
      return newOrders;
    });
  };
  
  const addProduct = (product) => {
    // Generate a new ID
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProductWithId = {
      ...product,
      id: newId
    };
    
    // Add to products list
    setProducts(prev => [...prev, newProductWithId]);
    
    // Update total products count
    setDashboardStats(prev => ({
      ...prev,
      totalProducts: prev.totalProducts + 1
    }));
  };
  
  const addCustomer = (customer) => {
    // Update customer count
    setDashboardStats(prev => ({
      ...prev,
      totalCustomers: prev.totalCustomers + 1
    }));
  };
  
  const addReview = (review) => {
    // Add to reviews list
    setReviews(prev => [review, ...prev]);
    
    // Update new reviews count
    setDashboardStats(prev => ({
      ...prev,
      newReviews: prev.newReviews + 1
    }));
  };

  // Add handleApproveReview function after the addReview function
  const handleApproveReview = (review) => {
    // Update the review status in the reviews array
    setReviews(prevReviews => 
      prevReviews.map(r => 
        r.id === review.id ? { ...r, status: 'Approved' } : r
      )
    );
    
    // Update dashboard stats if needed
    setDashboardStats(prev => ({
      ...prev,
      newReviews: Math.max(0, prev.newReviews - 1)
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const handleAddProduct = () => {
    // Add the product
    addProduct({
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      image: newProduct.image || 'https://via.placeholder.com/100' // Default image if none provided
    });
    
    setShowAddProductModal(false);
    
    // Reset form
    setNewProduct({
      name: '',
      category: 'Bouquets',
      price: '',
      stock: '',
      image: ''
    });
  };
  
  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setShowEditProductModal(true);
  };
  
  const saveEditedProduct = () => {
    // Update the product in the products array
    setProducts(prev => {
      const newProducts = [...prev];
      const index = newProducts.findIndex(p => p.id === productToEdit.id);
      if (index !== -1) {
        newProducts[index] = productToEdit;
      }
      return newProducts;
    });
    
    setShowEditProductModal(false);
    setProductToEdit(null);
  };
  
  const handleDeleteClick = (item, type) => {
    setItemToDelete({ item, type });
    setShowDeleteConfirmation(true);
  };
  
  const confirmDelete = () => {
    const { item, type } = itemToDelete;
    
    if (type === 'product') {
      // Delete product
      setProducts(prev => prev.filter(p => p.id !== item.id));
      // Update dashboard stats
      setDashboardStats(prev => ({
        ...prev,
        totalProducts: prev.totalProducts - 1
      }));
    } else if (type === 'order') {
      // Delete order
      setRecentOrders(prev => prev.filter(o => o.id !== item.id));
      // Update dashboard stats
      setDashboardStats(prev => ({
        ...prev,
        totalOrders: prev.totalOrders - 1,
        pendingOrders: item.status.toLowerCase() === 'pending' 
          ? prev.pendingOrders - 1 
          : prev.pendingOrders,
        completedOrders: (item.status.toLowerCase() === 'delivered' || item.status.toLowerCase() === 'completed')
          ? prev.completedOrders - 1
          : prev.completedOrders
      }));
    } else if (type === 'review') {
      // Delete review
      setReviews(prev => prev.filter(r => r.id !== item.id));
      // Update dashboard stats
      setDashboardStats(prev => ({
        ...prev,
        newReviews: Math.max(0, prev.newReviews - 1)
      }));
    } else if (type === 'user') {
      // Delete user
      setUsers(prev => prev.filter(u => u.id !== item.id));
    } else if (type === 'blog') {
      // Delete blog
      setBlogs(prev => prev.filter(b => b.id !== item.id));
    } else if (type === 'bouquet request') {
      // Delete bouquet request
      setCustomBouquets(prev => prev.filter(b => b.id !== item.id));
    } else if (type === 'quiz response') {
      // Delete quiz response
      setQuizResponses(prev => prev.filter(qr => qr.id !== item.id));
    } else if (type === 'event booking') {
      // Delete event booking
      setEventBookings(prev => prev.filter(eb => eb.id !== item.id));
    }
    
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };
  
  const initiateLogout = () => {
    setShowLogoutConfirmation(true);
  };
  
  // Fix the confirmLogout function to actually log out the user
  const confirmLogout = () => {
    // Log out the user
    localStorage.removeItem('user'); // Remove user from localStorage
    
    // Use the AuthContext to log out
    if (user) {
      // We're using the imported useContext directly here
      console.log("Logging out user:", user);
    }
    
    // Navigate to login page
    navigate('/admin');
    setShowLogoutConfirmation(false);
  };

  // Product Modal Component
  const ProductModal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-md p-6`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{title}</h3>
          <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
          >
              <FaTimes />
          </button>
        </div>
          <div>
            {children}
          </div>
        </motion.div>
      </div>
    );
  };
  
  // Confirmation Modal
  const ConfirmationModal = ({ show, onClose, onConfirm, title, message }) => {
    if (!show) return null;

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-sm p-6`}
        >
          <h3 className="text-lg font-medium mb-3">{title}</h3>
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{message}</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Confirm
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer`}
          onClick={() => setActiveTab('products')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Total Revenue</p>
              <h3 className="text-2xl font-bold">{formatCurrency(dashboardStats.totalSales)}</h3>
            </div>
            <div className={`${darkMode ? 'bg-blue-900' : 'bg-blue-100'} p-3 rounded-full`}>
              <FaChartLine className={`${darkMode ? 'text-blue-400' : 'text-blue-500'} text-xl`} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer`}
          onClick={() => setActiveTab('orders')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Total Orders</p>
              <h3 className="text-2xl font-bold">{dashboardStats.totalOrders}</h3>
              <div className="flex mt-2 text-sm">
                <span className="text-green-500 mr-3">
                  {dashboardStats.completedOrders} Completed
                </span>
                <span className="text-yellow-500">
                  {dashboardStats.pendingOrders} Pending
                </span>
              </div>
            </div>
            <div className={`${darkMode ? 'bg-green-900' : 'bg-green-100'} p-3 rounded-full`}>
              <FaShoppingCart className={`${darkMode ? 'text-green-400' : 'text-green-500'} text-xl`} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer`}
          onClick={() => setActiveTab('users')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Total Customers</p>
              <h3 className="text-2xl font-bold">{dashboardStats.totalCustomers}</h3>
            </div>
            <div className={`${darkMode ? 'bg-purple-900' : 'bg-purple-100'} p-3 rounded-full`}>
              <FaUsers className={`${darkMode ? 'text-purple-400' : 'text-purple-500'} text-xl`} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer`}
          onClick={() => setActiveTab('reviews')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>New Reviews</p>
              <h3 className="text-2xl font-bold">{dashboardStats.newReviews}</h3>
            </div>
            <div className={`${darkMode ? 'bg-yellow-900' : 'bg-yellow-100'} p-3 rounded-full`}>
              <FaStar className={`${darkMode ? 'text-yellow-400' : 'text-yellow-500'} text-xl`} />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}
        >
          <h3 className="text-lg font-semibold mb-4">Daily Sales</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailySalesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#555' : '#eee'} />
                <XAxis dataKey="day" stroke={darkMode ? '#aaa' : '#666'} />
                <YAxis stroke={darkMode ? '#aaa' : '#666'} />
                <Tooltip contentStyle={darkMode ? { backgroundColor: '#333', color: '#fff', border: 'none' } : {}}/>
                <Bar dataKey="sales" fill="#8884d8" radius={[5, 5, 0, 0]}>
                  {
                    dailySalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}
        >
          <h3 className="text-lg font-semibold mb-4">Popular Products</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={popularProducts}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {
                    popularProducts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                  }
                </Pie>
                <Tooltip contentStyle={darkMode ? { backgroundColor: '#333', color: '#fff', border: 'none' } : {}} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <button
              onClick={() => setActiveTab('orders')}
              className="text-primary hover:underline flex items-center"
            >
              View All <FaArrowRight className="ml-1" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                  <th className="text-left py-2">Order ID</th>
                  <th className="text-left py-2">Customer</th>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className={`${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} border-b transition-colors`}>
                    <td className="py-3">#{order.id}</td>
                    <td className="py-3">{order.customer}</td>
                    <td className="py-3">{formatCurrency(order.amount)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">{order.date}</td>
                    <td className="py-3">
            <button
              onClick={() => setActiveTab('orders')}
                        className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <FaEdit title="View Details" />
            </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Product Management</h3>
            <button
          onClick={() => setShowAddProductModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary-dark transition-colors"
        >
          <FaPlus className="mr-2" />
          Add Product
        </button>
      </div>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className={`w-full px-4 py-2 pl-10 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
              <th className="text-left py-2">Image</th>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Category</th>
              <th className="text-left py-2">Price</th>
              <th className="text-left py-2">Stock</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className={`${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} border-b transition-colors`}>
                <td className="py-3">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="py-3">{product.name}</td>
                <td className="py-3">{product.category}</td>
                <td className="py-3">{formatCurrency(product.price)}</td>
                <td className="py-3">{product.stock}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="py-3 flex">
                  <button 
                    onClick={() => handleEditProduct(product)}
                    className="p-1 mr-2 text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <FaEdit title="Edit" />
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(product, 'product')}
                    className="p-1 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTrash title="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Showing 1-{products.length} of {products.length} products
        </div>
        <div className="flex">
          <button className={`mx-1 px-3 py-1 rounded-md ${darkMode ? 'bg-gray-600 text-white' : 'bg-primary text-white'}`}>1</button>
        </div>
      </div>
    </div>
  );

  // Move these functions outside of renderOrders
  const filterOrders = () => {
    if (selectedStatus === 'all') return recentOrders;
    return recentOrders.filter(order => 
      order.status.toLowerCase() === selectedStatus.toLowerCase()
    );
  };

  const handleStatusChange = (order, newStatus) => {
    // Update order status
    const updatedOrders = recentOrders.map(o => 
      o.id === order.id ? { ...o, status: newStatus } : o
    );
    setRecentOrders(updatedOrders);
    
    // In a real app, this would make an API call to update the status
    // Example: ordersAPI.updateOrderStatus(order.id, newStatus)
    
    // Add tracking information based on status
    if (newStatus === 'Processing') {
      // Example API call: ordersAPI.updateToProcessing(order.id)
      console.log(`Order ${order.id} marked as processing`);
    } else if (newStatus === 'Shipped') {
      // Generate a fake tracking number
      const trackingNumber = `TRK${Math.floor(Math.random() * 1000000)}`;
      
      // Example API call: 
      // ordersAPI.updateToShipped(order.id, { 
      //   trackingNumber, 
      //   estimatedDays: 3,
      //   location: 'Distribution Center'
      // })
      
      console.log(`Order ${order.id} marked as shipped with tracking number ${trackingNumber}`);
    } else if (newStatus === 'Delivered') {
      // Example API call: ordersAPI.updateToDelivered(order.id, { location: 'Customer Address' })
      console.log(`Order ${order.id} marked as delivered`);
    }
  };

  const addTrackingEvent = (order, description, location) => {
    // In a real app, this would make an API call to add a tracking event
    // Example: ordersAPI.addTrackingEvent(order.id, { description, location })
    console.log(`Added tracking event to order ${order.id}: ${description} at ${location}`);
  };

  const viewOrderDetails = (order) => {
    // View order details
    console.log('View order details', order);
  };

  const trackOrder = (order) => {
    // In a real app, this would navigate to the tracking page
    window.open(`/track-order/${order.id}`, '_blank');
  };

  const renderOrders = () => {
    const filteredOrders = filterOrders();
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-xl font-semibold mb-4 md:mb-0">Orders Management</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
            <select
              className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : ''}
                      ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' : ''}
                      ${order.status === 'Processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' : ''}
                      ${order.status === 'Shipped' ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100' : ''}
                      ${order.status === 'Cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' : ''}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => viewOrderDetails(order)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => trackOrder(order)}
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                      >
                        Track
                      </button>
                      <div className="relative group">
                        <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                          Update Status
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg hidden group-hover:block z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleStatusChange(order, 'Pending')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              Pending
                            </button>
                            <button
                              onClick={() => handleStatusChange(order, 'Processing')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              Processing
                            </button>
                            <button
                              onClick={() => handleStatusChange(order, 'Shipped')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              Shipped
                            </button>
                            <button
                              onClick={() => handleStatusChange(order, 'Delivered')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              Delivered
                            </button>
                            <button
                              onClick={() => handleStatusChange(order, 'Cancelled')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              Cancelled
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Move these functions outside of renderCustomBouquets
  const filterBouquets = () => {
    if (bouquetFilter === 'all') return customBouquets;
    return customBouquets.filter(bouquet => 
      bouquet.status.toLowerCase() === bouquetFilter.toLowerCase()
    );
  };

  const handleApprove = (bouquet) => {
    // Update the bouquet status in the customBouquets array
    setCustomBouquets(prevBouquets => 
      prevBouquets.map(b => 
        b.id === bouquet.id ? { ...b, status: 'Approved' } : b
      )
    );
    console.log("Approved bouquet:", bouquet);
  };

  const handleReject = (bouquet) => {
    // Update the bouquet status in the customBouquets array
    setCustomBouquets(prevBouquets => 
      prevBouquets.map(b => 
        b.id === bouquet.id ? { ...b, status: 'Rejected' } : b
      )
    );
    console.log("Rejected bouquet:", bouquet);
  };

  const renderCustomBouquets = () => {
    return (
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Custom Bouquet Requests</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setBouquetFilter('all')}
              className={`px-3 py-1 rounded-lg ${
                bouquetFilter === 'all' 
                  ? darkMode ? 'bg-blue-800' : 'bg-blue-100 text-blue-800' 
                  : darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setBouquetFilter('pending')}
              className={`px-3 py-1 rounded-lg ${
                bouquetFilter === 'pending' 
                  ? darkMode ? 'bg-blue-800' : 'bg-blue-100 text-blue-800' 
                  : darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setBouquetFilter('approved')}
              className={`px-3 py-1 rounded-lg ${
                bouquetFilter === 'approved' 
                  ? darkMode ? 'bg-blue-800' : 'bg-blue-100 text-blue-800' 
                  : darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              Approved
            </button>
            <button 
              onClick={() => setBouquetFilter('rejected')}
              className={`px-3 py-1 rounded-lg ${
                bouquetFilter === 'rejected' 
                  ? darkMode ? 'bg-blue-800' : 'bg-blue-100 text-blue-800' 
                  : darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              Rejected
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filterBouquets().map((bouquet) => (
            <motion.div
              key={bouquet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg shadow`}
            >
              <div className="flex flex-col md:flex-row">
                <div className="mb-4 md:mb-0 md:mr-4">
                  <img 
                    src={bouquet.image} 
                    alt="Custom bouquet sketch" 
                    className="w-full md:w-40 h-40 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">Request #{bouquet.id}</h4>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{bouquet.customer}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      bouquet.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      bouquet.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bouquet.status}
                    </span>
                  </div>
                  
                  <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm space-y-2`}>
                    <div>
                      <p className="font-medium mb-1">Flowers:</p>
                      <ul className="ml-2 space-y-1">
                        {bouquet.flowerDetails.map((flower, index) => (
                          <li key={index}>• {flower.quantity} {flower.color} {flower.flower}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium">Wrapping Details:</p>
                      <ul className="ml-2 space-y-1">
                        <li>• Color: {bouquet.wrapColor}</li>
                        <li>• Material: {bouquet.wrapping}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium">Extras:</p>
                      <ul className="ml-2 space-y-1">
                        <li>• Ribbon: {bouquet.ribbon}</li>
                        <li>• Card: {bouquet.card}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium">Delivery:</p>
                      <ul className="ml-2 space-y-1">
                        <li>• Type: {bouquet.deliveryType}</li>
                        <li>• Date: {bouquet.date}</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4 space-x-2">
                    {bouquet.status !== 'Approved' && (
                      <button 
                        onClick={() => handleApprove(bouquet)}
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                      >
                        Approve
                      </button>
                    )}
                    {bouquet.status !== 'Rejected' && (
                      <button 
                        onClick={() => handleReject(bouquet)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    )}
                    {(bouquet.status === 'Approved' || bouquet.status === 'Rejected') && (
                      <button 
                        onClick={() => {
                          setCustomBouquets(prevBouquets => 
                            prevBouquets.map(b => 
                              b.id === bouquet.id ? { ...b, status: 'Pending' } : b
                            )
                          );
                        }}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                      >
                        Set to Pending
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteClick(bouquet, 'bouquet request')}
                      className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderQuizResponses = () => (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Quiz Responses</h3>
                    </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
              <th className="text-left py-2">ID</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Occasion</th>
              <th className="text-left py-2">Colors</th>
              <th className="text-left py-2">Budget</th>
              <th className="text-left py-2">Recommendation</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizResponses.map((response) => (
              <tr key={response.id} className={`${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} border-b transition-colors`}>
                <td className="py-3">{response.id}</td>
                <td className="py-3">{response.customer}</td>
                <td className="py-3">{response.occasion}</td>
                <td className="py-3">{response.colors}</td>
                <td className="py-3">{response.budget}</td>
                <td className="py-3">{response.recommendation}</td>
                <td className="py-3">{response.date}</td>
                <td className="py-3">
                  <button 
                    onClick={() => handleDeleteClick(response, 'quiz response')}
                    className="p-1 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTrash title="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
                    </div>
                  </div>
  );

  // Add functions to handle event booking actions
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);

  const handleConfirmBooking = (booking) => {
    setEventBookings(prevBookings => 
      prevBookings.map(b => 
        b.id === booking.id ? { ...b, status: 'Confirmed' } : b
      )
    );
  };

  const handleRejectBooking = (booking) => {
    setEventBookings(prevBookings => 
      prevBookings.map(b => 
        b.id === booking.id ? { ...b, status: 'Rejected' } : b
      )
    );
  };

  const handleResetBookingStatus = (booking) => {
    setEventBookings(prevBookings => 
      prevBookings.map(b => 
        b.id === booking.id ? { ...b, status: 'Pending' } : b
      )
    );
  };

  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowBookingDetailsModal(true);
  };

  // Update Event Bookings section with Rejected filter and View Details for all statuses
  const renderEventBookings = () => (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Event Bookings</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setBookingFilter('all')}
            className={`px-3 py-1 rounded-lg ${
              bookingFilter === 'all' 
                ? darkMode ? 'bg-blue-800' : 'bg-blue-100 text-blue-800' 
                : darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setBookingFilter('confirmed')}
            className={`px-3 py-1 rounded-lg ${
              bookingFilter === 'confirmed' 
                ? darkMode ? 'bg-blue-800' : 'bg-blue-100 text-blue-800' 
                : darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}
          >
            Confirmed
          </button>
          <button 
            onClick={() => setBookingFilter('pending')}
            className={`px-3 py-1 rounded-lg ${
              bookingFilter === 'pending' 
                ? darkMode ? 'bg-blue-800' : 'bg-blue-100 text-blue-800' 
                : darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}
          >
            Pending
          </button>
          <button 
            onClick={() => setBookingFilter('rejected')}
            className={`px-3 py-1 rounded-lg ${
              bookingFilter === 'rejected' 
                ? darkMode ? 'bg-blue-800' : 'bg-blue-100 text-blue-800' 
                : darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}
          >
            Rejected
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {eventBookings
          .filter(booking => bookingFilter === 'all' || booking.status.toLowerCase() === bookingFilter.toLowerCase())
          .map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg shadow relative`}
            >
              {/* Delete icon in bottom left corner */}
              <div className="absolute bottom-4 left-4">
                <button 
                  onClick={() => handleDeleteClick(booking, 'event booking')}
                  className="p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
                  title="Delete booking"
                >
                  <FaTrash size={16} />
                </button>
                </div>
                
              <div className="flex justify-between items-start mb-3">
                    <div>
                  <h4 className="font-medium">{booking.event}</h4>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{booking.customer}</p>
                    </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.status}
                </span>
                    </div>
              <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm space-y-1`}>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  <span>{booking.date} at {booking.time}</span>
                  </div>
                <p className="mt-2"><span className="font-medium">Requirements:</span></p>
                <p className="ml-2">{booking.requirements}</p>
                </div>
              <div className="flex justify-end mt-4 space-x-2 mb-6"> {/* Added bottom margin to make space for delete icon */}
                <button
                  onClick={() => viewBookingDetails(booking)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  View Details
                </button>
                
                {booking.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleConfirmBooking(booking)}
                      className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleRejectBooking(booking)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
                
                {booking.status === 'Confirmed' && (
                  <button
                    onClick={() => handleRejectBooking(booking)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                )}
                
                {booking.status === 'Rejected' && (
                  <button
                    onClick={() => handleConfirmBooking(booking)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Confirm
                  </button>
                )}
                
                {(booking.status === 'Confirmed' || booking.status === 'Rejected') && (
                  <button
                    onClick={() => handleResetBookingStatus(booking)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    Set to Pending
                  </button>
                )}
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Review Management</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg shadow`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{review.product}</h4>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{review.customer}</p>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < review.rating ? 'text-yellow-400' : darkMode ? 'text-gray-600' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>{review.comment}</p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500">{review.date}</p>
              <div className="flex space-x-2">
                {review.status !== 'Approved' && (
                  <button 
                    onClick={() => handleApproveReview(review)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
                )}
                <button 
                  onClick={() => handleDeleteClick(review, 'review')}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderBlogs = () => (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Blog Management</h3>
        <button
          onClick={() => setShowAddBlogModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary-dark transition-colors"
        >
          <FaPlus className="mr-2" />
          New Blog Post
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
              <th className="text-left py-2">ID</th>
              <th className="text-left py-2">Title</th>
              <th className="text-left py-2">Author</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className={`${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} border-b transition-colors`}>
                <td className="py-3">{blog.id}</td>
                <td className="py-3">
                  <div>
                    <div className="font-medium">{blog.title}</div>
                    <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{blog.excerpt}</div>
                  </div>
                </td>
                <td className="py-3">{blog.author}</td>
                <td className="py-3">{blog.date}</td>
                <td className="py-3 flex">
                  <button 
                    onClick={() => handleEditBlog(blog)}
                    className="p-1 mr-2 text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <FaEdit title="Edit" />
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(blog, 'blog')}
                    className="p-1 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTrash title="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const handleImproveResponse = (log) => {
    setResponseToImprove(log);
    setImprovedResponse(log.response);
    setShowImproveResponseModal(true);
  };

  const saveImprovedResponse = () => {
    // Update the chatbot log with the improved response
    setChatbotLogs(prevLogs => 
      prevLogs.map(log => 
        log.id === responseToImprove.id 
          ? { ...log, response: improvedResponse } 
          : log
      )
    );
    
    setShowImproveResponseModal(false);
    setResponseToImprove(null);
    setImprovedResponse("");
  };

  const renderChatbotLogs = () => (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Chatbot Logs</h3>
      </div>
      <div className="space-y-4">
        {chatbotLogs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg shadow`}
          >
            <div className="flex justify-between mb-2">
              <div className="font-medium">{log.customer}</div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                {log.date} at {log.time}
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <div className={`self-end max-w-[80%] ${darkMode ? 'bg-gray-600' : 'bg-blue-100'} p-3 rounded-lg`}>
                <p>{log.query}</p>
              </div>
              <div className={`self-start max-w-[80%] ${darkMode ? 'bg-primary text-white' : 'bg-green-100'} p-3 rounded-lg`}>
                <p>{log.response}</p>
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <button 
                onClick={() => handleImproveResponse(log)}
                className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Improve Response
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Move these functions outside of renderUsers
  const handleAddUser = () => {
    // Create a new user object with a unique ID
    const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    const today = new Date().toISOString().slice(0, 10);
    
    const userToAdd = {
      id: newId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      date: today,
      orders: 0
    };
    
    // Add the new user to the users array
    setUsers(prevUsers => [...prevUsers, userToAdd]);
    
    console.log("Adding user:", userToAdd);
    setShowAddUserModal(false);
    setNewUser({ name: '', email: '', role: 'Customer' });
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setShowEditUserModal(true);
  };

  const saveEditedUser = () => {
    // Update the user in the users array
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userToEdit.id ? { ...userToEdit } : user
      )
    );
    
    console.log("Saving edited user:", userToEdit);
    setShowEditUserModal(false);
    setUserToEdit(null);
  };

  const renderUsers = () => {
    return (
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">User Management</h3>
          <button 
            onClick={() => setShowAddUserModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary-dark transition-colors"
          >
            <FaPlus className="mr-2" />
            Add User
          </button>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className={`w-full px-4 py-2 pl-10 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border'}`}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
                </div>
                <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                <th className="text-left py-2">ID</th>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Registration Date</th>
                <th className="text-left py-2">Orders</th>
                <th className="text-left py-2">Actions</th>
                      </tr>
                    </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className={`${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} border-b transition-colors`}>
                  <td className="py-3">{user.id}</td>
                  <td className="py-3">{user.name}</td>
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">{user.date}</td>
                  <td className="py-3">{user.orders}</td>
                  <td className="py-3 flex">
                    <button 
                      onClick={() => handleEditUser(user)}
                      className="p-1 mr-2 text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      <FaEdit title="Edit" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(user, 'user')}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTrash title="Delete" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
        
        {/* Remove the Add User Modal and Edit User Modal from here */}
      </div>
    );
  };

  const renderSettings = () => (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Settings</h3>
        {settingsChangesSaved && (
          <span className="text-green-500 px-3 py-1 bg-green-100 rounded-lg">
            Changes saved successfully!
          </span>
        )}
      </div>
      
      <div className="space-y-6">
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h4 className="font-medium mb-4">Profile Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
              <input 
                type="text" 
                className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'border'}`}
                value={settingsData.name}
                onChange={(e) => setSettingsData({...settingsData, name: e.target.value})}
              />
            </div>
            <div>
              <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input 
                type="email" 
                className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'border'}`}
                defaultValue="admin@floralartistry.com" 
                value={settingsData.email}
                onChange={(e) => setSettingsData({...settingsData, email: e.target.value})}
              />
            </div>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h4 className="font-medium mb-4">Change Password</h4>
          <div className="space-y-4">
            <div>
              <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current Password</label>
              <input 
                type="password" 
                className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'border'}`}
                placeholder="••••••••" 
                value={settingsData.currentPassword}
                onChange={(e) => setSettingsData({...settingsData, currentPassword: e.target.value})}
              />
            </div>
            <div>
              <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>New Password</label>
              <input 
                type="password" 
                className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'border'}`}
                placeholder="••••••••" 
                value={settingsData.newPassword}
                onChange={(e) => setSettingsData({...settingsData, newPassword: e.target.value})}
              />
            </div>
            <div>
              <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confirm New Password</label>
              <input 
                type="password" 
                className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'border'}`}
                placeholder="••••••••" 
                value={settingsData.confirmPassword}
                onChange={(e) => setSettingsData({...settingsData, confirmPassword: e.target.value})}
              />
            </div>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h4 className="font-medium mb-4">Notification Settings</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Notifications</label>
              <div 
                onClick={() => toggleNotification('email')}
                className={`relative inline-block w-12 h-6 rounded-full cursor-pointer ${settingsData.notifications.email ? 'bg-primary' : 'bg-gray-300'}`}
              >
                <span 
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                    settingsData.notifications.email ? 'transform translate-x-7' : 'transform translate-x-1'
                  }`}
                ></span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Order Alerts</label>
              <div 
                onClick={() => toggleNotification('orders')}
                className={`relative inline-block w-12 h-6 rounded-full cursor-pointer ${settingsData.notifications.orders ? 'bg-primary' : 'bg-gray-300'}`}
              >
                <span 
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                    settingsData.notifications.orders ? 'transform translate-x-7' : 'transform translate-x-1'
                  }`}
                ></span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Low Stock Alerts</label>
              <div 
                onClick={() => toggleNotification('lowStock')}
                className={`relative inline-block w-12 h-6 rounded-full cursor-pointer ${settingsData.notifications.lowStock ? 'bg-primary' : 'bg-gray-300'}`}
              >
                <span 
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                    settingsData.notifications.lowStock ? 'transform translate-x-7' : 'transform translate-x-1'
                  }`}
                ></span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={saveSettings}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Save Changes
          </button>
        </div>
        </div>
      </div>
    );

  // Add this component before the return statement
  const OrderDetailsModal = ({ show, onClose, order }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className={`relative max-w-3xl w-full m-4 p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>Order ID:</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>Date:</p>
              <p className="font-medium">{order.date}</p>
            </div>
            <div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>Customer:</p>
              <p className="font-medium">{order.customer}</p>
            </div>
            <div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>Status:</p>
              <p className="font-medium">{order.status}</p>
            </div>
            <div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>Total Amount:</p>
              <p className="font-medium">{formatCurrency(order.amount)}</p>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">Order Items</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Quantity</th>
                  <th className="text-left py-2">Price</th>
                  <th className="text-left py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {(order.items || [
                  { id: 1, name: "Red Rose Bouquet", quantity: 1, price: 49.99 },
                  { id: 2, name: "Birthday Special", quantity: 1, price: 59.99 }
                ]).map((item) => (
                  <tr key={item.id} className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">{formatCurrency(item.price)}</td>
                    <td className="py-2">{formatCurrency(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
          
          <div className="flex justify-end mt-6 space-x-3">
            <button 
              onClick={onClose}
              className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            >
              Close
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
              Print Invoice
                  </button>
                </div>
              </div>
            </div>
    );
  };

  // Add booking details modal to the main component return
  // Delete this fragment and its contents as we'll move it into the return statement
  
  // Add these blog-related functions before the handleAddUser function
  const handleAddBlog = () => {
    // Create a new blog object with a unique ID
    const newId = blogs.length > 0 ? Math.max(...blogs.map(blog => blog.id)) + 1 : 1;
    const today = new Date().toISOString().slice(0, 10);
    
    const blogToAdd = {
      id: newId,
      title: newBlog.title,
      excerpt: newBlog.excerpt,
      author: newBlog.author || 'Admin User',
      date: today
    };
    
    // Add the new blog to the blogs array
    setBlogs(prevBlogs => [blogToAdd, ...prevBlogs]);
    
    // Close modal and reset form
    setShowAddBlogModal(false);
    setNewBlog({
      title: '',
      excerpt: '',
      content: '',
      author: 'Admin User'
    });
  };

  const handleEditBlog = (blog) => {
    setBlogToEdit(blog);
    setShowEditBlogModal(true);
  };

  const saveEditedBlog = () => {
    // Update the blog in the blogs array
    setBlogs(prevBlogs => 
      prevBlogs.map(blog => 
        blog.id === blogToEdit.id ? { ...blogToEdit } : blog
      )
    );
    
    setShowEditBlogModal(false);
    setBlogToEdit(null);
  };

  return (
    <div className={`min-h-screen w-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
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
                    <FaNewspaper className="mr-3" />
                    Blogs
                  </button>
                  <button
                    onClick={() => setActiveTab('chatbotLogs')}
                    className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'chatbotLogs'
                        ? 'bg-primary text-white'
                        : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <FaRobot className="mr-3" />
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
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
                    onClick={initiateLogout}
                    className="w-full flex items-center px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </div>
        </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Top Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                {/* Mobile toggle */}
                <button
                  onClick={toggleSidebar}
                  className="md:hidden mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <FaBars />
                </button>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {activeTab === 'overview' && 'Dashboard Overview'}
                  {activeTab === 'products' && 'Product Management'}
                  {activeTab === 'orders' && 'Order Management'}
                  {activeTab === 'users' && 'User Management'}
                  {activeTab === 'customBouquets' && 'Custom Bouquet Requests'}
                  {activeTab === 'quizResponses' && 'Quiz Responses'}
                  {activeTab === 'eventBookings' && 'Event Bookings'}
                  {activeTab === 'reviews' && 'Reviews'}
                  {activeTab === 'blogs' && 'Blog Management'}
                  {activeTab === 'chatbotLogs' && 'Chatbot Logs'}
                  {activeTab === 'settings' && 'Settings'}
                </h1>
        </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
                  title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {darkMode ? <FaSun /> : <FaMoon />}
                </button>
                <div className={`hidden md:flex items-center space-x-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  <span className="font-medium">{user?.name || 'Admin User'}</span>
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                    AU
      </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="pb-8">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'products' && renderProducts()}
              {activeTab === 'orders' && renderOrders()}
              {activeTab === 'users' && renderUsers()}
              {activeTab === 'customBouquets' && renderCustomBouquets()}
              {activeTab === 'quizResponses' && renderQuizResponses()}
              {activeTab === 'eventBookings' && renderEventBookings()}
              {activeTab === 'reviews' && renderReviews()}
              {activeTab === 'blogs' && renderBlogs()}
              {activeTab === 'chatbotLogs' && renderChatbotLogs()}
              {activeTab === 'settings' && renderSettings()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Dark overlay when sidebar is open on mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* All modals moved out of any render functions to the top level */}
      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-md p-6`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Product</h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <FaTimes />
              </button>
        </div>
            <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
              <div className="space-y-4">
            <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                    placeholder="Red Rose Bouquet"
                  />
      </div>
                
                    <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                  >
                    <option value="Bouquets">Bouquets</option>
                    <option value="Single Flowers">Single Flowers</option>
                    <option value="Gifts">Gifts</option>
                    <option value="Plants">Plants</option>
                  </select>
                    </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Price
                    </label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      min="0"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                      placeholder="29.99"
                    />
                    </div>
                  
                  <div>
                    <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Stock
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                      placeholder="10"
                    />
                  </div>
                </div>
                
                    <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                    placeholder="https://example.com/image.jpg"
                  />
                    </div>
                    </div>
              
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                >
                  Add Product
                </button>
                  </div>
            </form>
          </motion.div>
                </div>
      )}
      
      {/* Edit Product Modal */}
      {showEditProductModal && productToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-md p-6`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Product</h3>
              <button
                onClick={() => setShowEditProductModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); saveEditedProduct(); }}>
              <div className="space-y-4">
                    <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={productToEdit.name}
                    onChange={(e) => setProductToEdit({...productToEdit, name: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                  />
                    </div>
                
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Category
                  </label>
                  <select
                    value={productToEdit.category}
                    onChange={(e) => setProductToEdit({...productToEdit, category: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                  >
                    <option value="Bouquets">Bouquets</option>
                    <option value="Single Flowers">Single Flowers</option>
                    <option value="Gifts">Gifts</option>
                    <option value="Plants">Plants</option>
                  </select>
                    </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Price
                    </label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      min="0"
                      value={productToEdit.price}
                      onChange={(e) => setProductToEdit({...productToEdit, price: e.target.value})}
                      className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                    />
                  </div>
                
                    <div>
                    <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Stock
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={productToEdit.stock}
                      onChange={(e) => setProductToEdit({...productToEdit, stock: e.target.value})}
                      className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                    />
                    </div>
                </div>
                
                    <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Image Preview
                  </label>
                  <div className="mb-2">
                    <img 
                      src={productToEdit.image} 
                      alt={productToEdit.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    </div>
                  <input
                    type="text"
                    value={productToEdit.image}
                    onChange={(e) => setProductToEdit({...productToEdit, image: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                    placeholder="https://example.com/image.jpg"
                  />
                    </div>
                  </div>
              
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditProductModal(false)}
                  className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                >
                  Save Changes
                </button>
                </div>
            </form>
          </motion.div>
              </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-sm p-6`}
          >
            <h3 className="text-lg font-medium mb-3">Confirm Deletion</h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Are you sure you want to delete this {itemToDelete?.type}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
              >
                Cancel
                            </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Confirm
              </button>
                </div>
          </motion.div>
        </div>
      )}
      
      {/* Logout Confirmation Modal */}
      {showLogoutConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-sm p-6`}
          >
            <h3 className="text-lg font-medium mb-3">Logout Confirmation</h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutConfirmation(false)}
                className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
              >
                Cancel
                            </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Confirm
                  </button>
                </div>
          </motion.div>
              </div>
      )}
      
      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-md p-6`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New User</h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <FaTimes />
                  </button>
                </div>
            <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
              <div className="space-y-4">
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                    placeholder="John Doe"
                  />
              </div>
              
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Role
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                  >
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                  </select>
                </div>
                
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                >
                  Cancel
                            </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                >
                  Add User
                </button>
                </div>
            </form>
          </motion.div>
        </div>
      )}
      
      {/* Edit User Modal */}
      {showEditUserModal && userToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-md p-6`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit User</h3>
              <button
                onClick={() => setShowEditUserModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <FaTimes />
                  </button>
                </div>
            <form onSubmit={(e) => { e.preventDefault(); saveEditedUser(); }}>
              <div className="space-y-4">
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={userToEdit.name}
                    onChange={(e) => setUserToEdit({...userToEdit, name: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                  />
              </div>
                
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={userToEdit.email}
                    onChange={(e) => setUserToEdit({...userToEdit, email: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                  />
            </div>
                
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Role
                  </label>
                  <select
                    value={userToEdit.role || "Customer"}
                    onChange={(e) => setUserToEdit({...userToEdit, role: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                  >
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                  </select>
            </div>
                
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    New Password (leave blank to keep current)
                  </label>
                  <input
                    type="password"
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                    placeholder="••••••••"
                  />
        </div>
      </div>
              
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditUserModal(false)}
                  className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      
      {selectedOrder && (
        <OrderDetailsModal 
          show={showOrderDetailsModal}
          onClose={() => setShowOrderDetailsModal(false)}
          order={selectedOrder}
        />
      )}
      
      {/* Event Booking Details Modal */}
      {selectedBooking && showBookingDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className={`relative max-w-3xl w-full m-4 p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
            <button 
              onClick={() => setShowBookingDetailsModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
                            </button>
            <h2 className="text-xl font-semibold mb-4">Event Booking Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>Event:</p>
                <p className="font-medium">{selectedBooking.event}</p>
                </div>
              <div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>Customer:</p>
                <p className="font-medium">{selectedBooking.customer}</p>
              </div>
              <div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>Date:</p>
                <p className="font-medium">{selectedBooking.date}</p>
              </div>
              <div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>Time:</p>
                <p className="font-medium">{selectedBooking.time}</p>
              </div>
              <div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>Status:</p>
                <p className={`font-medium ${
                  selectedBooking.status === 'Confirmed' ? 'text-green-500' :
                  selectedBooking.status === 'Rejected' ? 'text-red-500' :
                  'text-yellow-500'
                }`}>{selectedBooking.status}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>Requirements:</p>
              <p className="border p-3 rounded-lg">{selectedBooking.requirements}</p>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              {selectedBooking.status === 'Pending' && (
                <>
                  <button
                    onClick={() => {
                      handleConfirmBooking(selectedBooking);
                      setShowBookingDetailsModal(false);
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => {
                      handleRejectBooking(selectedBooking);
                      setShowBookingDetailsModal(false);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Reject Booking
                  </button>
                </>
              )}
              {selectedBooking.status === 'Confirmed' && (
                <button
                  onClick={() => {
                    handleRejectBooking(selectedBooking);
                    setShowBookingDetailsModal(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Reject Booking
                </button>
              )}
              {selectedBooking.status === 'Rejected' && (
                <button
                  onClick={() => {
                    handleConfirmBooking(selectedBooking);
                    setShowBookingDetailsModal(false);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Confirm Booking
                </button>
              )}
              <button
                onClick={() => setShowBookingDetailsModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Close
                  </button>
                </div>
              </div>
            </div>
          )}
          
      {/* Add Blog Post Modal */}
      {showAddBlogModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-2xl p-6`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Blog Post</h3>
              <button
                onClick={() => setShowAddBlogModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleAddBlog(); }}>
              <div className="space-y-4">
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                    placeholder="Enter blog title"
                  />
                </div>
                
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Excerpt
                  </label>
                  <input
                    type="text"
                    required
                    value={newBlog.excerpt}
                    onChange={(e) => setNewBlog({...newBlog, excerpt: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                    placeholder="Brief summary of the blog post"
                  />
                </div>
                
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Content
                  </label>
                  <textarea
                    required
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                    rows="6"
                    placeholder="Enter blog content"
                  ></textarea>
                </div>
                
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Author
                  </label>
                  <input
                    type="text"
                    value={newBlog.author}
                    onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                    placeholder="Admin User"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddBlogModal(false)}
                  className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                >
                  Add Post
                </button>
              </div>
            </form>
          </motion.div>
            </div>
          )}

      {/* Edit Blog Modal */}
      {showEditBlogModal && blogToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-2xl p-6`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Blog Post</h3>
              <button
                onClick={() => setShowEditBlogModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <FaTimes />
              </button>
        </div>
            <form onSubmit={(e) => { e.preventDefault(); saveEditedBlog(); }}>
              <div className="space-y-4">
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={blogToEdit.title}
                    onChange={(e) => setBlogToEdit({...blogToEdit, title: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                  />
      </div>
                
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Excerpt
                  </label>
                  <input
                    type="text"
                    required
                    value={blogToEdit.excerpt}
                    onChange={(e) => setBlogToEdit({...blogToEdit, excerpt: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                  />
                </div>
                
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Author
                  </label>
                  <input
                    type="text"
                    value={blogToEdit.author}
                    onChange={(e) => setBlogToEdit({...blogToEdit, author: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditBlogModal(false)}
                  className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {showImproveResponseModal && responseToImprove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-2xl p-6`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Improve Chatbot Response</h3>
              <button
                onClick={() => setShowImproveResponseModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); saveImprovedResponse(); }}>
              <div className="space-y-4">
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    User Query
                  </label>
                  <div className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {responseToImprove.query}
                  </div>
                </div>
                
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Current Response
                  </label>
                  <div className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {responseToImprove.response}
                  </div>
                </div>
                
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Improved Response
                  </label>
                  <textarea
                    required
                    value={improvedResponse}
                    onChange={(e) => setImprovedResponse(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border'}`}
                    rows="4"
                    placeholder="Enter improved response..."
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setShowImproveResponseModal(false)}
                  className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                >
                  Save Response
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      
      {showSettingsConfirmation && (
        <ConfirmationModal
          show={showSettingsConfirmation}
          onClose={() => setShowSettingsConfirmation(false)}
          onConfirm={applySettings}
          title="Save Changes"
          message="Are you sure you want to save these changes?"
        />
      )}
    </div>
  );
};

export default AdminDashboard; 