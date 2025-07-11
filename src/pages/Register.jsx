import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { authAPI } from '../utils/api';

const Register = () => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    // Login form
    loginEmail: '',
    loginPassword: '',
    rememberMe: false,
    
    // Signup form
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { setUser, authError, setAuthError } = useContext(AuthContext);
  
  // Clear error messages when switching tabs
  useEffect(() => {
    setErrors({});
    setGeneralError('');
    setSuccessMessage('');
  }, [activeTab]);

  // Clear auth error when component mounts
  useEffect(() => {
    if (authError) {
      setAuthError(null);
    }
  }, [authError, setAuthError]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Clear general error when any field is changed
    if (generalError) {
      setGeneralError('');
    }
  };
  
  const validateLogin = () => {
    const newErrors = {};
    
    if (!formData.loginEmail.trim()) {
      newErrors.loginEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.loginEmail)) {
      newErrors.loginEmail = 'Email is invalid';
    }
    
    if (!formData.loginPassword) {
      newErrors.loginPassword = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateSignup = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateLogin()) return;
    
    setIsLoading(true);
    setGeneralError('');
    
    try {
      console.log('Attempting login with:', {
        email: formData.loginEmail,
        password: formData.loginPassword ? '********' : 'empty'
      });
      
      const { data } = await authAPI.login({
        email: formData.loginEmail,
        password: formData.loginPassword
      });
      
      console.log('Login successful, received data:', data);
      
      if (!data.token) {
        throw new Error('No token received from server');
      }
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      console.log('Token saved to localStorage');
      
      // Update user context
      setUser({
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role
      });
      
      setSuccessMessage('Login successful! Redirecting...');
      
      // Short delay before redirect for better UX
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials and try again.';
      setGeneralError(errorMessage);
      
      setErrors({
        ...errors,
        loginEmail: '',
        loginPassword: ''
      });
    }
  };
  
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateSignup()) return;
    
    setIsLoading(true);
    setGeneralError('');
    
    try {
      console.log('Attempting registration with:', {
        name: formData.fullName,
        email: formData.email,
        password: formData.password ? '********' : 'empty',
        phone: formData.phone
      });
      
      const { data } = await authAPI.register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      });
      
      console.log('Registration successful, received data:', data);
      
      if (!data.token) {
        throw new Error('No token received from server');
      }
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      console.log('Token saved to localStorage');
      
      // Update user context
      setUser({
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role
      });
      
      setSuccessMessage('Account created successfully! Redirecting...');
      
      // Short delay before redirect for better UX
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setGeneralError(errorMessage);
      
      // Clear specific field errors
      setErrors({
        ...errors,
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl">
        <div className="md:flex">
          <div className="md:shrink-0 hidden md:block">
            <img
              className="h-full w-96 object-cover"
              src="http://localhost:3000/img/sign.AVIF"
              alt="Flowers"
            />
          </div>
          <div className="p-8 w-full">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`py-2 px-4 font-medium text-sm ${
                  activeTab === 'login'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('login')}
              >
                Sign In
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${
                  activeTab === 'signup'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('signup')}
              >
                Create Account
              </button>
            </div>
            
            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded border border-green-200">
                {successMessage}
              </div>
            )}
            
            {/* General Error Message */}
            {generalError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
                {generalError}
              </div>
            )}

            {/* Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="loginEmail"
                    name="loginEmail"
                    type="email"
                    value={formData.loginEmail}
                    onChange={handleInputChange}
                    className={`mt-1 input-field w-full ${
                      errors.loginEmail ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.loginEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.loginEmail}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="loginPassword"
                    name="loginPassword"
                    type="password"
                    value={formData.loginPassword}
                    onChange={handleInputChange}
                    className={`mt-1 input-field w-full ${
                      errors.loginPassword ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.loginPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.loginPassword}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:text-primary-dark">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </div>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Signup Form */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`mt-1 input-field w-full ${
                      errors.fullName ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`mt-1 input-field w-full ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`mt-1 input-field w-full ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`mt-1 input-field w-full ${
                      errors.confirmPassword ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`mt-1 input-field w-full ${
                      errors.phone ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className={`h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary ${
                      errors.agreeTerms ? 'border-red-500' : ''
                    }`}
                  />
                  <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:text-pink-500">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:text-pink-500">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary flex justify-center items-center"
                  >
                    {isLoading ? (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                    ) : null}
                    {isLoading ? 'Creating account...' : 'Create account'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 