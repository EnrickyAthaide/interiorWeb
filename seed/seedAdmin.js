const mongoose = require('mongoose');
const Admin = require('../models/admin');
const adminData = require('./seedAdmin.json');
require('dotenv').config(); // Load environment variables

mongoose.connect(process.env.myMongo)
  .then(() => console.log('MongoDB Atlas connected for admin seeding ✅'))
  .catch(err => console.error('MongoDB error', err));

const seedAdmins = async () => {
  try {
    // Clear existing admins
    await Admin.deleteMany({});
    console.log('Deleted existing admin data');
    
    // Insert new admin data with proper password hashing
    const results = [];
    for (const data of adminData) {
      const admin = new Admin(data);
      await admin.save(); // This triggers the pre-save hook
      results.push(admin);
    }
    
    console.log(`${results.length} admin(s) seeded successfully`);
    console.log('Admin username:', results[0].username);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding admin data:', error);
    mongoose.connection.close();
  }
};

seedAdmins(); 