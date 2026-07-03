const loginButton = document.getElementById("loginBtn");

// Render Backend URL
const API = "https://expense-tracker-5mtw.onrender.com";

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
        email,
        password
    };

    const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();

    if (data.success) {
        localStorage.setItem("email", email);
        alert(data.message);
        window.location.href = "dashboard.html";
    } else {
        alert(data.message);
    }
}