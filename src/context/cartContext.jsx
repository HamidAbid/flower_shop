// src/context/cartContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
     const token= localStorage.getItem('token')
      const response = await axios.get('/api/cart/getItems',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }); // ✅ FIXED
      setCartItems(response.data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };
  
  

  const addToCart = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('token'); // or however you're storing the JWT
  if (!token) {
    alert("login first")

    
  }

      const response = await axios.post('/api/cart/add',
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Add to cart success:', response.data);
  
       
    } catch (err) {
      console.error('Failed to add to cart:', err.response?.data || err.message);
    }
  };
  

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
     const res= await axios.delete(`/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(res);
      await fetchCart(); // refresh cart after removal
    } catch (err) {
      console.error('Failed to remove from cart:', err);
    }
  };
  

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart,setCartItems, removeFromCart, fetchCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ This is what you import in Navbar.jsx
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
