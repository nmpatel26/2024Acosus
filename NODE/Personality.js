const mongoose = require('mongoose');

// Define the schema
const PersonalitySchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true
  },
  fullName: { 
    type: String, 
    required: true 
  },
  personalityScore: {
    type: String,
    required: true
  }
});

// Create the model
const PersonalityModel = mongoose.model('Personality', PersonalitySchema);

module.exports = PersonalityModel;
