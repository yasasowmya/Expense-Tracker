const saveButton = document.getElementById("saveBudgetBtn");

saveButton.addEventListener("click", saveBudget);

function saveBudget() {

    const salary = document.getElementById("salary").value;

    const budget = document.getElementById("budget").value;

    const saving = document.getElementById("savingGoal").value;

    localStorage.setItem("salary", salary);

    localStorage.setItem("budget", budget);

    localStorage.setItem("saving", saving);

    document.getElementById("showSalary").innerText = salary;

    document.getElementById("showBudget").innerText = budget;

    document.getElementById("showSaving").innerText = saving;

    alert("Budget Saved Successfully");

}

window.onload = function () {

    document.getElementById("showSalary").innerText =
        localStorage.getItem("salary") || 0;

    document.getElementById("showBudget").innerText =
        localStorage.getItem("budget") || 0;

    document.getElementById("showSaving").innerText =
        localStorage.getItem("saving") || 0;

};