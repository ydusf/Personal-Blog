// Load environment variables from a .env file
require('dotenv').config();

// Import the Express.js framework
const express = require('express');

// Import a custom module for connecting to MongoDB


// Import middleware for handling requests
const expressLayout = require('express-ejs-layouts'); // Layouts for EJS templates

// Import a custom helper function


// Create an Express.js application
const app = express();

// Set the port for the application, default to 8000 if not defined
const PORT = process.env.PORT || 8000;

// Connect to the MongoDB database


// Middleware configuration
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

