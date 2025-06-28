// seedProjects.js
const mongoose = require('mongoose');
const blogs  = require('../models/blogs.js');
const data     = require('./seedBlogs.json');
require('dotenv').config(); // Load environment variables

/* 1. connect, 2. clear old docs (optional), 3. insertMany, 4. quit */
(async ()=>{
  try {
    await mongoose.connect(process.env.myMongo);
    console.log('✅ Connected to MongoDB Atlas');
    await blogs.deleteMany();      // remove everything so seed is idempotent
    await blogs.insertMany(data);  // bulk insert
    console.log('✨  Projects collection seeded');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
})();
