// Debug script to check database contents
const connectDB = require('./config/database');
const Project = require('./models/project');
const Blog = require('./models/blogs');
const Admin = require('./models/admin');

async function debugDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    await connectDB();
    
    console.log('\n📊 Checking database contents...\n');
    
    // Check Projects
    console.log('🏗️  PROJECTS:');
    const projects = await Project.find().lean();
    console.log(`Total projects: ${projects.length}`);
    if (projects.length > 0) {
      projects.forEach((project, index) => {
        console.log(`${index + 1}. ${project.projectName} (slug: ${project.slug})`);
      });
    } else {
      console.log('No projects found');
    }
    
    // Check Blogs
    console.log('\n📝 BLOGS:');
    const blogs = await Blog.find().lean();
    console.log(`Total blogs: ${blogs.length}`);
    if (blogs.length > 0) {
      blogs.forEach((blog, index) => {
        console.log(`${index + 1}. ${blog.title} (slug: ${blog.slug})`);
      });
    } else {
      console.log('No blogs found');
    }
    
    // Check Admins
    console.log('\n👤 ADMINS:');
    const admins = await Admin.find().lean();
    console.log(`Total admins: ${admins.length}`);
    if (admins.length > 0) {
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. ${admin.username} (${admin.email})`);
      });
    } else {
      console.log('No admins found');
    }
    
    console.log('\n✅ Database check completed!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error checking database:', error);
    process.exit(1);
  }
}

debugDatabase(); 