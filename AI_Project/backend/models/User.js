const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // Optional for Google login
    username: { type: String, required: false }, // Optional for Google login
});

const User = mongoose.model('User', userSchema);

module.exports = User;
