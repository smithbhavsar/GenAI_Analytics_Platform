const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Import the auth routes
const cors = require('cors'); // Import CORS middleware

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
app.use('/api/auth', authRoutes); // Use the auth routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/user_details', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Start server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
