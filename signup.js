function signup() {
    let username = document.getElementById("su-username").value.trim();
    let email = document.getElementById("su-email").value.trim();
    let password = document.getElementById("su-password").value.trim();
    let msg = document.getElementById("su-msg");

    // Empty check
    if (username === "" || email === "" || password === "") {
        msg.style.color = "red";
        msg.innerText = "All fields are required ❌";
        return;
    }

    // Save user in localStorage
    let user = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    msg.style.color = "green";
    msg.innerText = "Signup successful ✅ Redirecting...";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
}
