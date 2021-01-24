const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema({
    stockSymbol: String,
    quarter: String,
    marketNumber: String,
    shares: String,
});

// compile model from schema
module.exports = mongoose.model("sharenumbers", shareSchema);