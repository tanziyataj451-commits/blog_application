
let form=document.getElementById("loginForm")
if(form){
form.addEventListener("submit",function(event){
    event.preventDefault();
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value

    fetch("http://localhost:3000/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email,
            password:password
        })
    })
    
    .then(response => response.json())
    .then(data=>{
        alert(data.message);
        if(data.token){
            localStorage.setItem("token",data.token);
            localStorage.setItem("user",JSON.stringify(data.user))
            window.location.href = "dashboard.html";

        }
    })
    // alert("form submitted successfully")
    // location.reload()
})
}
//register 
let register=document.getElementById("RegisterForm")
if(register){
    register.addEventListener("submit",function(event){
        event.preventDefault();
    let name=document.getElementById("name").value
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    let confirmPassword=document.getElementById("confirmPassword").value
    if(password!==confirmPassword){
        alert("passwords doesnot match")
        return;
    }
    fetch("http://localhost:3000/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            email:email,
            password:password
        })
    }).then(response=>response.json())
    .then(data=>{
        alert(data.message)
    })
    .catch(error=>{
        console.log(error)
        alert("backend connection failed")
    })
    
  

        // alert("successfully registered")
        // location.reload()
        
    })
}
let publish=document.getElementById("blogForm")
if(publish){
    publish.addEventListener("submit",function(event){
        event.preventDefault();
        let title=document.getElementById("title").value;
        let category=document.getElementById("category").value;
        let content=document.getElementById("text-area").value;
        let image=document.getElementById("image").files[0];
        let formData=new FormData();
        formData.append("title",title);
        formData.append("category",category)
        formData.append("content",content)
        formData.append("image",image)
        fetch("http://localhost:3000/blogs", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: formData
})
        .then(response=>response.json())
        .then(data=>{
            alert(data.message)
        })
        .catch(error=>{
            console.log(error)
            alert("backend connection failed")
        })
    })
}

// PROFILE
async function loadProfile() {
    const profileName = document.getElementById("profile-name");

    if (!profileName) return;

    try {
        const response = await fetch("http://localhost:3000/profile", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!response.ok) {
            alert("Please login first.");
            window.location.href = "login.html";
            return;
        }

        const user = await response.json();

        document.getElementById("profile-name").textContent = user.name;
        document.getElementById("profile-email").textContent = user.email;

    } catch (error) {
        console.log(error);
        alert("Could not load profile.");
    }
}
// LOGOUT
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";
}




//hamburger
const hamburger=document.getElementById("hamburger")
const navLinks=document.getElementById("navLinks")
if(hamburger){
hamburger.addEventListener("click",function(){
    navLinks.classList.toggle("active")
})
}

/* MODULE 4: DISPLAY, UPDATE AND DELETE BLOGS */

const blogContainer = document.getElementById("blogContainer");

async function loadBlogs() {
    if (!blogContainer) return;

    try {
        const response = await fetch("http://localhost:3000/blogs", {
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
});
        const blogs = await response.json();

        blogContainer.replaceChildren();

        if (blogs.length === 0) {
            blogContainer.textContent = "No blogs available.";
            return;
        }

        blogs.forEach(blog => {
            const card = document.createElement("div");
            card.className = "blog-card";

            const title = document.createElement("h2");
            title.textContent = blog.title;
            const image = document.createElement("img");

            if (blog.image) {
              image.src = `http://localhost:3000/uploads/${encodeURIComponent(blog.image)}`;
              image.alt = blog.title;
              image.style.width = "100%";
              image.style.maxHeight = "220px";
              image.style.objectFit = "cover";
              image.onerror = () => {
               image.style.display = "none";
    };
}

 

            const category = document.createElement("p");
            category.textContent = "Category: " + blog.category;

            const content = document.createElement("p");
            content.textContent = blog.content;

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";

            editButton.addEventListener("click", async () => {
                const newTitle = prompt("Enter new title:", blog.title);
                if (newTitle === null) return;

                const newCategory = prompt(
                    "Enter new category:",
                    blog.category
                );
                if (newCategory === null) return;

                const newContent = prompt(
                    "Enter new content:",
                    blog.content
                );
                if (newContent === null) return;

                if (!newTitle.trim() || !newCategory.trim() ||
                    !newContent.trim()) {
                    alert("All fields are required.");
                    return;
                }

                try {
                    const response = await fetch(
                        `http://localhost:3000/blogs/${blog._id}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem("token")}`
                            },
                            body: JSON.stringify({
                                title: newTitle.trim(),
                                category: newCategory.trim(),
                                content: newContent.trim()
                            })
                        }
                    );

                    const result = await response.json();
                    alert(result.message);

                    if (response.ok) loadBlogs();
                } catch (error) {
                    console.log(error);
                    alert("Could not update blog.");
                }
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", async () => {
                const confirmed = confirm(
                    `Delete "${blog.title}" permanently?`
                );

                if (!confirmed) return;

                try {
                    const response = await fetch(`http://localhost:3000/blogs/${blog._id}`, {
    method: "DELETE",
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
})
                    const result = await response.json();
                    alert(result.message);

                    if (response.ok) loadBlogs();
                } catch (error) {
                    console.log(error);
                    alert("Could not delete blog.");
                }
            });
            if(blog.image){
                card.appendChild(image);
            }
            

            card.append(title, category, content, editButton, deleteButton);
            blogContainer.appendChild(card);
        });

    } catch (error) {
        console.log(error);
        blogContainer.textContent = "Failed to load blogs.";
    }
}

loadBlogs();
loadProfile();