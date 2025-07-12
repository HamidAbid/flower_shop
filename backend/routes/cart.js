import express from 'express';
import { addToCart, getCartItems, removeFromCart } from '../controllers/cartController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/add',auth, addToCart); // POST /api/cart/add
router.get('/getItems',auth, getCartItems); // GET /api/cart/:userId
router.delete('/remove/:productId', auth, removeFromCart);
export default router;
