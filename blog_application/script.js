let form=document.getElementById("loginForm")
if(form){
form.addEventListener("submit",function(){
    event.preventDefault();
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value

    alert("form submitted successfully")
    location.reload()
})
}

let register=document.getElementById("RegisterForm")
if(register){
    register.addEventListener("submit",function(){
        event.preventDefault();
    let name=document.getElementById("name").value
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    let confirmPassword=document.getElementById("confirmPassword").value
    if(password!==confirmPassword){
        alert("passwords doesnot match")
        return;
    }

        alert("successfully registered")
        location.reload()
        
    })
}
let publish=document.getElementById("blogForm")
if(publish){
    publish.addEventListener("submit",function(){
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
        alert("blog created successfully")
        location.reload()
    })
}


//hamburger
const hamburger=document.getElementById("hamburger")
const navLinks=document.getElementById("navLinks")
if(hamburger){
hamburger.addEventListener("click",function(){
    navLinks.classList.toggle("active")
})
}