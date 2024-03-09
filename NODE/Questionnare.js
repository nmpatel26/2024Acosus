const mongoose = require('mongoose');

const questionnaireSchema = new mongoose.Schema({
  email: { type: String },
  fullName: { type: String },
  gpa: { type: Number },
  credits: { type: Number },
  satScore: { type: String },
  course: { type: String },
  career: { type: String },
  interest: { type: Number },
  experience: { type: String },
  familyGuide: { type: String },
  personalityScore: { type: String },
  scholarship: { type: String },
  income: { type: String },
  proximity: { type: String }
});

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

module.exports = Questionnaire;
