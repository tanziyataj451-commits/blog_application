const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const multer = require("multer");
require("dotenv").config();

const User = require("./models/User");
const Blog = require("./models/Blog");
const path=require("path")
const app = express();

app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.get("/check-uploads",(req,res)=>{
    const fs=require("fs")
    const folder=path.join(__dirname,"uploads")
    res.json({
        folderExits:
        fs.existsSync(folder),
        files:fs.existsSync(folder)? fs.readdirSync(folder):[]
    })
})
const upload = multer({ dest: path.join(__dirname,"uploads") });
console.log("serving uploads from :",path.join(__dirname,"uploads"))
app.use(cors());
app.use(express.json());



// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(error => console.log("MongoDB error:", error));


// Test route
app.get("/", (req, res) => {
    res.send("Server running");
});


// Register
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "Registration successful"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Registration failed"
        });
    }
});


// Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        res.json({
            message: "Login successful"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Login failed"
        });
    }
});


// Create Blog
app.post("/blogs", upload.single("image"), async (req, res) => {
    try {
        const { title, category, content } = req.body;

        const blog = new Blog({
            title,
            category,
            content,
            image: req.file ? req.file.filename : ""
        });

        await blog.save();

        res.status(201).json({
            message: "Blog created successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Blog creation failed"
        });
    }
});


// Get all blogs
app.get("/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find();

        res.json(blogs);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to retrieve blogs"
        });
    }
});


// Get individual blog
app.get("/blogs/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json(blog);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to retrieve blog"
        });
    }
});

// UPDATE BLOG
app.put("/blogs/:id", async (req, res) => {
    try {
        const { title, category, content } = req.body;

        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, category, content },
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json({
            message: "Blog updated successfully",
            blog
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Blog update failed"
        });
    }
});


// DELETE BLOG
app.delete("/blogs/:id", async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json({
            message: "Blog deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Blog deletion failed"
        });
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});