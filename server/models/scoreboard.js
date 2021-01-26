const mongoose = require("mongoose");

const scoreboardSchema = new mongoose.Schema({
    userID: String,
    rank: String,
    totalAccountValue: String,
    userName: String,
});

// compile model from schema
module.exports = mongoose.model("scoreboards", scoreboardSchema);