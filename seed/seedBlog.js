// seedBlog.js
const mongoose = require('mongoose');
const Blog = require('../models/blogs.js');
const data = require('./seedBlogs.json');
require('dotenv').config(); // Load environment variables

/* 1. connect, 2. clear old docs (optional), 3. insertMany, 4. quit */
(async ()=>{
  try {
    await mongoose.connect(process.env.myMongo);
    console.log('✅ Connected to MongoDB Atlas');
    
    await Blog.deleteMany();
    console.log('🗑️ Cleared existing blog data');
    
    await Blog.insertMany(data);
    console.log('✨ Blog collection reseeded successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
})(); 