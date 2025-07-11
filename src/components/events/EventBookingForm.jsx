import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

/**
 * Event booking form component
 * @param {Object} props
 * @param {Function} props.onSubmit - Submit handler
 * @param {boolean} props.isLoading - Loading state
 */
const EventBookingForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'wedding',
    eventDate: '',
    eventTime: '',
    guestCount: '',
    location: '',
    details: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const eventTypes = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'graduation', label: 'Graduation' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
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
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(0, 0, 0, 0);
          
          if (selectedDate < tomorrow) {
            error = 'Event date must be at least tomorrow';
          }
        }
        break;
      case 'eventTime':
        if (!value) {
          error = 'Event time is required';
        }
        break;
      case 'guestCount':
        if (!value) {
          error = 'Guest count is required';
        } else if (parseInt(value) < 1) {
          error = 'Must have at least 1 guest';
        } else if (parseInt(value) > 1000) {
          error = 'For events with more than 1000 guests, please contact us directly';
        }
        break;
      case 'location':
        if (!value.trim()) {
          error = 'Event location is required';
        } else if (value.trim().length < 5) {
          error = 'Please provide a more specific location';
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
    const requiredFields = ['name', 'email', 'phone', 'eventDate', 'eventTime', 'guestCount', 'location'];
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Get tomorrow's date in YYYY-MM-DD format for the min date attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Your Event</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-2 border ${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.name && touched.name && (
              <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-2 border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.email && touched.email && (
              <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="e.g., 123-456-7890"
              className={`w-full px-4 py-2 border ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.phone && touched.phone && (
              <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="eventType" className="block text-gray-700 font-medium mb-2">
              Event Type
            </label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {eventTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="eventDate" className="block text-gray-700 font-medium mb-2">
              Event Date
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              onBlur={handleBlur}
              min={minDate}
              required
              className={`w-full px-4 py-2 border ${errors.eventDate && touched.eventDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.eventDate && touched.eventDate && (
              <p className="mt-1 text-red-500 text-sm">{errors.eventDate}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="eventTime" className="block text-gray-700 font-medium mb-2">
              Event Time
            </label>
            <input
              type="time"
              id="eventTime"
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-2 border ${errors.eventTime && touched.eventTime ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.eventTime && touched.eventTime && (
              <p className="mt-1 text-red-500 text-sm">{errors.eventTime}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="guestCount" className="block text-gray-700 font-medium mb-2">
              Number of Guests
            </label>
            <input
              type="number"
              id="guestCount"
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
              onBlur={handleBlur}
              min="1"
              max="1000"
              required
              className={`w-full px-4 py-2 border ${errors.guestCount && touched.guestCount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.guestCount && touched.guestCount && (
              <p className="mt-1 text-red-500 text-sm">{errors.guestCount}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
              Event Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-2 border ${errors.location && touched.location ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.location && touched.location && (
              <p className="mt-1 text-red-500 text-sm">{errors.location}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="details" className="block text-gray-700 font-medium mb-2">
            Additional Details
          </label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Please share any specific requirements or preferences for your event..."
          />
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Book Event'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default EventBookingForm; 