const mongoose = require("mongoose");

const PSSchema = new mongoose.Schema({
    stockSymbol: String,
    day: String,
    marketNumber: String,
    stockPS: String,
});

// compile model from schema
module.exports = mongoose.model("stockPS", PSSchema);