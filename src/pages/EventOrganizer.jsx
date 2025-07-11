import { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample event categories and decorations
const eventCategories = [
  {
    id: 'weddings',
    name: 'Weddings',
    description: 'Elegant floral arrangements for your special day',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1469&auto=format&fit=crop'
  },
  {
    id: 'corporate',
    name: 'Corporate Events',
    description: 'Professional arrangements for conferences and business events',
    image: 'http://localhost:3000/img/event2.AVIF'
  },
  {
    id: 'birthdays',
    name: 'Birthday Parties',
    description: 'Colorful and festive decorations to celebrate another year',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'anniversaries',
    name: 'Anniversaries',
    description: 'Eye catching settings to commemorate your special milestone',
    image: 'http://localhost:3000/img/event4.AVIF'
  }
];

const decorationIdeas = {
  weddings: [
    {
      id: 'w1',
      title: 'Classic Elegance',
      description: 'White roses, lilies, and greenery for a timeless and elegant wedding decoration.',
      image: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?q=80&w=1438&auto=format&fit=crop',
      price: 1200,
      features: ['Bridal bouquet', 'Bridesmaid bouquets', 'Centerpieces', 'Altar decoration', 'Aisle flowers']
    },
    {
      id: 'w2',
      title: 'Affectionate',
      description: 'Natural elements with wildflowers, eucalyptus, and vintage containers for a rustic feel.',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1470&auto=format&fit=crop',
      price: 950,
      features: ['Custom arch', 'Table arrangements', 'Mason jar decorations', 'Hanging installations', 'Barn setting enhancements']
    },
    {
      id: 'w3',
      title: 'Modern Minimalist',
      description: 'Clean lines with sculptural arrangements featuring exotic flowers and contemporary design.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1470&auto=format&fit=crop',
      price: 1400,
      features: ['Geometric stands', 'Orchid arrangements', 'Monochromatic designs', 'Lucite elements', 'Statement pieces']
    }
  ],
  corporate: [
    {
      id: 'c1',
      title: 'Professional Welcome',
      description: 'Reception area and entrance arrangements that reflect your company\'s branding.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop',
      price: 600,
      features: ['Reception desk arrangements', 'Branded colors', 'Entrance displays', 'Low-maintenance plants', 'Weekly rotation option']
    },
    {
      id: 'c2',
      title: 'Conference Setup',
      description: 'Sophisticated floral arrangements for meeting rooms, podiums, and networking areas.',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1470&auto=format&fit=crop',
      price: 850,
      features: ['Stage arrangements', 'Table centerpieces', 'Backdrop designs', 'VIP area decorations', 'Break area displays']
    }
  ],
  birthdays: [
    {
      id: 'b1',
      title: 'Festive Celebration',
      description: 'Bright and colorful arrangements to create a joyful birthday atmosphere.',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1470&auto=format&fit=crop',
      price: 450,
      features: ['Balloon and flower combinations', 'Custom age displays', 'Themed centerpieces', 'Photo area backdrop', 'Gift table decoration']
    },
    {
      id: 'b2',
      title: 'Luxury Birthday Experience',
      description: 'Premium floral designs for milestone birthdays and sophisticated celebrations.',
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1470&auto=format&fit=crop',
      price: 750,
      features: ['Premium roses', 'Gold or silver accents', 'Champagne display', 'Custom number arrangements', 'Take-home arrangements for guests']
    }
  ],
  anniversaries: [
    {
      id: 'a1',
      title: ' BeautifulSetting',
      description: 'Create an intimate and good atmosphere with roses and candlelight.',
      image: 'http://localhost:3000/img/beauty.WEBP',
      price: 550,
      features: ['Red rose arrangements', 'Candle settings', 'Pathway of petals', 'Sweetheart table', 'Custom year display']
    },
    {
      id: 'a2',
      title: 'Memory Lane',
      description: 'Personalized decorations that celebrate your journey together with customized elements.',
      image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1470&auto=format&fit=crop',
      price: 650,
      features: ['Photo timeline with flowers', 'Customized arrangement with significant blooms', 'Memory table setting', 'Anniversary number display', 'Keepsake arrangement']
    }
  ]
};

const EventOrganizer = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showConsultForm, setShowConsultForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    guests: '',
    budget: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    window.scrollTo({ top: document.getElementById('ideas-section').offsetTop - 100, behavior: 'smooth' });
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    validateField(name, formData[name]);
  };
  
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 3) {
          error = 'Name must be at least 3 characters';
        }
        break;
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = 'Invalid email address';
        }
        break;
      case 'phone':
        if (!value) {
          error = 'Phone number is required';
        } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/i.test(value)) {
          error = 'Invalid phone number format';
        }
        break;
      case 'eventDate':
        if (!value) {
          error = 'Event date is required';
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          if (selectedDate < today) {
            error = 'Event date cannot be in the past';
          }
        }
        break;
      case 'eventType':
        if (!value) {
          error = 'Please select an event type';
        }
        break;
      case 'guests':
        if (value && (isNaN(value) || parseInt(value) < 1)) {
          error = 'Please enter a valid number of guests';
        }
        break;
      default:
        break;
    }
    
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
    
    return !error;
  };
  
  const validateForm = () => {
    const requiredFields = ['name', 'email', 'phone', 'eventDate', 'eventType'];
    let isValid = true;
    let newErrors = {};
    let newTouched = {};
    
    // Mark all fields as touched
    requiredFields.forEach(field => {
      newTouched[field] = true;
      const fieldIsValid = validateField(field, formData[field]);
      if (!fieldIsValid) {
        isValid = false;
        newErrors[field] = errors[field] || `${field} is required`;
      }
    });
    
    setTouched({...touched, ...newTouched});
    setErrors({...errors, ...newErrors});
    
    return isValid;
  };

  // Function to handle consultation form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would send the data to a server
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Thank you for your interest! Our event specialist will contact you shortly.');
      setShowConsultForm(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        eventType: '',
        guests: '',
        budget: '',
        message: ''
      });
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date in YYYY-MM-DD format for the min date attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-32" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1470&auto=format&fit=crop)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Event Decoration Services</h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Transform your special occasions with our stunning floral arrangements and decorations
          </p>
          <button 
            onClick={() => setShowConsultForm(true)}
            className="btn-primary text-lg px-8 py-3"
          >
            Schedule a Consultation
          </button>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Explore Event Types</h2>
            <p className="mt-4 text-lg text-gray-600">
              We provide floral decoration services for a wide range of events
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventCategories.map((category) => (
              <div 
                key={category.id}
                className={`group rounded-lg overflow-hidden shadow-md ${
                  selectedCategory === category.id ? 'ring-2 ring-primary ring-offset-2' : ''
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{category.name}</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <button
                    onClick={() => handleCategorySelect(category.id)}
                    className="w-full py-2 bg-white border border-gray-300 rounded-md text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    View Ideas
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decoration Ideas Section */}
      <section id="ideas-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedCategory ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">
                  {eventCategories.find(cat => cat.id === selectedCategory)?.name} Decoration Ideas
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Find inspiration for your upcoming event
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {decorationIdeas[selectedCategory]?.map((idea) => (
                  <div key={idea.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                    <div className="md:flex">
                      <div className="md:flex-shrink-0 md:w-2/5">
                        <img
                          src={idea.image}
                          alt={idea.title}
                          className="h-64 w-full object-cover md:h-full"
                        />
                      </div>
                      <div className="p-6 md:w-3/5">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{idea.title}</h3>
                        <p className="text-gray-600 mb-4">{idea.description}</p>
                        <p className="text-primary font-bold mb-4">Starting at ${idea.price}</p>
                        
                        <h4 className="font-medium text-gray-900 mb-2">Includes:</h4>
                        <ul className="mb-6 space-y-1">
                          {idea.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        <button
                          onClick={() => setShowConsultForm(true)}
                          className="btn-primary w-full"
                        >
                          Request This Package
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <h3 className="text-xl text-gray-600">Select an event type above to see decoration ideas</h3>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Event Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              We're dedicated to making your special day unforgettable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Custom Designs</h3>
              <p className="text-gray-600">
                We create unique floral arrangements tailored to your event theme, color scheme, and personal preferences.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Reliable Service</h3>
              <p className="text-gray-600">
                Our professional team ensures timely setup and breakdown, so you can focus on enjoying your special event.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Flowers</h3>
              <p className="text-gray-600">
                We source the freshest, highest quality blooms to ensure your event decorations look spectacular.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form Modal */}
      {showConsultForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Schedule a Consultation</h3>
                <button 
                  onClick={() => setShowConsultForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`input-field w-full ${errors.name && touched.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && touched.name && (
                      <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`input-field w-full ${errors.email && touched.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="e.g., 123-456-7890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`input-field w-full ${errors.phone && touched.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && touched.phone && (
                      <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      required
                      min={minDate}
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`input-field w-full ${errors.eventDate && touched.eventDate ? 'border-red-500' : ''}`}
                    />
                    {errors.eventDate && touched.eventDate && (
                      <p className="mt-1 text-red-500 text-sm">{errors.eventDate}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Type *
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      required
                      value={formData.eventType}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`input-field w-full ${errors.eventType && touched.eventType ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select Event Type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.eventType && touched.eventType && (
                      <p className="mt-1 text-red-500 text-sm">{errors.eventType}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      min="1"
                      value={formData.guests}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`input-field w-full ${errors.guests && touched.guests ? 'border-red-500' : ''}`}
                    />
                    {errors.guests && touched.guests && (
                      <p className="mt-1 text-red-500 text-sm">{errors.guests}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="input-field w-full"
                  >
                    <option value="">Select Budget Range</option>
                    <option value="under500">Under $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000-2000">$1,000 - $2,000</option>
                    <option value="2000-5000">$2,000 - $5,000</option>
                    <option value="over5000">Over $5,000</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    placeholder="Tell us more about your event, theme, color preferences, etc."
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="btn-primary w-full py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventOrganizer; 