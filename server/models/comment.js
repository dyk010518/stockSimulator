const mongoose = require("mongoose");

//define a comment schema for the database
const ExampleSchema = new mongoose.Schema({
  ExampleVar: String,

});

// compile model from schema
module.exports = mongoose.model("example", ExampleSchema);
