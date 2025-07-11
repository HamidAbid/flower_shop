import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';

// Sample bouquet recommendations
const bouquetRecommendations = {
  romantic: [
    {
      id: 101,
      name: 'Love',
      description: 'A classic arrangement of red roses with eucalyptus, perfect for expressing deep love.',
      price: 69.99,
      image: 'http://localhost:3000/img/love.WEBP'
    },
    {
      id: 102,
      name: 'Sweet Whispers',
      description: 'Pink and white roses with baby\'s breath, expressing tender feelings.',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?q=80&w=1372&auto=format&fit=crop'
    }
  ],
  congratulations: [
    {
      id: 201,
      name: 'Celebration',
      description: 'A vibrant mix of sunflowers, gerbera daisies and chrysanthemums to celebrate success.',
      price: 49.99,
      image: 'http://localhost:3000/img/celebration.WEBP'
    },
    {
      id: 202,
      name: 'New Beginnings',
      description: 'A cheerful arrangement of yellow tulips and white lilies to mark a new chapter.',
      price: 54.99,
      image: 'https://images.unsplash.com/photo-1531637078800-a52de262330f?q=80&w=1471&auto=format&fit=crop'
    }
  ],
  sympathy: [
    {
      id: 301,
      name: 'Peaceful Thoughts',
      description: 'An elegant arrangement of white lilies and roses expressing sympathy and respect.',
      price: 64.99,
      image: 'https://images.unsplash.com/photo-1591710668263-bee1e9db2a26?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 302,
      name: 'Gentle Embrace',
      description: 'Soft pastel flowers conveying comfort and remembrance during difficult times.',
      price: 59.99,
      image: 'http://localhost:3000/img/gentle.WEBP'
    }
  ],
  birthday: [
    {
      id: 401,
      name: 'Birthday Bash',
      description: 'A vibrant, colorful arrangement to make their special day even brighter.',
      price: 49.99,
      image: 'http://localhost:3000/img/birthday.WEBP'
    },
    {
      id: 402,
      name: 'Another Year Wiser',
      description: 'An elegant mixture of premium blooms to celebrate another year of life.',
      price: 59.99,
      image: 'http://localhost:3000/img/year.AVIF'
    }
  ],
  thankYou: [
    {
      id: 501,
      name: 'Grateful Heart',
      description: 'Express your gratitude with this thoughtful arrangement of peach roses and white lilies.',
      price: 44.99,
      image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 502,
      name: 'Appreciation',
      description: 'A harmonious blend of purple and white flowers to show how much you care.',
      price: 49.99,
      image: 'http://localhost:3000/img/apprecation.WEBP'
    }
  ],
  getWell: [
    {
      id: 601,
      name: 'Sunshine Remedy',
      description: 'Bright yellow and orange flowers to lift spirits and speed recovery.',
      price: 45.99,
      image: 'http://localhost:3000/img/sunshine.WEBP'
    },
    {
      id: 602,
      name: 'Healing Thoughts',
      description: 'A soothing arrangement of soft colors to bring comfort during recuperation.',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1518709911915-712d5fd04677?q=80&w=1376&auto=format&fit=crop'
    }
  ]
};

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "What's the occasion for these flowers?",
    options: [
      { value: 'romantic', label: 'Anniversary' },
      { value: 'birthday', label: 'Birthday' },
      { value: 'congratulations', label: 'Congratulations' },
      { value: 'sympathy', label: 'Sympathy/Condolences' },
      { value: 'thankYou', label: 'Thank You' },
      { value: 'getWell', label: 'Get Well' }
    ]
  },
  {
    id: 2,
    question: "What color palette would the recipient prefer?",
    options: [
      { value: 'red', label: 'Red/Pink (Passionate)' },
      { value: 'pastel', label: 'Pastels (Soft and Gentle)' },
      { value: 'bright', label: 'Bright Colors (Vibrant and Bold)' },
      { value: 'white', label: 'White/Cream (Elegant and Pure)' },
      { value: 'purple', label: 'Purple/Blue (Sophisticated)' },
      { value: 'yellow', label: 'Yellow/Orange (Cheerful)' }
    ]
  },
  {
    id: 3,
    question: "What kind of arrangement style do you prefer?",
    options: [
      { value: 'classic', label: 'Classic and Traditional' },
      { value: 'modern', label: 'Modern and Unique' },
      { value: 'rustic', label: 'Rustic and Natural' },
      { value: 'luxurious', label: 'Luxurious and Premium' },
      { value: 'simple', label: 'Simple and Minimalist' }
    ]
  },
  {
    id: 4,
    question: "What's your budget range?",
    options: [
      { value: 'budget', label: 'Under $50' },
      { value: 'moderate', label: '$50 - $75' },
      { value: 'premium', label: '$75 - $100' },
      { value: 'luxury', label: 'Over $100' }
    ]
  }
];

const QuickQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const { cartItems, setCartItems } = useContext(CartContext);
  
  // Handle option selection
  const handleOptionSelect = (optionValue) => {
    // Save the answer
    const updatedAnswers = {
      ...answers,
      [quizQuestions[currentQuestionIndex].id]: optionValue
    };
    setAnswers(updatedAnswers);
    
    // Move to next question or complete quiz
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Generate recommendations based on answers
      generateRecommendations(updatedAnswers);
      setQuizCompleted(true);
    }
  };
  
  // Generate bouquet recommendations based on quiz answers
  const generateRecommendations = (userAnswers) => {
    // In a real app, this would use a more sophisticated algorithm
    // For this example, we'll primarily use the occasion to recommend bouquets
    const occasion = userAnswers[1]; // First question answer (occasion)
    
    if (occasion && bouquetRecommendations[occasion]) {
      setRecommendations(bouquetRecommendations[occasion]);
    } else {
      // Fallback to a default recommendation
      setRecommendations(bouquetRecommendations.birthday);
    }
  };
  
  // Restart the quiz
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuizCompleted(false);
    setRecommendations([]);
  };
  
  // Add bouquet to cart
  const handleAddToCart = (bouquet) => {
    setCartItems([...cartItems, bouquet]);
    alert(`${bouquet.name} added to your cart!`);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Flower Recommendation Quiz</h1>
          <p className="mt-2 text-lg text-gray-600">
            Answer a few quick questions to help us find the perfect bouquet for you
          </p>
        </div>
        
        {!quizCompleted ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Progress bar */}
            <div className="bg-gray-100 h-2">
              <div 
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
            
            <div className="p-6 sm:p-8">
              {/* Question */}
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                {quizQuestions[currentQuestionIndex].question}
              </h2>
              
              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quizQuestions[currentQuestionIndex].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect(option.value)}
                    className="p-4 border border-gray-200 rounded-lg text-left hover:border-primary hover:bg-pink-50 transition-colors"
                  >
                    <div className="font-medium text-gray-800">{option.label}</div>
                  </button>
                ))}
              </div>
              
              {/* Question counter */}
              <div className="mt-6 text-sm text-gray-500 text-right">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-8">
              <div className="flex items-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-900">Here are our recommendations for you!</h2>
              </div>
              
              <p className="text-gray-600 mb-4">
                Based on your preferences, we think these bouquets would be perfect. You can add them to your cart directly or explore more details.
              </p>
              
              <button 
                onClick={handleRestartQuiz} 
                className="text-primary hover:text-pink-600 font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Restart Quiz
              </button>
            </div>
            
            {/* Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((bouquet) => (
                <div key={bouquet.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={bouquet.image} 
                      alt={bouquet.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{bouquet.name}</h3>
                    <p className="text-gray-600 mb-3">{bouquet.description}</p>
                    <p className="text-lg font-bold text-gray-900 mb-4">${bouquet.price.toFixed(2)}</p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleAddToCart(bouquet)}
                        className="btn-primary py-2"
                      >
                        Add to Cart
                      </button>
                      <Link to={`/quiz/product/${bouquet.id}`} className="btn-primary">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickQuiz; 