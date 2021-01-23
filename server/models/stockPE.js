const mongoose = require("mongoose");

const PESchema = new mongoose.Schema({
    stockSymbol: String,
    day: String,
    marketNumber: String,
    stockPE: String,
});

// compile model from schema
module.exports = mongoose.model("stockPE", PESchema);