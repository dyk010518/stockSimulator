const mongoose = require("mongoose");

const DividendSchema = new mongoose.Schema({
    stockSymbol: String,
    day: String,
    marketNumber: String,
    stockDividend: String,
});

// compile model from schema
module.exports = mongoose.model("stockdividends", DividendSchema);