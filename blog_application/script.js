
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
    .then(response=>response.json())
    .then(data=>{
        alert(data.message)
    })
    .catch(error=>{
        console.log(error)
        alert("backend connection failed")
    })
    // alert("form submitted successfully")
    // location.reload()
})
}
//register 
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
    })
    .then(response => response.json())
    .then(data=>{
        alert(data.message)
    })
    .catch(error =>{
        console.log(error)
        alert("backend connection failed")
    })

        // alert("successfully registered")
        // location.reload()
        
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
        fetch("http://localhost:3000/blogs",{
            method:"POST",
            body:formData
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


//hamburger
const hamburger=document.getElementById("hamburger")
const navLinks=document.getElementById("navLinks")
if(hamburger){
hamburger.addEventListener("click",function(){
    navLinks.classList.toggle("active")
})
}