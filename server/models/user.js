const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  cashOne: String,
  cashTwo: String,
  cashThree: String,
  cashFour: String,
});

// compile model from schema
module.exports = mongoose.model("users", UserSchema);
