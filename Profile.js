function saveData() {
    let statu = document.getElementById("status_in").value;
    let fil =document.getElementById("field_in").value;
    let bio=document.getElementById("bio_in").value;
    let ex=document.getElementById("experience_in").value;
    localStorage.setItem("userstatus", statu);
    localStorage.setItem("userfiled",fil);
    localStorage.setItem("userbio",bio);
    localStorage.setItem("userex",ex);
}
let userName = localStorage.getItem("username");
let email = localStorage.getItem("useremail");
let statu2= localStorage.getItem("userstatus");
let fil2=localStorage.getItem("userfiled");
let bio2=localStorage.getItem("userbio");
let ex2=localStorage.getItem("userex");
document.getElementById("name_in").value=userName;
document.getElementById("email_in").value=email;
document.getElementById("status_in").value=statu2;
document.getElementById("field_in").value=fil2;
document.getElementById("bio_in").value=bio2;
document.getElementById("experience_in").value=ex2;
function addExperience(){
    alert("Experience added!");
}