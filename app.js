const express = require("express")
const app = express()
const path = require("path")
const cookieParser = require("cookie-parser")
require('dotenv').config(); // Loads .env into process.env
const Project = require('./models/project');
const Blog = require('./models/blogs');
const Admin = require('./models/admin');
const Contact = require('./models/contact');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');
const multer = require('multer');
const adminRoutes = require('./routes/admin');
const fs = require('fs');

// Database connection
const connectDB = require('./config/database');

// Connect to MongoDB Atlas
connectDB();

app.set("view engine" ,"ejs")

app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// Session configuration
app.use(session({
  secret: 'interior-design-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));

// Flash messages
app.use(flash());

// Make flash messages available to all templates
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// JWT Secret key - in production this should be in an environment variable
const JWT_SECRET = 'gugugaga';

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/admin');
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect('/admin');
  }
};

// Multer configuration for project image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/projects')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit per file
  }
});

app.get("/" ,(req,res)=>{
    res.render('index', {
        title: "Luxury Interior Design",
        awardTitle: "Award Winning Global Luxury Design Company",
        awardSubtitle: "Crafting unique spaces since 2014",
        projects: [
          { name: "Project One", category: "Residential", year: "2023", image: "/images/home/project-1.jpg" },
          { name: "Project Two", category: "Commercial", year: "2023", image: "/images/home/project-2.jpg" },
          { name: "Project Three", category: "Residential", year: "2022", image: "/images/home/project-2.jpg" },
          { name: "Project Four", category: "Commercial", year: "2021", image: "/images/home/project-3.jpg" }
        ],
        about: {
          image: "/images/home/about.jpg",
          description: "We are a global design company offering end-to-end services in luxury interiors. Our signature style is defined by unmatched aesthetics and an obsessive attention to detail."
        },
        seamless: {
          before: "/images/home/before.jpg",
          after: "/images/home/after.jpg"
        },
        processSteps: [
          { title: "Briefing", description: "Understanding client needs." , icon: "fa-regular fa-comments" },
          { title: "Design", description: "Translating vision into blueprints.", icon: "fa-solid fa-pencil-ruler" },
          { title: "Execution", description: "Building and crafting the space." , icon: "fa-solid fa-cogs"},
          { title: "Handover", description: "Delivering a move-in ready masterpiece." , icon: "fa-regular fa-handshake"},
        ],
        testimonials: [
          { quote: "The team's attention to detail transformed our space into something truly special. Their creativity and dedication are unmatched.", author: "Client One" },
          { quote: "From the first call, we knew we were in good hands. The process was seamless and the final result was breathtaking.", author: "Client Two" },
          { quote: "A personalized design journey that exceeded all expectations. The project not only looks amazing, but feels like home.", author: "Client Three" }
        ],
        contact: { email: "info@example.com" }
      });
      
     
})
app.get("/about" , (req , res)=>{
    res.render("about", {
      title: "About | Ultra Interiors",
      vision: {
        foundingYear: 2015,
        description: "Our vision is to redefine spatial experiences through avant-garde design, sustainable practices, and technological innovation."
      },
      philosophy: [
        {
          title: "Avant-Garde Design",
          description: "We push boundaries by challenging conventional design norms and exploring new aesthetics and spatial concepts.",
          icon: "brush"
        },
        {
          title: "Sustainable Luxury",
          description: "Our commitment to luxury design is matched by our dedication to environmental responsibility and sustainable practices.",
          icon: "leaf"
        },
        {
          title: "Technological Integration",
          description: "We seamlessly incorporate cutting-edge technology to create intelligent spaces that respond to human needs.",
          icon: "microchip"
        }
      ],
      team: [
        {
          name: "Alexandra Chen",
          role: "Founder & Design Director",
          bio: "With a background in architecture and fine arts, Alexandra brings a unique perspective to spatial design, combining structural precision with artistic vision.",
          image: "/images/blogs/authors/author-1.jpg"
        },
        {
          name: "Marcus Reed",
          role: "Technical Director",
          bio: "Marcus combines his expertise in sustainable materials and smart home technology to create environments that are both environmentally conscious and technologically advanced.",
          image: "/images/blogs/authors/author-2.jpg"
        }
      ],
      timeline: [
        { year: "2015", title: "Foundation", description: "Established with a vision to revolutionize interior design through innovative approaches and sustainable practices." },
        { year: "2018", title: "International Expansion", description: "Opened our first international studio, bringing our distinctive design philosophy to global projects." },
        { year: "2020", title: "Digital Transformation", description: "Launched our proprietary virtual reality design platform, allowing clients to experience their spaces before construction." },
        { year: "2023", title: "Design Innovation Award", description: "Recognized for our commitment to sustainable luxury and innovative spatial concepts." },
        { year: "2025", title: "Future Vision", description: "Our ongoing mission to pioneer integrations of biophilic design with cutting-edge smart living technology." }
      ],
      expertise: [
        { number: "01", title: "Residential Sanctuaries", description: "Creating homes that reflect personal narratives while embracing innovative design principles." },
        { number: "02", title: "Commercial Environments", description: "Designing workspaces that inspire productivity while expressing brand identity." },
        { number: "03", title: "Hospitality Experiences", description: "Crafting immersive environments that evoke emotional responses and memorable experiences." },
        { number: "04", title: "Virtual Spatial Design", description: "Pioneering digital environments and metaverse spatial concepts for forward-thinking clients." }
      ]
    })
})
app.get("/projects", async (req, res) => {
  try {
    console.log('🔍 Projects route accessed - fetching projects from database...');
    
    // Fetch all projects from the database
    const projectsData = await Project.find()
      .select('slug projectName projectImages')
      .lean();
    
    console.log(`📊 Found ${projectsData.length} projects in database`);
    
    // Format the data for the template
    const projects = projectsData.map(project => ({
      name: project.projectName,
      image: project.projectImages[0], // Use first image as thumbnail
      slug: project.slug
    }));
    
    console.log('✅ Projects formatted successfully, rendering template...');
    
    res.render("projects", {
      projects: projects
    });
  } catch (err) {
    console.error('❌ Error fetching projects:', err);
    res.render("projects", {
      projects: []
    });
  }
});

