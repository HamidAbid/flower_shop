import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import Button from "../components/ui/Button";
import CartSummary from "../components/cart/CartSummary";

const Cart = () => {
  const {
    cartItems,
    setCartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart,
  } = useCart();

  useEffect(() => {
    fetchCart().catch(error => console.log(error));
  }, []);
  

  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  // Sync quantities when cartItems change
  useEffect(() => {
    const initialQuantities = cartItems.reduce((acc, item) => {
      acc[item.product._id] = item.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cartItems]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * (quantities[item.product._id] || 1);
    }, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 100 ? 0 : 10.99;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.07;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities({ ...quantities, [productId]: newQuantity });
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    const newQuantities = { ...quantities };
    delete newQuantities[productId];
    setQuantities(newQuantities);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product._id !== productId)
    );
  };

  const handleClearCart = () => {
    clearCart();
    setQuantities({});
  };

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        cartItems: cartItems.map((item) => ({
          ...item.product,
          quantity: quantities[item.product._id] || 1,
        })),
        subtotal: calculateSubtotal(),
        shipping: calculateShipping(),
        tax: calculateTax(),
        total: calculateTotal(),
      },
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                   {cartItems.map((item) => (
                    <li key={item.product._id} className="p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:flex-shrink-0 mb-4 sm:mb-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full sm:w-32 h-32 object-cover rounded-md"
                          />
                        </div>
                        <div className="sm:ml-6 sm:flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-lg font-medium text-gray-900">
                                {item.product.name}
                              </h3>
                              <p className="text-lg font-medium text-gray-900">
                                $
                                {(
                                  item.product.price *
                                  (quantities[item.product._id] || 1)
                                ).toFixed(2)}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              Unit Price: ${item.product.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center border border-gray-300 rounded">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.product._id,
                                    (quantities[item.product._id] || 1) - 1
                                  )
                                }
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-gray-600">
                                {quantities[item.product._id] || 1}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.product._id,
                                    (quantities[item.product._id] || 1) + 1
                                  )
                                }
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.product._id)}
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

            <div className="md:col-span-1">
              <CartSummary
                subtotal={calculateSubtotal()}
                shipping={calculateShipping()}
                tax={calculateTax()}
                total={calculateTotal()}
                onCheckout={handleCheckout}
                disabled={cartItems.length === 0}
              />
              <div className="mt-4 text-center">
                <Link
                  to="/"
                  className="text-primary hover:text-pink-600 text-sm font-medium"
                >
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
