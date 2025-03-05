const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth'); // Ensure this points to your auth.js file

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);  // Add a prefix like /api/auth

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
