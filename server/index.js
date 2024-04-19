const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const UserModel = require("./models/Users");

app.use(cors({
    origin: ["https://deploy-mern-frontend.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Handle root route
app.get("/", (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: "Internal server error" }));
});

// Create new user
app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Delete user by ID
app.delete("/deleteUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(err => res.status(500).json({ error: "Internal server error" }));
});

// Update user by ID
app.put("/updateUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: "Internal server error" }));
});

// Get user by ID
app.get("/getUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: "Internal server error" }));
});

// Set port
const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
