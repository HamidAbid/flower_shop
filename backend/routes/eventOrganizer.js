import express from 'express';
import {
  getOrganizerProfile,
  updateOrganizerProfile,
  getOrganizerServices,
  getOrganizerQuotes,
  updateQuoteStatus
} from '../controllers/eventOrganizerController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

// Profile routes
router.get('/profile', getOrganizerProfile);
router.put('/profile', updateOrganizerProfile);

// Services routes
router.get('/services', getOrganizerServices);

// Quote routes
router.get('/quotes', getOrganizerQuotes);
router.put('/quotes/:quoteId', updateQuoteStatus);

export default router; 