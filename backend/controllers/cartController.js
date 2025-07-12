import Cart from '../models/cart.js';
import mongoose from 'mongoose';


export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        user: userId,
        products: [{ product: productId, quantity }], // ✅ 'products', not 'items'
      });
    } else {
      // Check if product already in cart
      const index = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (index > -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Get all items in user's cart
export const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const cart = await Cart.findOne({ user: userId })
      .populate("products.product") // ✅ populate product details
      .lean();

    if (!cart) {
      return res.json([]); // Return empty array if no cart
    }

    return res.json(cart.products); // ✅ Send only the product array
  } catch (error) {
    console.error("Error finding cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const removeFromCart = async (req, res) => {
  const userId = req.user.id; // Assuming you have a middleware setting req.user
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // 🛠 Filter the products array properly
    cart.products = cart.products.filter(
      (item) => !item.product.equals(productId) // Use .equals to compare ObjectId
    );

    await cart.save();

    res.status(200).json({ message: 'Item removed from cart', cart })}
    catch (error) {
    console.error('Remove from cart failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
