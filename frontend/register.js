const registerButton = document.getElementById("registerBtn");

// Render Backend URL
const API = "https://expense-tracker-5mtw.onrender.com";

registerButton.addEventListener("click", registerUser);

async function registerUser() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const salary = document.getElementById("salary").value;
    const budget = document.getElementById("budget").value;
    const password = document.getElementById("password").value;

    const user = {
        name,
        email,
        salary,
        budget,
        password
    };

    const response = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();

    alert(data.message);

    if (data.success) {
        window.location.href = "index.html";
    }
}