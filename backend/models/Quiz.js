import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    text: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }],
  order: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['occasion', 'style', 'color', 'budget', 'recipient']
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz; 