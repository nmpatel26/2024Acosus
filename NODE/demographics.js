// ./demographics.js

const mongoose = require("mongoose");

const DemographicsSchema = new mongoose.Schema({
  email: { type: String },
  fullName: { type: String },
  international_student: { type: String },
  age_range: { type: String },
  transferred_from: { type: String },
  gender: { type: String },
  first_gen_student: { type: String },
  ethnicity: { type: String },
});

module.exports = mongoose.model("Demographics", DemographicsSchema);
