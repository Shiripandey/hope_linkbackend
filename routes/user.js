const express = require("express");
const uuid = require("uuid");
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require("../models/user");

// Register Route
router.post("/register", async (req, res) => {
    const { email, password, phone, name } = req.body;

    // Validate input
    if (!phone || !name || !password || !email) {
        return res.status(400).json({ error: "Invalid request body!" });
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: "Invalid email!" });
    }

    // Validate password length
    if (password.length < 8) {
        return res.status(400).json({ error: "Password should contain more than 8 characters!" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "User with this email already exists!" });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
        email,
        password: hashedPassword, // Store hashed password
        phone,
        name,
    });

    // Save the user to the database
    await newUser.save();

    // Success response
    return res.status(200).json({ message: "User registered successfully!" });
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: "Invalid request body!" });
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: "Invalid email!" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: "User with specified email does not exist!" });
    }

    // Compare password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password!" });
    }
	router.get("/", (req, res) => {
		res.send("User route is working!");
	});

    // Generate a token (UUID as a temporary placeholder, use JWT in real-world apps)
    const token = uuid.v4();
    user.token = token;
    await user.save();

    // Success response
    return res.status(200).json({ message: "User login successful!", token });
});

module.exports = router;
