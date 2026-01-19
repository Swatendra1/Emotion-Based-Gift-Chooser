function login() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let msg = document.getElementById("msg");

    let savedUser = JSON.parse(localStorage.getItem("user"));

    if (username === "" || password === "") {
        msg.style.color = "red";
        msg.innerText = "Please fill all fields ❌";
        return;
    }

    if (!savedUser) {
        msg.style.color = "red";
        msg.innerText = "No user found. Please sign up first ❌";
        return;
    }

    if (
        username === savedUser.username &&
        password === savedUser.password
    ) {
        msg.style.color = "green";
        msg.innerText = "Login Successful ✅";

        localStorage.setItem("isLogin", "true");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 500);
    } else {
        msg.style.color = "red";
        msg.innerText = "Wrong username or password ❌";
    }
}
