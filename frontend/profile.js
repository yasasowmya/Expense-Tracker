const button = document.getElementById("updateBtn");

// Render Backend URL
const API = "https://expense-tracker-5mtw.onrender.com";

button.addEventListener("click", updateProfile);

async function updateProfile() {

    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const salary = document.getElementById("salary").value;
    const budget = document.getElementById("budget").value;
    const password = document.getElementById("password").value;

    const profile = {
        name,
        email,
        salary,
        budget,
        password
    };

    const response = await fetch(`${API}/profile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    });

    const data = await response.json();

    alert(data.message);
}

// Load profile
window.onload = async function () {

    const email = localStorage.getItem("email");

    const response = await fetch(`${API}/profile/${email}`);

    const profile = await response.json();

    document.getElementById("fullName").value = profile.name || "";
    document.getElementById("email").value = profile.email || "";
    document.getElementById("salary").value = profile.salary || "";
    document.getElementById("budget").value = profile.budget || "";
};