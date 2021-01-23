const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
    stockSymbol: String,
    day: String,
    marketNumber: String,
    stockPrice: String,
    yearHigh: String,
    yearLow: String,
});

// compile model from schema
module.exports = mongoose.model("stockprices", PriceSchema);