const loginButton = document.getElementById("loginBtn");

// Load saved email when page opens
window.onload = function () {

    document.getElementById("loginEmail").value =
        localStorage.getItem("email") || "";

    document.getElementById("loginPassword").value = "";

};

loginButton.addEventListener("click", loginUser);

async function loginUser() {

    const email = document.getElementById("loginEmail").value;

    const password = document.getElementById("loginPassword").value;

    const user = {
        email: email,
        password: password
    };

    const response = await fetch("http://localhost:5000/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)

    });

    const data = await response.json();

    if (data.success) {

        // Save only email
        localStorage.setItem("email", email);

        alert(data.message);

        window.location.href = "dashboard.html";

    } else {

        alert(data.message);

    }

}