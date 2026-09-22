const express=require("express")
const cors=require("cors")
const app=express()
const multer=require("multer")
const upload=multer({
    dest:"uploads/"
})
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hello from backend")
})
app.post("/register",(req,res)=>{
    const {name,email,password}=req.body;
    console.log("register:",name,email)
    res.json({
        message:"user registered successfully"
    })
})

app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    console.log("login:",email);
    
    res.json({
        message:"login successful"
    })
})
app.post("/blogs",upload.single("image"),(req,res)=>{
    const {title,content,category}=req.body;
    console.log("blog:",title)
    console.log("title:",title);
    console.log("category:",category);
    console.log("content:",content);
    console.log("image:",req.file);
    res.json({
        message:"blog created successfully"
    })
})
app.listen(3000,()=>{
    console.log("server running on http://localhost:3000")
})
