const mongoose = require('mongoose');

// Define the Project schema
const projectSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  project: { type: String, required: true },
  client: { type: String, required: true },
  preview: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the Project model for the 'projects' collection inside the 'Completedprojects' database
const Project = mongoose.model('Project', projectSchema, 'projects');  // 'projects' collection

module.exports = Project;
