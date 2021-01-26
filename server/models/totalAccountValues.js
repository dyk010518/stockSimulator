const mongoose = require("mongoose");

const TAVSchema = new mongoose.Schema({
    userID: String,
    oneTV: String,
    twoTV: String,
    threeTV: String,
    fourTV: String,
});

// compile model from schema
module.exports = mongoose.model("totalvalues", TAVSchema);