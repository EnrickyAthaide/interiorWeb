const express = require("express")
const app = express()
const path = require("path")
const cookieParser = require("cookie-parser")
require('dotenv').config()

app.set("view engine" ,"ejs")

app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
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

// Blogs page route
app.get("/blogs", (req, res) => {
  res.render("blogs", {
    title: "Design Journal | Interior Design & Architecture Studio"
  });
});

// Blog list route
app.get('/blogs', (req, res) => {
    res.render('blogs', { title: 'Design Journal | Interior Design & Architecture Studio' });
});

// Individual blog routes
app.get('/blogs/:slug', (req, res) => {
    const slug = req.params.slug;
    
    // Sample blog data store (in a real app, this would come from a database)
    const blogs = {
        'timeless-spaces': {
            title: 'The Art of Creating Timeless Spaces',
            subtitle: 'Explore the delicate balance between contemporary design and enduring elegance',
            category: 'INTERIOR DESIGN',
            date: 'MARCH 15, 2024',
            heroImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000',
            contentImages: [
                'https://images.unsplash.com/photo-1616593969747-4797dc75033e?q=80&w=1000',
                'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1000',
                'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=1000',
                'https://images.unsplash.com/photo-1616593969747-4797dc75033e?q=80&w=1000',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000',
                'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000',
                'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000',
                'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000'
            ],
            author: {
                name: 'Sarah Thompson',
                role: 'Senior Design Consultant',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200'
            },
            relatedPosts: [
                { title: 'Timeless Elegance: Designing the Perfect Luxury Kitchen', link: '/blogs/luxury-kitchen-design' },
                { title: 'Architectural Harmony: Balancing Form and Function', link: '/blogs/architectural-harmony' },
                { title: 'Sustainable Luxury: Eco-Conscious Design Without Compromise', link: '/blogs/sustainable-luxury' }
            ],
            nextArticle: {
                title: 'Timeless Elegance: Designing the Perfect Luxury Kitchen',
                link: '/blogs/luxury-kitchen-design',
                image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000'
            }
        },
        'luxury-kitchen-design': {
            title: 'Timeless Elegance: Designing the Perfect Luxury Kitchen',
            subtitle: 'From bespoke cabinetry to statement lighting, discover the essential elements of sophisticated kitchen spaces',
            category: 'KITCHEN DESIGN',
            date: 'NOVEMBER 28, 2023',
            heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000',
            contentImages: [
                'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=1000',
                'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=1000',
                'https://images.unsplash.com/photo-1594761051656-71868b4aebd9?q=80&w=1000',
                'https://images.unsplash.com/photo-1600607687644-c7171b16498f?q=80&w=1000',
                'https://images.unsplash.com/photo-1556910103-1c02745aec78?q=80&w=1000',
                'https://images.unsplash.com/photo-1600585154526-990dced4db3d?q=80&w=1000',
                'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000',
                'https://images.unsplash.com/photo-1616593969747-4797dc75033e?q=80&w=1000',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000',
                'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000'
            ],
            author: {
                name: 'Michael Chen',
                role: 'Kitchen Design Specialist',
                image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=200'
            },
            relatedPosts: [
                { title: 'The Art of Creating Timeless Spaces', link: '/blogs/timeless-spaces' },
                { title: 'Architectural Harmony: Balancing Form and Function', link: '/blogs/architectural-harmony' },
                { title: 'Sustainable Luxury: Eco-Conscious Design Without Compromise', link: '/blogs/sustainable-luxury' }
            ],
            nextArticle: {
                title: 'Architectural Harmony: Balancing Form and Function',
                link: '/blogs/architectural-harmony',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000'
            }
        },
        'architectural-harmony': {
            title: 'Architectural Harmony: Balancing Form and Function',
            subtitle: 'The delicate relationship between aesthetic beauty and practical livability in modern residential architecture',
            category: 'ARCHITECTURE',
            date: 'OCTOBER 17, 2023',
            heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000',
            contentImages: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000',
                'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000',
                'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1000',
                'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1000',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000',
                'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000',
                'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000', 
                'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1000'
            ],
            author: {
                name: 'Olivia Foster',
                role: 'Architectural Designer',
                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200'
            },
            relatedPosts: [
                { title: 'The Art of Creating Timeless Spaces', link: '/blogs/timeless-spaces' },
                { title: 'Timeless Elegance: Designing the Perfect Luxury Kitchen', link: '/blogs/luxury-kitchen-design' },
                { title: 'Sustainable Luxury: Eco-Conscious Design Without Compromise', link: '/blogs/sustainable-luxury' }
            ],
            nextArticle: {
                title: 'Sustainable Luxury: Eco-Conscious Design Without Compromise',
                link: '/blogs/sustainable-luxury',
                image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1000'
            }
        },
        'sustainable-luxury': {
            title: 'Sustainable Luxury: Eco-Conscious Design Without Compromise',
            subtitle: 'How today\'s most innovative designers are creating environmentally responsible spaces that maintain the highest standards of luxury',
            category: 'SUSTAINABLE DESIGN',
            date: 'SEPTEMBER 5, 2023',
            heroImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1000',
            contentImages: [
                'https://images.unsplash.com/photo-1600607686527-ddc628cbd2bf?q=80&w=1000',
                'https://images.unsplash.com/photo-1600607687165-116c3a056652?q=80&w=1000',
                'https://images.unsplash.com/photo-1600566752584-e1e5a1fd5a08?q=80&w=1000',
                'https://images.unsplash.com/photo-1600585153490-76fb20a32601?q=80&w=1000',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000',
                'https://images.unsplash.com/photo-1594760135052-125e893aa064?q=80&w=1000',
                'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000',
                'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000'
            ],
            author: {
                name: 'James Wilson',
                role: 'Sustainability Consultant',
                image: 'https://images.unsplash.com/photo-1564564295391-7f24f26f568b?q=80&w=200'
            },
            relatedPosts: [
                { title: 'The Art of Creating Timeless Spaces', link: '/blogs/timeless-spaces' },
                { title: 'Timeless Elegance: Designing the Perfect Luxury Kitchen', link: '/blogs/luxury-kitchen-design' },
                { title: 'Architectural Harmony: Balancing Form and Function', link: '/blogs/architectural-harmony' }
            ],
            nextArticle: {
                title: 'The Art of Creating Timeless Spaces',
                link: '/blogs/timeless-spaces',
                image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000'
            }
        }
    };

    // Get the blog data for the requested slug
    const blog = blogs[slug];
    
    // If blog doesn't exist, redirect to blogs page
    if (!blog) {
        return res.redirect('/blogs');
    }
    
    // Render the blog detail page with the blog data
    res.render('blog-detail', { 
        title: `${blog.title} | Interior Design & Architecture Studio`,
        blog: blog
    });
});

