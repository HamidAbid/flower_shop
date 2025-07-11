import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Check if .env file exists, create if it doesn't
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env file...');
  const envContent = 'MONGODB_URI=mongodb+srv://floral-db:36y8M4MBYFVUwNm1@cluster0.vx1oi3x.mongodb.net/\nJWT_SECRET=mySuperSecretKey123!\nPORT=5000\n';
  fs.writeFileSync(envPath, envContent);
  console.log('.env file created');
  
  // Re-load environment variables
  dotenv.config();
}

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://floral-db:36y8M4MBYFVUwNm1@cluster0.vx1oi3x.mongodb.net/';
console.log(`Attempting to connect to MongoDB at: ${MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}`);

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    
    // Create a test user
    return createTestUser();
  })
  .then(() => {
    console.log('Test completed successfully');
    process.exit(0);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Function to create a test user
async function createTestUser() {
  try {
    // Import the User model
    const { default: User } = await import('./models/User.js');
    
    // Check if test user exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    
    if (existingUser) {
      console.log('Test user already exists:', existingUser._id);
      return existingUser;
    }
    
    // Create test user
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });
    
    await testUser.save();
    console.log('Test user created successfully:', testUser._id);
    return testUser;
  } catch (error) {
    console.error('Error creating test user:', error);
    throw error;
  }
} 