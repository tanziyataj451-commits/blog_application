# tan_blog 📝

A full-stack blogging web application built using the MERN stack.

tan_blog allows users to register, log in securely, create blogs with images, view their blogs, edit and delete their own posts, and manage their profile.

## 🚀 Features

- User registration
- Secure user login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Create new blogs
- Upload blog images
- Display blog images
- View user-specific blogs
- Edit blogs
- Delete blogs
- User profile page
- Logout functionality
- Responsive design
- Mobile-friendly navigation

## 🛠️ Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer

## 📂 Project Structure

```text
tan_blog/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Blog.js
│   │
│   ├── uploads/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── assests/
    ├── home.html
    ├── login.html
    ├── register.html
    ├── create_blog.html
    ├── dashboard.html
    ├── profile.html
    ├── script.js
    └── style.css