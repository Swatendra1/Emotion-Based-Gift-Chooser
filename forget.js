function recoverPassword() {
    let email = document.getElementById("fp-email").value.trim();
    let msg = document.getElementById("fp-msg");

    let user = JSON.parse(localStorage.getItem("user"));

    if (email === "") {
        msg.style.color = "red";
        msg.innerText = "Please enter your email ❌";
        return;
    }

    if (!user) {
        msg.style.color = "red";
        msg.innerText = "No user found. Please sign up first ❌";
        return;
    }

    if (email === user.email) {
        msg.style.color = "green";
        msg.innerText = `Your password is: ${user.password}`;
    } else {
        msg.style.color = "red";
        msg.innerText = "Email not registered ❌";
    }
}
