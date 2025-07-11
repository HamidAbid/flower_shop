import express from 'express';
import {
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
  updateOrderToProcessing,
  updateOrderToShipped,
  addTrackingEvent,
  trackOrder
} from '../controllers/orderController.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(auth, createOrder)
  .get(auth, isAdmin, getOrders);

router.route('/myorders')
  .get(auth, getMyOrders);

// Public tracking route (no auth required)
router.route('/track/:identifier')
  .get(trackOrder);

router.route('/:id')
  .get(auth, getOrderById);

router.route('/:id/pay')
  .put(auth, updateOrderToPaid);

router.route('/:id/process')
  .put(auth, isAdmin, updateOrderToProcessing);

router.route('/:id/ship')
  .put(auth, isAdmin, updateOrderToShipped);

router.route('/:id/deliver')
  .put(auth, isAdmin, updateOrderToDelivered);

router.route('/:id/tracking')
  .post(auth, isAdmin, addTrackingEvent);

export default router; 