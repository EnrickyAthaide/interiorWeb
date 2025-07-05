const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Atlas connection configuration
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.myMongo, {
      // MongoDB Atlas connection options
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Additional options for better performance and reliability
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    console.log(`✅ MongoDB Atlas connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('🔄 Continuing without database connection for demo purposes...');
    // process.exit(1); // Commented out to allow server to run without DB
  }
};

module.exports = connectDB; 