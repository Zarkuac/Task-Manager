import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/db.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const createTestUser = async () => {
  try {
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    
    if (existingUser) {
      console.log('Test user already exists with ID:', existingUser._id);
      console.log('Use this ID in your mockAuth.js file');
      process.exit(0);
    }
    
    // Create test user
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('Test user created with ID:', user._id);
    console.log('Update your mockAuth.js file with this ID');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser();