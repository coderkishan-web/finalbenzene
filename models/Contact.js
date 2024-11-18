// backend/models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  organization: String,
  city: String,
  email: String,
  phone: String,
  message: String,
});

module.exports = mongoose.model('Contact', contactSchema);
