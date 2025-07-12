import mongoose from "mongoose";
import { Schema ,model} from "mongoose";


const cartSchema = new Schema({
  user: {  // ✅ CHANGED
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [  // ✅ no change
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
