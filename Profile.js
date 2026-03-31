let userName = localStorage.getItem("username");
let email = localStorage.getItem("email");
document.getElementById("name").value=userName;
document.getElementById("email").value=email;
function addExperience(){
    alert("Experience added!");
}