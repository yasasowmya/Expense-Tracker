const totalExpense = document.getElementById("totalExpense");
const monthExpense = document.getElementById("monthExpense");
const todayExpense = document.getElementById("todayExpense");
const monthTable = document.getElementById("monthTable");

async function loadReports() {

    const response = await fetch("http://localhost:5000/expenses");

    const expenses = await response.json();

    let total = 0;
    let monthly = 0;
    let today = 0;

    const monthlyData = {};
    const categoryData = {};

    const currentDate = new Date();

    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.toISOString().split("T")[0];

    expenses.forEach((expense) => {

        const amount = Number(expense.amount);

        total += amount;

        const expenseDate = new Date(expense.date);

        if (expenseDate.getMonth() === currentMonth) {

            monthly += amount;

        }

        if (expense.date === currentDay) {

            today += amount;

        }

        const monthName = expenseDate.toLocaleString("default", {
            month: "short"
        });

        if (!monthlyData[monthName]) {

            monthlyData[monthName] = 0;

        }

        monthlyData[monthName] += amount;

        if (!categoryData[expense.category]) {

            categoryData[expense.category] = 0;

        }

        categoryData[expense.category] += amount;

    });

    totalExpense.innerText = "₹" + total;

    monthExpense.innerText = "₹" + monthly;

    todayExpense.innerText = "₹" + today;

    monthTable.innerHTML = "";

    for (const month in monthlyData) {

        monthTable.innerHTML += `
        <tr>
            <td>${month}</td>
            <td>₹${monthlyData[month]}</td>
        </tr>
        `;

    }

    // Line Chart

    new Chart(document.getElementById("lineChart"), {

        type: "line",

        data: {

            labels: Object.keys(monthlyData),

            datasets: [

                {

                    label: "Monthly Expenses",

                    data: Object.values(monthlyData),

                    borderColor: "#2563eb",

                    backgroundColor: "#93c5fd",

                    fill: false,

                    tension: 0.4

                }

            ]

        }

    });

    // Pie Chart

    new Chart(document.getElementById("pieChart"), {

        type: "pie",

        data: {

            labels: Object.keys(categoryData),

            datasets: [

                {

                    data: Object.values(categoryData),

                    backgroundColor: [

                        "#2563eb",
                        "#16a34a",
                        "#f59e0b",
                        "#dc2626",
                        "#7c3aed",
                        "#0891b2",
                        "#db2777"

                    ]

                }

            ]

        }

    });

}

loadReports();