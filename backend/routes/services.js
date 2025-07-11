import express from 'express';
import {
  getServices,
  getServiceByType,
  createService,
  updateService,
  deleteService,
  submitQuote,
  getQuotes,
  updateQuoteStatus
} from '../controllers/serviceController.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getServices);
router.get('/:type', getServiceByType);
router.post('/quotes', submitQuote);

// Admin routes
router.post('/', isAdmin, createService);
router.put('/:id', isAdmin, updateService);
router.delete('/:id', isAdmin, deleteService);
router.get('/quotes/all', isAdmin, getQuotes);
router.put('/quotes/:id/status', isAdmin, updateQuoteStatus);

export default router; 