const express = require("express")
const app = express()
const path = require("path")
const cookieParser = require("cookie-parser")
require('dotenv').config()
const Project = require('./models/project');
const Blog = require('./models/blogs');
const Admin = require('./models/admin');
const Contact = require('./models/contact');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');

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

// app.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/portfolio')
.then(()=>console.log('MongoDB connected ✅'))
.catch(err=>console.error('MongoDB error', err));

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
    // Fetch all projects from the database
    const projectsData = await Project.find()
      .select('slug projectName projectImages')
      .lean();
    
    // Format the data for the template
    const projects = projectsData.map(project => ({
      name: project.projectName,
      image: project.projectImages[0], // Use first image as thumbnail
      slug: project.slug
    }));
    
    res.render("projects", {
      projects: projects
    });
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.render("projects", {
      projects: []
    });
  }
});

// Dynamic project detail routes
app.get("/projects/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    
    // Find the project in the database using the slug
    const project = await Project.findOne({ slug: slug }).lean();
    
    // If project doesn't exist, redirect to projects page
    if (!project) {
      return res.redirect('/projects');
    }
    
    // Find the next project - we can use the existing nextProject data that's stored in the database
    // If no nextProject is defined, we'll find another project
    let nextProjectData = project.nextProject;
    let nextProjectHeroImage;
    
    if (!nextProjectData) {
      const nextProject = await Project.findOne({ _id: { $ne: project._id } })
        .select('slug projectName projectDescription projectImages')
        .lean();
      
      if (nextProject) {
        nextProjectData = {
          name: nextProject.projectName,
          description: nextProject.projectDescription,
          link: `/projects/${nextProject.slug}`
        };
        
        // Get the hero image (first image) of the next project
        if (nextProject.projectImages && nextProject.projectImages.length > 0) {
          nextProjectHeroImage = nextProject.projectImages[0];
        }
      }
    } else {
      // If we already have nextProject data, find that project to get its hero image
      const nextProjectSlug = nextProjectData.link.split('/').pop();
      const nextProjectDetails = await Project.findOne({ slug: nextProjectSlug })
        .select('projectImages')
        .lean();
        
      if (nextProjectDetails && nextProjectDetails.projectImages && nextProjectDetails.projectImages.length > 0) {
        nextProjectHeroImage = nextProjectDetails.projectImages[0];
      }
    }
    
    // Add the next project hero image to the project data
    project.nextProjectHeroImage = nextProjectHeroImage;
    
    // Pass the project data directly to the template
    // The model structure already matches the template expectations
    res.render("projects/building", project);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.redirect('/projects');
  }
});

// Blogs page route
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().lean();
    res.render("blogs", {
      title: "Design Journal | Interior Design & Architecture Studio",
      blogs: blogs
    });
  } catch(err) {
    console.error(err);
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

// Admin Projects Page - Under Construction
app.get('/admin/dashboard/projects', isAuthenticated, (req, res) => {
  res.render('admin-under-construction', {
    page: 'projects'
  });
});

// Admin Blogs Page - Under Construction
app.get('/admin/dashboard/blogs', isAuthenticated, (req, res) => {
  res.render('admin-under-construction', {
    page: 'blogs'
  });
});

// Admin Settings Page - Under Construction
app.get('/admin/dashboard/settings', isAuthenticated, (req, res) => {
  res.render('admin-under-construction', {
    page: 'settings'
  });
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

// 404 route - this needs to be after all other routes
app.use((req, res, next) => {
  res.status(404).render('404');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})