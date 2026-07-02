const totalExpense = document.getElementById("totalExpense");
const monthlyBudget = document.getElementById("monthlyBudget");
const remainingBudget = document.getElementById("remainingBudget");
const totalTransactions = document.getElementById("totalTransactions");
const recentTable = document.getElementById("recentTable");

async function loadDashboard() {

    // Get Expenses
    const response = await fetch("http://localhost:5000/expenses");

    const expenses = await response.json();

    // Get Profile
    const email = localStorage.getItem("email");
    const profileResponse = await fetch(
    `http://localhost:5000/profile/${email}`);

    const profile = await profileResponse.json();

    let total = 0;

    expenses.forEach((expense) => {

        total += Number(expense.amount);

    });

    totalExpense.innerText = "₹" + total;

    monthlyBudget.innerText = "₹" + (profile.budget || 0);

    const remaining = (Number(profile.budget) || 0) - total;

    remainingBudget.innerText = "₹" + remaining;

    totalTransactions.innerText = expenses.length;

    recentTable.innerHTML = "";

    expenses.slice(-5).reverse().forEach((expense) => {

        recentTable.innerHTML += `
        <tr>
            <td>${expense.name}</td>
            <td>${expense.category}</td>
            <td>₹${expense.amount}</td>
            <td>${expense.date}</td>
        </tr>
        `;

    });

}

loadDashboard();