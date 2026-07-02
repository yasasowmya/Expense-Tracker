const registerButton = document.getElementById("registerBtn");

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

    const response = await fetch("http://localhost:5000/register", {

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