// New test projects page route
app.get('/projects-test', async (req, res) => {
    try {
        console.log('Fetching projects...');
        let projects = await Project.find()
            .select('slug projectName projectSubtitle projectCategory projectYear projectImages')
            .sort({ projectYear: -1 })
            .lean();
        
        console.log('Projects found:', projects.length);
        
        // If no projects exist, create a test project
        if (projects.length === 0) {
            console.log('No projects found, creating test project...');
            const testProject = new Project({
                slug: 'test-project',
                projectName: 'Test Project',
                projectSubtitle: 'A beautiful test project',
                projectDescription: 'This is a test project to demonstrate the projects page functionality.',
                projectCategory: 'residential',
                projectLocation: 'New York',
                projectYear: 2024,
                projectImages: [
                    '/images/home/project-1.jpg',
                    '/images/home/project-2.jpg',
                    '/images/home/project-3.jpg',
                    '/images/home/about.jpg',
                    '/images/home/before.jpg',
                    '/images/home/after.jpg',
                    '/images/blogs/authors/author-1.jpg',
                    '/images/blogs/authors/author-2.jpg',
                    '/images/blogs/authors/author-3.jpg',
                    '/images/blogs/authors/author-4.jpg'
                ],
                features: ['Modern Design', 'Sustainable Materials', 'Smart Home']
            });
            
            await testProject.save();
            console.log('Test project created');
            projects = await Project.find()
                .select('slug projectName projectSubtitle projectCategory projectYear projectImages')
                .sort({ projectYear: -1 })
                .lean();
        }
        
        // Log the first project's details including image paths
        if (projects.length > 0) {
            console.log('First project details:');
            console.log('Name:', projects[0].projectName);
            console.log('First image:', projects[0].projectImages[0]);
        }
        
        res.render('projects/all-projects', { 
            projects,
            title: "Our Projects | Luxury Interior Design"
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send('Error loading projects');
    }
});

// Dynamic project detail routes
app.get("/projects/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    console.log(`🔍 Project detail route accessed - looking for slug: ${slug}`);
    
    // Find the project in the database using the slug
    const project = await Project.findOne({ slug: slug }).lean();
    
    if (!project) {
      console.log(`❌ Project with slug "${slug}" not found, redirecting to projects page`);
      return res.redirect('/projects');
    }
    
    console.log(`✅ Project found: ${project.projectName}`);
    
    // Find the next project - we can use the existing nextProject data that's stored in the database
    // If no nextProject is defined, we'll find another project
    let nextProjectData = project.nextProject;
    let nextProjectHeroImage;
    
    if (!nextProjectData) {
      const nextProject = await Project.findOne({ _id: { $ne: project._id } })
        .select('slug projectName projectSubtitle projectImages')
        .lean();
      
      if (nextProject) {
        nextProjectData = {
          name: nextProject.projectName,
          description: nextProject.projectSubtitle,
          link: `/projects/${nextProject.slug}`
        };
        
        // Get the hero image (first image) of the next project
        if (nextProject.projectImages && nextProject.projectImages.length > 0) {
          nextProjectHeroImage = nextProject.projectImages[0];
        }
      } else {
        // If no other projects exist, use the current project's data
        nextProjectData = {
          name: project.projectName,
          description: project.projectSubtitle,
          link: `/projects/${project.slug}`
        };
        nextProjectHeroImage = project.projectImages[0];
      }
    } else {
      // If we already have nextProject data, find that project to get its hero image
      const nextProjectSlug = nextProjectData.link.split('/').pop();
      const nextProjectDetails = await Project.findOne({ slug: nextProjectSlug })
        .select('projectImages')
        .lean();
        
      if (nextProjectDetails && nextProjectDetails.projectImages && nextProjectDetails.projectImages.length > 0) {
        nextProjectHeroImage = nextProjectDetails.projectImages[0];
      } else {
        // Fallback to current project's first image if next project's image is not found
        nextProjectHeroImage = project.projectImages[0];
      }
    }
    
    // Add the next project data to the project object
    project.nextProject = nextProjectData;
    project.nextProjectHeroImage = nextProjectHeroImage;
    
    console.log('✅ Project data prepared, rendering template...');
    
    // Pass the project data to the template
    res.render("projects/building", project);

  } catch (error) {
    console.error('❌ Error loading project:', error);
    res.status(500).render('error', { 
      message: 'Error loading project',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Blogs page route
app.get("/blogs", async (req, res) => {
  try {
    console.log('🔍 Blogs route accessed - fetching blogs from database...');
    
    const blogs = await Blog.find().lean();
    
    console.log(`📊 Found ${blogs.length} blogs in database`);
    
    res.render("blogs", {
      title: "Design Journal | Interior Design & Architecture Studio",
      blogs: blogs
    });
  } catch(err) {
    console.error('❌ Error fetching blogs:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Individual blog routes
app.get('/blogs/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug }).lean();
        
        // If blog doesn't exist, redirect to blogs page
        if (!blog) {
            return res.redirect('/blogs');
        }
        
        // Render the blog detail page with the blog data
        res.render('blog-detail', { 
            title: `${blog.title} | Interior Design & Architecture Studio`,
            blog: blog
        });
    } catch(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Admin Routes
app.get('/admin', (req, res) => {
  res.render('admin-login');
});

// Admin login POST route
app.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username });
    
    // Find admin user
    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log('Admin not found');
      req.flash('error', 'Invalid username or password');
      return res.redirect('/admin');
    }
    
    // Compare password
    const isMatch = await admin.comparePassword(password);
    console.log('Password match result:', isMatch);
    
    if (!isMatch) {
      req.flash('error', 'Invalid username or password');
      return res.redirect('/admin');
    }
    
    // Create JWT token
    const token = jwt.sign(
      { username: admin.username, id: admin._id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Set token as cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3600000 // 1 hour
    });
    
    // Success message
    req.flash('success', 'Successfully logged in!');
    
    // Redirect to dashboard
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    req.flash('error', 'An error occurred during login');
    res.redirect('/admin');
  }
});

// Logout route
app.get('/admin/logout', (req, res) => {
  res.clearCookie('token');
  req.flash('success', 'Successfully logged out');
  res.redirect('/admin');
});

// Protected admin routes
app.get('/admin/dashboard', isAuthenticated, async (req, res) => {
  try {
    // Get summary counts
    const newContactsCount = await Contact.countDocuments({ status: 'new' });
    const totalContactsCount = await Contact.countDocuments();
    const projectsCount = await Project.countDocuments();
    const blogsCount = await Blog.countDocuments();
    
    // Get latest contacts for the dashboard
    const latestContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
    
    res.render('admin-dashboard', {
      page: 'dashboard',
      summary: {
        contacts: {
          new: newContactsCount,
          total: totalContactsCount
        },
        projects: projectsCount,
        blogs: blogsCount
      },
      latestContacts
    });
  } catch(err) {
    console.error('Error loading dashboard:', err);
    req.flash('error', 'Failed to load dashboard data');
    res.render('admin-dashboard', { page: 'dashboard' });
  }
});

app.get('/admin/dashboard/contacts', isAuthenticated, async (req, res) => {
  try {
    // Get query parameters
    const dateFilter = req.query.date || 'week';
    const statusFilter = req.query.status || 'all';
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // Number of items per page
    const skip = (page - 1) * limit;
    
    // Define date filter
    let dateQuery = {};
    const now = new Date();
    
    if (dateFilter === 'today') {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      dateQuery = { createdAt: { $gte: today } };
    } else if (dateFilter === 'week') {
      const lastWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      dateQuery = { createdAt: { $gte: lastWeek } };
    } else if (dateFilter === 'month') {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      dateQuery = { createdAt: { $gte: lastMonth } };
    }
    
    // Define status filter
    let statusQuery = {};
    if (statusFilter !== 'all') {
      statusQuery = { status: statusFilter };
    }
    
    // Combine filters
    const query = { ...dateQuery, ...statusQuery };
    
    // Get total count for pagination
    const totalContacts = await Contact.countDocuments(query);
    const totalPages = Math.ceil(totalContacts / limit);
    
    // Fetch contacts with pagination
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // Count contacts by status
    const counts = {
      new: await Contact.countDocuments({ status: 'new' }),
      pending: await Contact.countDocuments({ status: 'read' }),
      responded: await Contact.countDocuments({ status: 'responded' })
    };
    
    // Generate pagination data
    const pagination = {
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      totalContacts
    };
    
    res.render('admin-dashboard', {
      page: 'contacts',
      contacts: contacts,
      counts: counts,
      pagination: pagination,
      query: {
        date: dateFilter,
        status: statusFilter
      }
    });
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).send('Server Error');
  }
});

// Admin Blogs Page
app.get('/admin/dashboard/blogs', isAuthenticated, (req, res) => {
  res.render('admin-blog-upload', {
    title: "Blogs | Admin Dashboard",
    page: "blogs"
  });
});

// Admin Settings Page - Under Construction
app.get('/admin/dashboard/settings', isAuthenticated, (req, res) => {
  res.render('admin-under-construction', {
    page: 'settings'
  });
});

// Admin Project Upload Route
app.post('/admin/dashboard/projects/upload', isAuthenticated, upload.array('projectImages', 50), async (req, res) => {
  try {
    // Validate required fields
    const { projectName, slug, projectSubtitle, projectDescription, projectCategory, projectLocation, projectYear } = req.body;
    
    if (!projectName || !slug || !projectSubtitle || !projectDescription || !projectCategory || !projectLocation || !projectYear) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate minimum number of images
    if (!req.files || req.files.length < 10) {
      return res.status(400).json({ error: 'Please upload at least 10 images for the project' });
    }

    // Create image paths array
    const projectImages = req.files.map(file => `/images/projects/${file.filename}`);

    // Create new project
    const project = new Project({
      slug,
      projectName,
      projectSubtitle,
      projectDescription,
      projectCategory,
      projectLocation,
      projectYear,
      projectImages
    });

    await project.save();

    res.status(201).json({ 
      success: true, 
      message: 'Project uploaded successfully',
      project: project
    });

  } catch (error) {
    console.error('Error uploading project:', error);
    res.status(500).json({ 
      error: 'Failed to upload project',
      details: error.message 
    });
  }
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'public', 'uploads', 'blogs');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Update multer storage configuration for blog uploads
const blogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const blogUpload = multer({ 
  storage: blogStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit per file
  }
});

// Blog upload route
app.post('/admin/dashboard/blogs/upload', isAuthenticated, blogUpload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'contentImages', maxCount: 11 },
  { name: 'authorImage', maxCount: 1 }
]), async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['title', 'slug', 'subtitle', 'category', 'date', 'content', 'authorName', 'authorRole'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        req.flash('error', `Missing required field: ${field}`);
        return res.redirect('/admin/dashboard/blogs/upload');
      }
    }

    // Validate files
    if (!req.files.heroImage || !req.files.contentImages || !req.files.authorImage) {
      req.flash('error', 'Missing required images');
      return res.redirect('/admin/dashboard/blogs/upload');
    }

    if (req.files.contentImages.length !== 11) {
      req.flash('error', 'Exactly 11 content images are required');
      return res.redirect('/admin/dashboard/blogs/upload');
    }

    // Process and save images
    const heroImage = req.files.heroImage[0];
    const contentImages = req.files.contentImages;
    const authorImage = req.files.authorImage[0];

    // Create image paths
    const heroImagePath = `/uploads/blogs/${heroImage.filename}`;
    const authorImagePath = `/uploads/blogs/${authorImage.filename}`;
    const contentImagePaths = contentImages.map(img => `/uploads/blogs/${img.filename}`);

    // Get random blog for next article
    const randomBlog = await Blog.aggregate([
      { $sample: { size: 1 } }
    ]);

    // Get 3 random blogs for related posts (excluding the next article blog)
    const relatedBlogs = await Blog.aggregate([
      { $match: { _id: { $ne: randomBlog[0]?._id } } },
      { $sample: { size: 3 } }
    ]);

    // Create new blog post
    const newBlog = new Blog({
      slug: req.body.slug,
      title: req.body.title,
      subtitle: req.body.subtitle,
      category: req.body.category,
      date: req.body.date,
      heroImage: heroImagePath,
      contentImages: contentImagePaths,
      author: {
        name: req.body.authorName,
        role: req.body.authorRole,
        image: authorImagePath
      },
      nextArticle: randomBlog[0] ? {
        title: randomBlog[0].title,
        link: `/blogs/${randomBlog[0].slug}`,
        image: randomBlog[0].heroImage
      } : null,
      relatedPosts: relatedBlogs.map(blog => ({
        title: blog.title,
        link: `/blogs/${blog.slug}`
      }))
    });

    await newBlog.save();

    // Redirect to blogs dashboard with success message
    req.flash('success', 'Blog post created successfully');
    res.redirect('/admin/dashboard/blogs');

  } catch (error) {
    console.error('Error creating blog post:', error);
    req.flash('error', 'Error creating blog post: ' + error.message);
    res.redirect('/admin/dashboard/blogs/upload');
  }
});

