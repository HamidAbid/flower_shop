import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../App';
import { ordersAPI } from '../utils/api';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, setCartItems } = useContext(CartContext);
  
  // Add state for confirmation modal
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    deliveryNotes: '',
    paymentMethod: 'creditCard',
    deliveryOption: 'regular',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  // Validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Summary data - either from location state or calculated
  const [summary, setSummary] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    sameDayDelivery: 0,
    total: 0
  });

  // Initialize summary data
  useEffect(() => {
    if (location.state) {
      // Use data passed from cart
      const sameDayDelivery = formData.deliveryOption === 'sameDay' ? 5 : 0;
      setSummary({
        subtotal: location.state.subtotal || 0,
        shipping: location.state.shipping || 0,
        tax: location.state.tax || 0,
        sameDayDelivery,
        total: (location.state.total || 0) + sameDayDelivery
      });
    } else {
      // Calculate if not available (e.g., direct navigation to checkout)
      const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
      const shipping = subtotal > 100 ? 0 : 10.99;
      const tax = subtotal * 0.07;
      const sameDayDelivery = formData.deliveryOption === 'sameDay' ? 5 : 0;
      const total = subtotal + shipping + tax + sameDayDelivery;
      
      setSummary({
        subtotal,
        shipping,
        tax,
        sameDayDelivery,
        total
      });
    }
  }, [location.state, cartItems, formData.deliveryOption]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Update total when delivery option changes
    if (name === 'deliveryOption') {
      const sameDayDelivery = value === 'sameDay' ? 5 : 0;
      const newTotal = summary.subtotal + summary.shipping + summary.tax + sameDayDelivery;
      setSummary(prev => ({
        ...prev,
        sameDayDelivery,
        total: newTotal
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    let errors = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';

    // Credit card validation
    if (formData.paymentMethod === 'creditCard') {
      if (!formData.cardNumber.trim()) errors.cardNumber = 'Card number is required';
      if (!formData.cardName.trim()) errors.cardName = 'Cardholder name is required';
      if (!formData.expiryDate.trim()) errors.expiryDate = 'Expiry date is required';
      if (!formData.cvv.trim()) errors.cvv = 'CVV is required';
    }
    
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    const errors = validateForm();
    setFormErrors(errors);
    
    // If no errors, proceed with order creation
    if (Object.keys(errors).length === 0) {
      try {
        const newOrderNumber = `ORD-${Date.now()}`;
        setOrderNumber(newOrderNumber);
        
        // Create shipping address object
        const shippingAddress = {
          street: formData.address,
          city: formData.city,
          state: formData.state || '',
          zipCode: formData.zipCode || '',
          country: formData.country || 'US'
        };
        
        const orderData = {
          items: cartItems.map(item => ({
            product: item.id,
            quantity: item.quantity || 1,
            price: item.price
          })),
          shippingAddress: shippingAddress,
          paymentMethod: formData.paymentMethod === 'creditCard' ? 'credit_card' : 'cash_on_delivery',
          deliveryOption: formData.deliveryOption,
          shippingCharges: summary.shipping
        };
        
        // Submit order to backend
        try {
          const createdOrder = await ordersAPI.create(orderData);
          console.log('Order created successfully:', createdOrder);
        } catch (error) {
          console.error('Failed to create order:', error);
          // Continue with the flow even if API call fails (for demo purposes)
        }
        
        // Show confirmation popup
        setShowConfirmation(true);
        
        // Clear the cart
        setCartItems([]);
      } catch (error) {
        console.error('Error during checkout:', error);
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  // Close confirmation and redirect to home
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    navigate('/');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="mt-2 text-lg text-gray-600">
            Complete your purchase by providing delivery and payment details
          </p>
        </div>

        {cartItems.length === 0 && !location.state ? (
          <div className="text-center bg-white rounded-lg shadow-md p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items to your cart before proceeding to checkout.</p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Return to Shop
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Delivery Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`input-field w-full ${formErrors.firstName ? 'border-red-500' : ''}`}
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`input-field w-full ${formErrors.lastName ? 'border-red-500' : ''}`}
                    />
                    {formErrors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`input-field w-full ${formErrors.email ? 'border-red-500' : ''}`}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`input-field w-full ${formErrors.phone ? 'border-red-500' : ''}`}
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`input-field w-full ${formErrors.address ? 'border-red-500' : ''}`}
                  />
                  {formErrors.address && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
                  )}
                </div>
                
                <div className="mt-4 grid grid-cols-1">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`input-field w-full ${formErrors.city ? 'border-red-500' : ''}`}
                    />
                    {formErrors.city && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>
                    )}
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Option*
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="regular"
                        checked={formData.deliveryOption === 'regular'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Regular Delivery (2-3 business days)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="sameDay"
                        checked={formData.deliveryOption === 'sameDay'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Same Day Delivery (+$5.00)</span>
                    </label>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method*
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="creditCard"
                        checked={formData.paymentMethod === 'creditCard'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Credit Card</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cashOnDelivery"
                        checked={formData.paymentMethod === 'cashOnDelivery'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Cash on Delivery</span>
                    </label>
                  </div>
                </div>

                {/* Credit Card Details */}
                {formData.paymentMethod === 'creditCard' && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number*
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className={`input-field w-full ${formErrors.cardNumber ? 'border-red-500' : ''}`}
                      />
                      {formErrors.cardNumber && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.cardNumber}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name*
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`input-field w-full ${formErrors.cardName ? 'border-red-500' : ''}`}
                      />
                      {formErrors.cardName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.cardName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date*
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className={`input-field w-full ${formErrors.expiryDate ? 'border-red-500' : ''}`}
                        />
                        {formErrors.expiryDate && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.expiryDate}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV*
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className={`input-field w-full ${formErrors.cvv ? 'border-red-500' : ''}`}
                        />
                        {formErrors.cvv && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                {/* Cart Items Summary */}
                <div className="max-h-64 overflow-y-auto mb-6">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex py-2 border-b border-gray-200 last:border-b-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="flow-root">
                  <div className="-my-4 divide-y divide-gray-200">
                    <div className="py-4 flex justify-between">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="font-medium text-gray-900">${summary.subtotal.toFixed(2)}</p>
                    </div>
                    <div className="py-4 flex justify-between">
                      <p className="text-gray-600">Shipping</p>
                      <p className="font-medium text-gray-900">
                        {summary.shipping === 0 ? 'Free' : `$${summary.shipping.toFixed(2)}`}
                      </p>
                    </div>
                    <div className="py-4 flex justify-between">
                      <p className="text-gray-600">Tax</p>
                      <p className="font-medium text-gray-900">${summary.tax.toFixed(2)}</p>
                    </div>

                    {formData.deliveryOption === 'sameDay' && (
                      <div className="py-4 flex justify-between">
                        <p className="text-gray-600">Same Day Delivery</p>
                        <p className="font-medium text-gray-900">${summary.sameDayDelivery.toFixed(2)}</p>
                      </div>
                    )}

                    <div className="py-4 flex justify-between">
                      <p className="text-lg font-medium text-gray-900">Total</p>
                      <p className="text-lg font-bold text-gray-900">${summary.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                
                {/* Place Order Button */}
                <button
                  type="submit"
                  className="mt-6 w-full btn-primary py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
                
                <p className="mt-4 text-xs text-gray-500 text-center">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Your Order!</h2>
              <p className="text-gray-600 mb-4">
                Your order has been placed successfully. Order number: {orderNumber}
              </p>
              <p className="text-gray-600 mb-6">
                We'll send a confirmation email to {formData.email} with your order details.
              </p>
              <button
                onClick={handleCloseConfirmation}
                className="btn-primary w-full"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout; 