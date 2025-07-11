import User from '../models/User.js';
import Order from '../models/Order.js';

// @desc    Get user's orders
// @route   GET /api/users/orders
// @access  Private
export const getUserOrders = async (req, res) => {
  try {
    console.log(`Fetching orders for user: ${req.user._id}`);
    
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });
      
    console.log(`Found ${orders.length} orders for user: ${req.user._id}`);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Change user password
// @route   PUT /api/users/password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    console.log(`Changing password for user: ${req.user._id}`);
    
    const { currentPassword, newPassword } = req.body;
    
    // Find user
    const user = await User.findById(req.user._id);
    
    if (!user) {
      console.log(`Password change failed: User not found with ID ${req.user._id}`);
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    
    if (!isMatch) {
      console.log(`Password change failed: Current password is incorrect for user ${req.user._id}`);
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    console.log(`Password changed successfully for user: ${req.user._id}`);
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user's wishlist
// @route   GET /api/users/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  try {
    console.log(`Fetching wishlist for user: ${req.user._id}`);
    
    const user = await User.findById(req.user._id)
      .populate('wishlist');
      
    if (!user) {
      console.log(`Wishlist fetch failed: User not found with ID ${req.user._id}`);
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log(`Found ${user.wishlist?.length || 0} wishlist items for user: ${req.user._id}`);
    res.json(user.wishlist || []);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist
// @access  Private
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    
    console.log(`Adding product ${productId} to wishlist for user: ${req.user._id}`);
    
    // Update user's wishlist
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { wishlist: productId } }, // $addToSet ensures no duplicates
      { new: true }
    ).populate('wishlist');
    
    if (!user) {
      console.log(`Add to wishlist failed: User not found with ID ${req.user._id}`);
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log(`Product ${productId} added to wishlist for user: ${req.user._id}`);
    res.json(user.wishlist || []);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    
    console.log(`Removing product ${productId} from wishlist for user: ${req.user._id}`);
    
    // Update user's wishlist
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { wishlist: productId } },
      { new: true }
    ).populate('wishlist');
    
    if (!user) {
      console.log(`Remove from wishlist failed: User not found with ID ${req.user._id}`);
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log(`Product ${productId} removed from wishlist for user: ${req.user._id}`);
    res.json(user.wishlist || []);
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 