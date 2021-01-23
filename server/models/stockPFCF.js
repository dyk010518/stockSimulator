const mongoose = require("mongoose");

const PFCFSchema = new mongoose.Schema({
    stockSymbol: String,
    day: String,
    marketNumber: String,
    stockPFCF: String,
});

// compile model from schema
module.exports = mongoose.model("stockPFCF", PFCFSchema);