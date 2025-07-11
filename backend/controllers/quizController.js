import Quiz from '../models/Quiz.js';
import Product from '../models/Product.js';

// Get all quiz questions
export const getQuizQuestions = async (req, res) => {
  try {
    const questions = await Quiz.find().sort({ order: 1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get recommendations based on quiz answers
export const getRecommendations = async (req, res) => {
  try {
    const { answers } = req.body;
    
    // Get the occasion from answers (assuming it's the first question)
    const occasion = answers[0]?.value;
    
    if (!occasion) {
      return res.status(400).json({ message: 'No occasion selected' });
    }
    
    // Find products matching the occasion
    const products = await Product.find({
      category: occasion,
      stock: { $gt: 0 }
    }).limit(6);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new quiz question (admin only)
export const addQuizQuestion = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    const savedQuiz = await quiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a quiz question (admin only)
export const updateQuizQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz question not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a quiz question (admin only)
export const deleteQuizQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz question not found' });
    }
    res.json({ message: 'Quiz question deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 