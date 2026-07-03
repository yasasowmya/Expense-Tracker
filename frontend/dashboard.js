const totalExpense = document.getElementById("totalExpense");
const monthlyBudget = document.getElementById("monthlyBudget");
const remainingBudget = document.getElementById("remainingBudget");
const totalTransactions = document.getElementById("totalTransactions");
const recentTable = document.getElementById("recentTable");

// Your Render backend URL
const API = "https://expense-tracker-5mtw.onrender.com";

async function loadDashboard() {

    // Get Expenses
    const email = localStorage.getItem("email");
    const response = await fetch(`${API}/expenses/${email}`);
    const expenses = await response.json();

    // Get Profile
    
    const profileResponse = await fetch(`${API}/profile/${email}`);
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