import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../App';
import Button from '../components/ui/Button';
import CartSummary from '../components/cart/CartSummary';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {})
  );
  const navigate = useNavigate();

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * (quantities[item.id] || 1));
    }, 0);
  };

  // Calculate shipping cost (simplified for demo)
  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 100 ? 0 : 10.99;
  };

  // Calculate tax (simplified for demo)
  const calculateTax = () => {
    return calculateSubtotal() * 0.07; // 7% tax rate
  };

  // Calculate total
  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  // Handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setQuantities({
      ...quantities,
      [itemId]: newQuantity
    });
  };

  // Remove item from cart
  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    
    // Also update quantities
    const newQuantities = { ...quantities };
    delete newQuantities[itemId];
    setQuantities(newQuantities);
  };

  // Clear the entire cart
  const handleClearCart = () => {
    setCartItems([]);
    setQuantities({});
  };

  // Proceed to checkout
  const handleCheckout = () => {
    navigate('/checkout', { 
      state: { 
        cartItems: cartItems.map(item => ({
          ...item,
          quantity: quantities[item.id] || 1
        })),
        subtotal: calculateSubtotal(), 
        shipping: calculateShipping(),
        tax: calculateTax(),
        total: calculateTotal()
      } 
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:flex-shrink-0 mb-4 sm:mb-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full sm:w-32 h-32 object-cover rounded-md"
                          />
                        </div>
                        <div className="sm:ml-6 sm:flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                              <p className="text-lg font-medium text-gray-900">
                                ${(item.price * (quantities[item.id] || 1)).toFixed(2)}
                              </p>
                            </div>
                            {item.type === 'custom' && (
                              <p className="text-sm text-purple-600 mt-1">Custom Bouquet</p>
                            )}
                            <p className="text-sm text-gray-500 mt-1">Unit Price: ${item.price.toFixed(2)}</p>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center border border-gray-300 rounded">
                              <button
                                onClick={() => handleQuantityChange(item.id, (quantities[item.id] || 1) - 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-gray-600">{quantities[item.id] || 1}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, (quantities[item.id] || 1) + 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <CartSummary
                subtotal={calculateSubtotal()}
                shipping={calculateShipping()}
                tax={calculateTax()}
                total={calculateTotal()}
                onCheckout={handleCheckout}
              />
              <div className="mt-4 text-center">
                <Link to="/" className="text-primary hover:text-pink-600 text-sm font-medium">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 