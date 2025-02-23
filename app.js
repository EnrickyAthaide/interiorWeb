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
    res.render("index")
})
app.get("/about" , (req , res)=>{
    res.render("about")
})



app.listen(3000)