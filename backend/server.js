require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./models/User");
const Expense = require("./models/Expense");

const app = express();

const PORT = process.env.PORT || 5000;

// MongoDB Connection

mongoose.connect(process.env.MONGODB_URI)
.then(() => {

    console.log("✅ MongoDB Connected Successfully");

})
.catch((err) => {

    console.log(err);

});

// Middleware

app.use(cors());

app.use(express.json());

// Home Route

app.get("/", (req, res) => {

    res.send("Expense Tracker Backend is Running!");

});


// ------------------------------
// Register
// ------------------------------

app.post("/register", async (req, res) => {

    try {

        const user = new User({

            name: req.body.name,

            email: req.body.email,

            salary: req.body.salary || 0,

            budget: req.body.budget || 0,

            password: req.body.password

        });

        await user.save();

        res.json({

            success: true,

            message: "Registration Successful"

        });

    } catch (error) {

        res.json({

            success: false,

            message: "User already exists"

        });

    }

});

// ------------------------------
// Login
// ------------------------------

app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({

        email,

        password

    });

    if (user) {

        res.json({

            success: true,

            message: "Login Successful"

        });

    }

    else {

        res.json({

            success: false,

            message: "Invalid Email or Password"

        });

    }

});

// ------------------------------
// Add Expense
// ------------------------------

app.post("/expenses", async (req, res) => {

    const expense = new Expense({

        name: req.body.name,

        category: req.body.category,

        amount: req.body.amount,

        date: req.body.date,

        description: req.body.description

    });

    await expense.save();

    res.json({

        success: true,

        message: "Expense Added Successfully"

    });

});


// ------------------------------
// Get Expenses
// ------------------------------

app.get("/expenses", async (req, res) => {

    const expenses = await Expense.find();

    res.json(expenses);

});

// ------------------------------
// Update Profile
// ------------------------------

app.post("/profile", async (req, res) => {

    try {

        const user = await User.findOneAndUpdate(

            { email: req.body.email },

            {

                name: req.body.name,

                salary: req.body.salary,

                budget: req.body.budget,

                password: req.body.password

            },

            { new: true }

        );

        res.json({

            success: true,

            message: "Profile Updated Successfully"

        });

    }

    catch (error) {

        res.json({

            success: false,

            message: "Profile Update Failed"

        });

    }

});

// ------------------------------
// Get Profile
// ------------------------------

app.get("/profile/:email", async (req, res) => {

    try {

        const user = await User.findOne({

            email: req.params.email

        });

        res.json(user);

    }

    catch (error) {

        res.json({});

    }

});

// ------------------------------
// Dashboard Summary
// ------------------------------

app.get("/dashboard/:email", async (req, res) => {

    const user = await User.findOne({

        email: req.params.email

    });

    const expenses = await Expense.find();

    let totalExpense = 0;

    expenses.forEach((item) => {

        totalExpense += Number(item.amount);

    });

    const salary = Number(user?.salary) || 0;

    const budget = Number(user?.budget) || 0;

    res.json({

        salary,

        budget,

        totalExpense,

        remainingSalary: salary - totalExpense,

        remainingBudget: budget - totalExpense,

        totalTransactions: expenses.length,

        recentExpenses: expenses

    });

});

// ------------------------------
// Delete Expense
// ------------------------------

// ------------------------------
// Update Expense
// ------------------------------

app.put("/expenses/:id", async (req, res) => {

    try {

        await Expense.findByIdAndUpdate(

            req.params.id,

            {

                name: req.body.name,

                category: req.body.category,

                amount: req.body.amount,

                date: req.body.date,

                description: req.body.description

            }

        );

        res.json({

            success: true,

            message: "Expense Updated Successfully"

        });

    }

    catch (error) {

        res.json({

            success: false,

            message: "Update Failed"

        });

    }

});

app.delete("/expenses/:id", async (req, res) => {

    try {

        await Expense.findByIdAndDelete(req.params.id);

        res.json({

            success: true,

            message: "Expense Deleted Successfully"

        });

    }

    catch (error) {

        res.json({

            success: false,

            message: "Delete Failed"

        });

    }

});


// ------------------------------
// Start Server
// ------------------------------

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});