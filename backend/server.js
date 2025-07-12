import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import userRoutes from "./routes/users.js";
import quizRoutes from "./routes/quiz.js";
import serviceRoutes from "./routes/services.js";
import customizationRoutes from "./routes/customization.js";
import eventOrganizerRoutes from "./routes/eventOrganizer.js";
import adminRoutes from "./routes/admin.js";
import blog from "./routes/blogs.js";
import cart from "./routes/cart.js";

dotenv.config();

// Set default environment variables if not defined
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "mySuperSecretKey123!";
  console.log(
    "Warning: Using default JWT_SECRET. Set a secure secret in production."
  );
}

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database connection

const MONGODB_URI = process.env.MONGODB_URI;


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/customization", customizationRoutes);
app.use("/api/organizer", eventOrganizerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", blog);
app.use("/api/cart", cart);

// Test endpoint to verify server is running
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working correctly" });
});

// Error handling middleware
app.use((err, req, res, next) => {

  res.status(500).json({
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development" ? err.message : "Server error",
  });
});

const PORT = process.env.PORT || 5000;

const dbconnection = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
    console.error("Please make sure MongoDB is running and accessible");
  }
};
dbconnection();



  
