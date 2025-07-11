import React from 'react';
import { motion } from 'framer-motion';

/**
 * Component for displaying a single quiz question with options
 * @param {Object} props
 * @param {Object} props.question - The question data
 * @param {number} props.questionNumber - The current question number
 * @param {number} props.totalQuestions - Total number of questions
 * @param {string} props.selectedAnswer - Currently selected answer
 * @param {Function} props.onSelectAnswer - Function to handle answer selection
 * @param {Function} props.onNext - Function to move to next question
 * @param {Function} props.onPrevious - Function to move to previous question
 */
const QuizQuestion = ({ 
  question, 
  questionNumber, 
  totalQuestions,
  selectedAnswer, 
  onSelectAnswer, 
  onNext, 
  onPrevious 
}) => {
  const containerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="h-2 bg-gray-200 rounded-full w-32 md:w-64">
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          {question.text}
        </h2>
      </div>
      
      <div className="space-y-3 mb-8">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(option.value)}
            className={`w-full text-left p-4 rounded-lg border transition-colors ${
              selectedAnswer === option.value
                ? 'bg-primary-50 border-primary'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div className={`h-5 w-5 rounded-full flex items-center justify-center border ${
                selectedAnswer === option.value
                  ? 'border-primary bg-primary'
                  : 'border-gray-300'
              }`}>
                {selectedAnswer === option.value && (
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className="ml-3">{option.label}</span>
            </div>
            
            {option.image && (
              <div className="mt-3 h-32 rounded-lg overflow-hidden">
                <img 
                  src={option.image} 
                  alt={option.label} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          disabled={questionNumber === 1}
          className={`px-4 py-2 rounded-md ${
            questionNumber === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Previous
        </button>
        
        <button
          onClick={onNext}
          disabled={!selectedAnswer}
          className={`px-6 py-2 rounded-md ${
            !selectedAnswer
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          {questionNumber === totalQuestions ? 'Finish' : 'Next'}
        </button>
      </div>
    </motion.div>
  );
};

export default QuizQuestion; 