// Contact page route
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact | Luxury Interior Design",
    contactInfo: {
      email: "info@luxuryinteriors.com",
      phone: "+1 (555) 123-4567",
      address: "123 Design Avenue, New York, NY 10001"
    }
  });
});

// Contact form submission route
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    
    // Create new contact instance
    const newContact = new Contact({
      name,
      email,
      phone,
      service,
      message
    });
    
    // Save to database
    await newContact.save();
    
    // Return success response
    res.json({ success: true, message: "Your message has been received. We'll get back to you soon!" });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ success: false, message: "There was an error submitting your message. Please try again." });
  }
});

// Update contact status
app.post('/admin/contacts/:id/status', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['new', 'read', 'responded'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    
    await Contact.findByIdAndUpdate(id, { status });
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating contact status:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete contact
app.delete('/admin/contacts/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get specific contact for modal
app.get('/admin/contacts/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id).lean();
    
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (err) {
    console.error('Error fetching contact:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get updated dashboard counts
app.get('/admin/dashboard/counts', isAuthenticated, async (req, res) => {
  try {
    const newCount = await Contact.countDocuments({ status: 'new' });
    const respondedCount = await Contact.countDocuments({ status: 'responded' });
    const readCount = await Contact.countDocuments({ status: 'read' });
    
    res.json({
      new: newCount,
      pending: readCount,
      responded: respondedCount
    });
  } catch (err) {
    console.error('Error fetching counts:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin routes
app.use('/admin', adminRoutes);

// 404 route - this needs to be after all other routes
app.use((req, res, next) => {
  res.status(404).render('404');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Local: http://localhost:${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});