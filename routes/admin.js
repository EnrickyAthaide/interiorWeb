const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const multer = require('multer');
const path = require('path');

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

// Admin dashboard projects listing
router.get('/dashboard/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.render('admin-projects', { 
      title: "Projects | Admin Dashboard",
      page: "projects",
      projects,
      user: req.user,
      success: req.flash('success'),
      error: req.flash('error')
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    req.flash('error', 'Failed to load projects');
    res.status(500).render('error', { 
      message: 'Error loading projects',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Project upload page
router.get('/dashboard/projects/upload', (req, res) => {
  res.render('admin-project-upload', { 
    title: "Upload Project | Admin Dashboard",
    page: "projects",
    user: req.user,
    success: req.flash('success'),
    error: req.flash('error')
  });
});

// Handle project upload
router.post('/dashboard/projects/upload', upload.array('projectImages', 50), async (req, res) => {
  try {
    console.log('Received project upload request:', req.body);
    console.log('Received files:', req.files);

    // Validate required fields
    const { projectName, slug, projectSubtitle, projectDescription, projectCategory, projectLocation, projectYear } = req.body;
    
    if (!projectName || !slug || !projectSubtitle || !projectDescription || !projectCategory || !projectLocation || !projectYear) {
      req.flash('error', 'All fields are required');
      return res.redirect('/admin/dashboard/projects/upload');
    }

    // Validate minimum number of images
    if (!req.files || req.files.length < 10) {
      req.flash('error', 'Please upload at least 10 images for the project');
      return res.redirect('/admin/dashboard/projects/upload');
    }

    // Check if slug already exists
    const existingProject = await Project.findOne({ slug });
    if (existingProject) {
      req.flash('error', 'A project with this URL slug already exists');
      return res.redirect('/admin/dashboard/projects/upload');
    }

    // Create image paths array
    const projectImages = req.files.map(file => `/images/projects/${file.filename}`);

    // Find a random project to be the next project
    const randomProject = await Project.aggregate([
      { $sample: { size: 1 } }
    ]);

    // Create new project with next project data
    const project = new Project({
      slug,
      projectName,
      projectSubtitle,
      projectDescription,
      projectCategory,
      projectLocation,
      projectYear: parseInt(projectYear),
      projectImages,
      features: req.body.features ? req.body.features.split(',').map(f => f.trim()) : [],
      nextProject: randomProject.length > 0 ? {
        name: randomProject[0].projectName,
        description: randomProject[0].projectSubtitle,
        link: `/projects/${randomProject[0].slug}`
      } : null
    });

    // Save the project
    const savedProject = await project.save();
    console.log('Project saved successfully:', savedProject);

    // Update the previous project's nextProject to point to this new project
    const previousProject = await Project.findOne({}, {}, { sort: { 'createdAt': -1 }, skip: 1 });
    if (previousProject) {
      previousProject.nextProject = {
        name: project.projectName,
        description: project.projectSubtitle,
        link: `/projects/${project.slug}`
      };
      await previousProject.save();
    }

    req.flash('success', 'Project uploaded successfully');
    res.redirect('/admin/dashboard/projects');

  } catch (error) {
    console.error('Error uploading project:', error);
    req.flash('error', 'Failed to upload project: ' + error.message);
    res.redirect('/admin/dashboard/projects/upload');
  }
});

// Delete project
router.delete('/dashboard/projects/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        error: 'Project not found' 
      });
    }

    await Project.findOneAndDelete({ slug: req.params.slug });
    req.flash('success', 'Project deleted successfully');
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete project' 
    });
  }
});

module.exports = router; 