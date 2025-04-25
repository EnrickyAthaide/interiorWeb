// seedProjects.js
const mongoose = require('mongoose');
const blogs  = require('../models/blogs.js');
const data     = require('./seedBlogs.json');

/* 1. connect, 2. clear old docs (optional), 3. insertMany, 4. quit */
(async ()=>{
  await mongoose.connect('mongodb://localhost:27017/portfolio');
  await blogs.deleteMany();      // remove everything so seed is idempotent
  await blogs.insertMany(data);  // bulk insert
  console.log('✨  Projects collection seeded');
  process.exit();
})();
