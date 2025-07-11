import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  getAllOrders,
  updateOrderStatus,
  getAllQuotes
} from '../controllers/adminController.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin authentication
router.use(auth);
router.use(isAdmin);

// Dashboard
router.get('/dashboard', getDashboardStats);

// User management
router.get('/users', getAllUsers);
router.put('/users/:userId/role', updateUserRole);

// Order management
router.get('/orders', getAllOrders);
router.put('/orders/:orderId/status', updateOrderStatus);

// Quote management
router.get('/quotes', getAllQuotes);

export default router; 