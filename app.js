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
    res.render("about")
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

// Blog detail page route
app.get("/blogs/timeless-spaces", (req, res) => {
  res.render("blog-detail", {
    title: "The Art of Creating Timeless Spaces | Interior Design & Architecture Studio",
    blog: {
      category: "INTERIOR DESIGN",
      date: "MARCH 15, 2024",
      title: "The Art of Creating Timeless Spaces",
      subtitle: "Exploring the delicate balance between contemporary design and enduring elegance",
      author: {
        name: "Sarah Anderson",
        role: "Principal Designer",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000"
      },
      heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000",
      contentImages: [
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000"
      ],
      relatedPosts: [
        {
          title: "The Psychology of Space: How Design Affects Mood",
          link: "/blogs/psychology-of-space"
        },
        {
          title: "Sustainable Luxury: The New Standard",
          link: "/blogs/sustainable-luxury"
        },
        {
          title: "Color Theory in Interior Design",
          link: "/blogs/color-theory"
        }
      ],
      nextArticle: {
        title: "Sustainable Luxury: The New Standard",
        link: "/blogs/sustainable-luxury",
        image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1000"
      }
    }
  });
});

// New route for Clarendon House project
app.get("/projects/clarendon-house", (req, res) => {
  res.render("projects/building", {
    projectName: "Clarendon House",
    projectSubtitle: "A Unique and Impressive Family home",
    projectDescription: "This distinctive and utterly captivating new-build family home was completed in the late summer of 2022. A stunning compilation of classic, contemporary detailing has formed the bones of our clients forever home.",
    projectImages: [
      "/images/projects/complex.jpg",
      "/images/projects/hotel.jpg",
      "/images/projects/landscape.jpg",
      "/images/projects/office.jpg",
      "/images/projects/villa.jpg",
      "/images/projects/hotel.jpg"
    ],
    nextProject: {
      name: "Lancaster",
      description: "A luxurious and elegant home",
      link: "/projects/lancaster"
    }
  });
});

// app.get("/project-building",(req , res)=>{
//   res.render("building", {
//     image1: "/images/projects/building.jpg"
//   })
// })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})