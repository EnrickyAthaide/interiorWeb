// seedProjects.js
const mongoose = require('mongoose');
const Project  = require('./models/project');
const data     = require('./seedData.json');

/* 1. connect, 2. clear old docs (optional), 3. insertMany, 4. quit */
(async ()=>{
  await mongoose.connect('mongodb://localhost:27017/portfolio', {
    useNewUrlParser:true,
    useUnifiedTopology:true
  });

  await Project.deleteMany();      // remove everything so seed is idempotent
  await Project.insertMany(data);  // bulk insert
  console.log('✨  Projects collection seeded');
  process.exit();
})();
