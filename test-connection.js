// Test MongoDB Atlas connection
const connectDB = require('./config/database');

async function testConnection() {
  try {
    console.log('🔌 Testing MongoDB Atlas connection...');
    await connectDB();
    console.log('✅ Connection test successful!');
    
    // Keep the connection alive for a moment to see the success message
    setTimeout(() => {
      console.log('🔄 Closing test connection...');
      process.exit(0);
    }, 2000);
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    process.exit(1);
  }
}

testConnection(); 