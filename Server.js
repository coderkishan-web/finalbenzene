const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import 'path' module
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Models
const Contact = require('./models/Contact'); // For form submissions
const Project = require('./models/Project'); // For projects

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection to the Completedprojects database
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB: Completedprojects database'))
  .catch((error) => console.error('MongoDB connection error:', error));

// API route for form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, organization, city, email, phone, message } = req.body;
    const newContact = new Contact({ name, organization, city, email, phone, message });
    await newContact.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form', error });
  }
});

// API route to fetch projects from the 'projects' collection in the 'Completedprojects' database
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find(); // Fetch all projects from 'projects' collection
    res.status(200).json(projects); // Send projects as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
});

// Serve static files from the React app (dist folder)
app.use(express.static(path.join(__dirname, 'dist')));

// Serve the frontend for any unrecognized route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
