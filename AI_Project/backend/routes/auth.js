const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the path is correct for your User model
const router = express.Router();

// Google Login Route
router.post('/google-login', async (req, res) => {
    const { googleId, name, email, token } = req.body;

    try {
        // Check if user already exists in the database
        let user = await User.findOne({ googleId });
        if (!user) {
            // Create a new user if not found
            user = new User({ googleId, name, email });
            await user.save();
        }

        // Generate a JWT token
        const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Respond with the user data and JWT token
        res.json({ user, token: jwtToken });
    } catch (error) {
        console.error("Google login error:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
