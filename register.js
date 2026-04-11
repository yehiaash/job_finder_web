function company(Admin){
    document.getElementById("company").style.display = Admin?'block':'none';
}
function register(){
    let email = document.getElementById("email").value;
    let name=document.getElementById('username').value;
    let password=document.getElementById('Password').value;
    let Confirm_password=document.getElementById('confirm_password').value;
    let role = document.getElementById("ADMIN").checked? "admin" : "user";
    let company = document.getElementById("companyField").value;

    if(name===""||name.length<5){
        alert("Name must be at least 5 characters long!");
        return false;
    }
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let valid = email.match(regex);
    if(!valid){
        alert("Invalid email address!");
        return false;
    }

    if(password.length<5){
        alert("Password must be at least 5 characters long!");
        return false;
    }
    if(password!==Confirm_password){
        alert("Passwords don't match!");
        return false;
    }
    if(role==="admin"){
        if(company===""){
            alert("Company is empty!");
            return false;
        }
        else if(company.length<2){
            alert("Company must be at least 2 characters long!");
            return false;
        }
    }
    let userInfo=JSON.parse(localStorage.getItem('userInfo'))||[];

    for(let i=0;i<userInfo.length;i++){
        if(userInfo[i].name===name){
            alert("Please enter unique name!");
            return false;
        }
        if(userInfo[i].email===email){
            alert("This email is already in used!");
            return false;
        }
    }
    let info={
        "name":name,
        "password":password,
        "email":email,
        "role":role,
        "company":company
    }
    userInfo.push(info);
    localStorage.setItem('userInfo',JSON.stringify(userInfo));
    return true;
}
