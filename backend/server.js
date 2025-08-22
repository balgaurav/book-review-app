// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Import the routers
const booksRouter = require('./routes/books');
const reviewsRouter = require('./routes/reviews');

// Middleware to parse JSON bodies
app.use(express.json());

// Replace the simple cors() with a more specific configuration
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mount the routers
app.use('/api/books', booksRouter);
app.use('/api/reviews', reviewsRouter);

// A simple test route to ensure the server is running
app.get('/', (req, res) => {
  res.send('Hello from the Book Review API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});