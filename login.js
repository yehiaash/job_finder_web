function login() {
    let email = document.getElementById("EMAIL").value;
    let name = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (name === "" || name.length < 5) {
        alert("Name must be at least 5 characters long!");
        return false;
    }

    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let valid = email.match(regex);
    if (!valid) {
        alert("Invalid email address!");
        return false;
    }

    if (password === "" || password.length < 5) {
        alert("Password must be at least 5 characters long!");
        return false;
    }

    let userInfo = JSON.parse(localStorage.getItem('userInfo')) || [];

    let matchedUser;
    for (let i = 0; i < userInfo.length; i++) {
        if (userInfo[i].email === email && userInfo[i].name === name && userInfo[i].password === password) {
            matchedUser = userInfo[i];
            console.log(5);
            break;
        }
    }

    if (!matchedUser) {
        alert("Invalid email, username, or password!");
        return false;
    }
    if(matchedUser){
        console.log(matchedUser);
    }
    localStorage.setItem("username", matchedUser.name);
    localStorage.setItem("useremail", matchedUser.email);
   localStorage.setItem("currentuser",JSON.stringify(matchedUser));

    if (matchedUser.role === "admin") {
        window.location.href = "View_list.html";
    } else {
        window.location.href = "index.html";
    }

    return true;
}