// Dynamic project routes
app.get("/projects/:slug", (req, res) => {
  const slug = req.params.slug;
  
  // Sample project data store (in a real app, this would come from a database)
  const projects = {
    'terry': {
      projectName: "Terry",
      projectTitle: "TERRY",
      projectSubtitle: "A Classic and Sophisticated Urban Retreat",
      projectDescription: "This masterfully renovated urban residence exemplifies the perfect balance of classic elements and contemporary design. Completed in early 2023, the space features thoughtful attention to detail and luxurious finishes throughout.",
      projectImages: [
        "/images/projects/complex.jpg",
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1000",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000",
        "/images/projects/hotel.jpg",
        "/images/projects/landscape.jpg",
        "/images/projects/office.jpg"
      ],
      nextProject: {
        name: "Clarendon House",
        description: "A unique and impressive family home",
        link: "/projects/clarendon-house"
      }
    },
    'clarendon-house': {
      projectName: "Clarendon House",
      projectTitle: "CLARENDON\nHOUSE",
      projectSubtitle: "A Unique and Impressive Family Home",
      projectDescription: "This distinctive and utterly captivating new-build family home was completed in the late summer of 2022. A stunning compilation of classic, contemporary detailing has formed the bones of our clients forever home.",
      projectImages: [
        "/images/projects/complex.jpg",
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1000",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000",
        "/images/projects/hotel.jpg",
        "/images/projects/landscape.jpg",
        "/images/projects/office.jpg"
      ],
      nextProject: {
        name: "Lane",
        description: "A minimalist urban design",
        link: "/projects/lane"
      }
    },
    'lane': {
      projectName: "Lane",
      projectTitle: "LANE",
      projectSubtitle: "Minimalist Urban Design",
      projectDescription: "A study in minimalism and urban functionality, the Lane project represents our commitment to elegant simplicity. Completed in spring 2023, this space demonstrates how thoughtful restraint can create powerful design impact.",
      projectImages: [
        "/images/projects/landscape.jpg",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000",
        "/images/projects/office.jpg",
        "/images/projects/villa.jpg",
        "/images/projects/hotel.jpg"
      ],
      nextProject: {
        name: "Project Four",
        description: "A luxurious countryside retreat",
        link: "/projects/project-four"
      }
    },
    'project-four': {
      projectName: "Project Four",
      projectTitle: "PROJECT\nFOUR",
      projectSubtitle: "Luxurious Countryside Retreat",
      projectDescription: "This expansive countryside estate blends natural materials with contemporary design sensibilities. The project, completed in autumn 2022, creates harmony between indoor luxury and the surrounding landscape.",
      projectImages: [
        "/images/projects/office.jpg",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000",
        "https://images.unsplash.com/photo-1616593969747-4797dc75033e?q=80&w=1000",
        "/images/projects/landscape.jpg",
        "/images/projects/complex.jpg",
        "/images/projects/villa.jpg"
      ],
      nextProject: {
        name: "Project Five",
        description: "Coastal contemporary living",
        link: "/projects/project-five"
      }
    },
    'project-five': {
      projectName: "Project Five",
      projectTitle: "PROJECT\nFIVE",
      projectSubtitle: "Coastal Contemporary Living",
      projectDescription: "Perched along the coastline, this contemporary residence celebrates its unique location with expansive views and materials that reflect the surrounding environment. Completed in summer 2023, this home exemplifies our approach to context-sensitive design.",
      projectImages: [
        "/images/projects/villa.jpg",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
        "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1000",
        "/images/projects/hotel.jpg",
        "/images/projects/office.jpg",
        "/images/projects/complex.jpg"
      ],
      nextProject: {
        name: "Project Six",
        description: "Industrial loft conversion",
        link: "/projects/project-six"
      }
    },
    'project-six': {
      projectName: "Project Six",
      projectTitle: "PROJECT\nSIX",
      projectSubtitle: "Industrial Loft Conversion",
      projectDescription: "This transformation of a historical industrial space into a residential loft preserves original architectural elements while introducing sophisticated modern interventions. The project highlights our commitment to honoring historical context while creating contemporary living environments.",
      projectImages: [
        "/images/projects/hotel.jpg",
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000",
        "/images/projects/villa.jpg",
        "/images/projects/landscape.jpg",
        "/images/projects/complex.jpg"
      ],
      nextProject: {
        name: "Terry",
        description: "A classic and sophisticated urban retreat",
        link: "/projects/terry"
      }
    }
  };

  // Get the project data for the requested slug
  const project = projects[slug];
  
  // If project doesn't exist, redirect to projects page
  if (!project) {
    return res.redirect('/projects');
  }
  
  // Render the project detail page with the project data
  res.render("projects/building", project);
});

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})