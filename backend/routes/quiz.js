import express from 'express';
import {
  getQuizQuestions,
  getRecommendations,
  addQuizQuestion,
  updateQuizQuestion,
  deleteQuizQuestion
} from '../controllers/quizController.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/questions', getQuizQuestions);
router.post('/recommendations', getRecommendations);

// Admin routes
router.post('/questions', isAdmin, addQuizQuestion);
router.put('/questions/:id', isAdmin, updateQuizQuestion);
router.delete('/questions/:id', isAdmin, deleteQuizQuestion);

export default router; 