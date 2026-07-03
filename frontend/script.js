const button = document.getElementById("addExpenseBtn");
const table = document.getElementById("expenseTable");
const searchInput = document.getElementById("searchExpense");
const filterCategory = document.getElementById("filterCategory");

let editId = null;

button.addEventListener("click", saveExpense);

if (searchInput) {
    searchInput.addEventListener("keyup", loadExpenses);
}

if (filterCategory) {
    filterCategory.addEventListener("change", loadExpenses);
}

async function saveExpense() {

    const name = document.getElementById("expenseName").value;
    const category = document.getElementById("expenseCategory").value;
    const amount = document.getElementById("expenseAmount").value;
    const date = document.getElementById("expenseDate").value;
    const description = document.getElementById("expenseDescription").value;

    if (!name || !category || !amount || !date) {
        alert("Please fill all fields");
        return;
    }

    const expense = {
        name,
        category,
        amount,
        date,
        description
    };

    if (editId == null) {

        await fetch("https://expense-tracker-5mtw.onrender.com/expenses", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(expense)

        });

        alert("Expense Added Successfully");

    }

    else {
        alert("Click OK to update the expense.");
        await fetch(

            await fetch("https://expense-tracker-5mtw.onrender.com/expenses/" + editId,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(expense)

            }

        );

        Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Expense Updated Successfully",
            confirmButtonColor: "#56B8B2"
        });

        editId = null;

        button.innerText = "Save Expense";

    }

    clearForm();

    loadExpenses();

}
async function loadExpenses() {

    const response = await fetch("https://expense-tracker-5mtw.onrender.com/expenses");

    let expenses = await response.json();

    const search = searchInput.value.toLowerCase();

    const category = filterCategory.value;

    expenses = expenses.filter(item => {

        const nameMatch = item.name.toLowerCase().includes(search);

        const categoryMatch = category === "" || item.category === category;

        return nameMatch && categoryMatch;

    });

    table.innerHTML = "";

    expenses.forEach(expense => {

        table.innerHTML += `

        <tr>

        <td>${expense.name}</td>

        <td>${expense.category}</td>

        <td>₹${expense.amount}</td>

        <td>${expense.date}</td>

        <td>

        <button type="button" onclick="window.editExpense('${expense._id}')">Edit</button>

        <button type="button" onclick="window.deleteExpense('${expense._id}')">Delete</button>

        </td>

        </tr>

        `;

    });

}
window.editExpense = async function(id) {

    const response = await fetch("https://expense-tracker-5mtw.onrender.com/expenses");

    const expenses = await response.json();

    let expense = null;

    for(let i = 0; i < expenses.length; i++){

        if(expenses[i]._id == id){

            expense = expenses[i];

            break;

        }

    }

    if(!expense){

        alert("Expense not found");

        return;

    }

    document.getElementById("expenseName").value = expense.name;

    document.getElementById("expenseCategory").value = expense.category;

    document.getElementById("expenseAmount").value = expense.amount;

    document.getElementById("expenseDate").value = expense.date;

    document.getElementById("expenseDescription").value = expense.description;

    editId = id;

    button.innerText = "Update Expense";

}

window.deleteExpense = async function(id) {

    const confirmDelete = confirm("Delete this expense?");

    if (!confirmDelete) return;

    await fetch(

        "https://expense-tracker-5mtw.onrender.com/expenses/" + id,

        {

            method: "DELETE"

        }

    );

    loadExpenses();

}

function clearForm() {

    document.getElementById("expenseName").value = "";

    document.getElementById("expenseCategory").value = "";

    document.getElementById("expenseAmount").value = "";

    document.getElementById("expenseDate").value = "";

    document.getElementById("expenseDescription").value = "";

}

loadExpenses();