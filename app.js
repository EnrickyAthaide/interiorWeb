const express = require("express")
const app = express()
const path = require("path")
const cookieParser = require("cookie-parser")
require('dotenv').config()
const Project = require('./models/project');
const Blog = require('./models/blogs');

app.set("view engine" ,"ejs")

app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// app.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/portfolio')
.then(()=>console.log('MongoDB connected ✅'))
.catch(err=>console.error('MongoDB error', err));


app.get("/" ,(req,res)=>{
    res.render('index', {
        title: "Luxury Interior Design",
        awardTitle: "Award Winning Global Luxury Design Company",
        awardSubtitle: "Crafting unique spaces since 2014",
        projects: [
          { name: "Project One", category: "Residential", year: "2023", image: "https://www.essajeesatelier.com/wp-content/uploads/2023/05/Simple-Splendour-grid-home.jpg" },
          { name: "Project Two", category: "Commercial", year: "2023", image: "https://www.essajeesatelier.com/wp-content/uploads/2023/07/A-Timeless-Legacy-home.jpg" },
          { name: "Project Three", category: "Residential", year: "2022", image: "https://www.essajeesatelier.com/wp-content/uploads/2023/07/A-Timeless-Legacy-home.jpg" },
          { name: "Project Four", category: "Commercial", year: "2021", image: "https://www.essajeesatelier.com/wp-content/uploads/2023/05/Luxe-In-The-CIty-grid-home.jpg" }
        ],
        about: {
          image: "https://www.essajeesatelier.com/wp-content/uploads/2023/07/Sarah-Sham.jpg",
          description: "We are a global design company offering end-to-end services in luxury interiors. Our signature style is defined by unmatched aesthetics and an obsessive attention to detail."
        },
        seamless: {
          before: "https://www.essajeesatelier.com/wp-content/uploads/2023/07/Before-.jpg",
          after: "https://www.essajeesatelier.com/wp-content/uploads/2023/07/After-.jpg"
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
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=776&q=80"
        },
        {
          name: "Marcus Reed",
          role: "Technical Director",
          bio: "Marcus combines his expertise in sustainable materials and smart home technology to create environments that are both environmentally conscious and technologically advanced.",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80"
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
app.get("/projects", (req, res) => {
  res.render("projects", {
    projects : [
      { name: "Clarendon House", image: "/images/projects/complex.jpg" },
      { name: "Lancaster", image: "/images/projects/hotel.jpg" },
      { name: "High View", image: "/images/projects/landscape.jpg" },
      { name: "Park Wood", image: "/images/projects/office.jpg" },
      { name: "Portlands", image: "/images/projects/villa.jpg" },
      { name: "Mulberry", image: "/images/projects/hotel.jpg" }
  ],
  });
});

// Dynamic project detail routes
// app.get("/projects/:slug", (req, res) => {
//   const slug = req.params.slug;
  
//   // Project data store (in a real app, this would come from a database)
//   const projects = {
//     'terry': {
//       projectName: "TERRY",
//       projectSubtitle: "A Minimalist Urban Masterpiece",
//       projectDescription: "This stunning urban residence exemplifies minimalist design principles with clean lines and thoughtful spatial arrangements. Completed in spring 2023, the Terry project blends industrial elements with warm, natural materials.",
//       projectImages: [
//         "/images/projects/landscape.jpg",
//         "/images/projects/complex.jpg",
//         "/images/projects/hotel.jpg",
//         "/images/projects/office.jpg",
//         "/images/projects/villa.jpg"
//       ],
//       nextProject: {
//         name: "Clarendon House",
//         description: "A unique and impressive family home",
//         link: "/projects/clarendon-house"
//       }
//     },
//     'clarendon-house': {
//       projectName: "CLARENDON HOUSE",
//       projectSubtitle: "A Unique and Impressive Family Home",
//       projectDescription: "This distinctive and utterly captivating new-build family home was completed in the late summer of 2022. A stunning compilation of classic, contemporary detailing has formed the bones of our clients forever home.",
//       projectImages: [
//         "/images/projects/complex.jpg",
//         "/images/projects/hotel.jpg",
//         "/images/projects/landscape.jpg",
//         "/images/projects/office.jpg",
//         "/images/projects/villa.jpg"
//       ],
//       nextProject: {
//         name: "Lane",
//         description: "Modern architectural marvel",
//         link: "/projects/lane"
//       }
//     },
//     'lane': {
//       projectName: "LANE",
//       projectSubtitle: "Modern Architectural Marvel",
//       projectDescription: "A breathtaking example of contemporary architecture and interior design, the Lane project showcases innovative structural elements and luxurious finishes. Completed in winter 2022, this property redefines modern living.",
//       projectImages: [
//         "/images/projects/villa.jpg",
//         "/images/projects/complex.jpg",
//         "/images/projects/hotel.jpg",
//         "/images/projects/landscape.jpg",
//         "/images/projects/office.jpg"
//       ],
//       nextProject: {
//         name: "Project Four",
//         description: "Luxurious countryside retreat",
//         link: "/projects/project-four"
//       }
//     },
//     'project-four': {
//       projectName: "PROJECT FOUR",
//       projectSubtitle: "Luxurious Countryside Retreat",
//       projectDescription: "Nestled in the scenic countryside, this expansive property combines rustic charm with contemporary luxury. The harmonious integration with its natural surroundings makes this 2021 project a standout in our portfolio.",
//       projectImages: [
//         "/images/projects/office.jpg",
//         "/images/projects/villa.jpg",
//         "/images/projects/complex.jpg",
//         "/images/projects/hotel.jpg",
//         "/images/projects/landscape.jpg"
//       ],
//       nextProject: {
//         name: "Project Five",
//         description: "Coastal contemporary living",
//         link: "/projects/project-five"
//       }
//     },
//     'project-five': {
//       projectName: "PROJECT FIVE",
//       projectSubtitle: "Coastal Contemporary Living",
//       projectDescription: "This waterfront property embraces its coastal setting with panoramic views and materials that echo the natural surroundings. The light-filled spaces and fluid indoor-outdoor transitions make this 2022 project truly special.",
//       projectImages: [
//         "/images/projects/hotel.jpg",
//         "/images/projects/office.jpg",
//         "/images/projects/villa.jpg",
//         "/images/projects/complex.jpg",
//         "/images/projects/landscape.jpg"
//       ],
//       nextProject: {
//         name: "Project Six",
//         description: "Industrial loft conversion",
//         link: "/projects/project-six"
//       }
//     },
//     'project-six': {
//       projectName: "PROJECT SIX",
//       projectSubtitle: "Industrial Loft Conversion",
//       projectDescription: "A remarkable transformation of a historic warehouse into a sophisticated urban dwelling. The preservation of original architectural elements alongside sleek, modern interventions creates a unique living experience in this 2020 project.",
//       projectImages: [
//         "/images/projects/landscape.jpg",
//         "/images/projects/hotel.jpg",
//         "/images/projects/office.jpg",
//         "/images/projects/villa.jpg",
//         "/images/projects/complex.jpg"
//       ],
//       nextProject: {
//         name: "Terry",
//         description: "A minimalist urban masterpiece",
//         link: "/projects/terry"
//       }
//     }
//   };

//   // Get the project data for the requested slug
//   const project = projects[slug];
  
//   // If project doesn't exist, redirect to projects page
//   if (!project) {
//     return res.redirect('/projects');
//   }
  
//   // Render the project detail page with the project data
//   res.render("projects/building", project);
// });
/* Route: /projects/:slug */
app.get('/projects/:slug', async (req,res)=>{
  try {
    const project = await Project.findOne({ slug:req.params.slug }).lean();
    if (!project) return res.redirect('/projects');   // same behaviour

    res.render('projects/building', project);         // template unchanged
  } catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Blogs page route
app.get("/blogs", (req, res) => {
  res.render("blogs", {
    title: "Design Journal | Interior Design & Architecture Studio"
  });
});

// Blog list route
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().lean();
        res.render('blogs', { 
            title: 'Design Journal | Interior Design & Architecture Studio',
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

app.get('/admin/dashboard', (req, res) => {
  // In a real app, you would verify the user is logged in here
  res.render('admin-dashboard');
});

app.get('/admin/dashboard/contacts', (req, res) => {
  // In a real app, you would verify the user is logged in and fetch contacts from database
  res.render('admin-dashboard');
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