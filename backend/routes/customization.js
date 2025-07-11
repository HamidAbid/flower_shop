import express from 'express';
import {
  getCustomizationOptions,
  submitCustomization,
  getCustomizationHistory
} from '../controllers/customizationController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get customization options for a product
router.get('/options/:productId', getCustomizationOptions);

// Submit a customization request (requires authentication)
router.post('/submit', auth, submitCustomization);

// Get user's customization history (requires authentication)
router.get('/history', auth, getCustomizationHistory);

export default router; 