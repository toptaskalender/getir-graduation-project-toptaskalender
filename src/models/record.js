const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Record",
  new mongoose.Schema({}, { timestamps: true })
);