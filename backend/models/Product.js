// models/Product.js
import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  images: [String],
  description: String,
  fullDescription: String,
  price: Number,
  reviews: [ratingSchema], // ✅ Renamed from "ratings" to "reviews"
});

const Product = mongoose.model("Product", productSchema);
export default Product;
