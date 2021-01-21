const mongoose = require("mongoose");

const DateSchema = new mongoose.Schema({
  userId: String,
  one: String,
  two: String,
  three: String,
  four: String,
});

// compile model from schema
module.exports = mongoose.model("dates", DateSchema);
