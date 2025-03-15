const express = require("express")
const app = express()
const path = require("path")
const cookieParser = require("cookie-parser")

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
          { quote: "The team’s attention to detail transformed our space into something truly special. Their creativity and dedication are unmatched.", author: "Client One" },
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

app.listen(3000)